require('babel-register')({
  presets: ['es2015']
});

var config = require('./config.json');
var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var Promise = require('bluebird');
var eslint = require('gulp-eslint');
var rimraf = require('rimraf');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var fs = require('fs');

var pkg = require('./package.json');
var packageName = pkg.name  + '-' + pkg.version;

// relative location of Kibana install
var pathToKibana = config.relativePathToKibana;

var buildDir = path.resolve(__dirname, 'build');
var targetDir = path.resolve(__dirname, 'target');
var buildTarget = path.resolve(buildDir, pkg.name);
var kibanaPluginDir = path.resolve(__dirname, pathToKibana, 'plugins');

var include = [
  'package.json',
  'index.js',
  '**/server/**/*.js',
  '**/public/**/*.js',
  '**/public/**/*.html',
  '**/public/**/*.jsx'
];

Object.keys(pkg.dependencies).map(function(dep) {
  include.push(path.join('**/node_modules', dep, '**'));
});
Object.keys(pkg.devDependencies).map(function (devDep) {
  include.push('!' + path.join('node_modules', devDep, '**'));
});

gulp.task('cleanKibana', function (done) {
    Promise.each([path.join(kibanaPluginDir, pkg.name)], function (dir) {
        return new Promise(function (resolve, reject) {
            rimraf(dir, function (err) {
                if (err) return reject(err);
                resolve();
            });
        });
    }).nodeify(done);
});

gulp.task('sync', ['cleanKibana', 'build'], function (done) {
  gulp.src('build/**/*')
      .pipe(gulp.dest(kibanaPluginDir));
});

gulp.task('lint', function (done) {
  var filePaths = [
    '__gulpfile.js',
    '**/server/**/*.js',
    '**/public/**/*.js',
    '**/public/**/*.jsx'
  ];

  return gulp.src(filePaths)
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.formatEach())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint'], function () {
  gutil.log(gutil.colors.red('Nothing to test...'));
});

gulp.task('clean', function (done) {
  Promise.each([buildDir, targetDir], function (dir) {
    return new Promise(function (resolve, reject) {
      rimraf(dir, function (err) {
        if (err) return reject(err);
        resolve();
      });
    });
  }).nodeify(done);
});

gulp.task('build', ['clean'], function (done) {
  return gulp.src(include).pipe(gulp.dest(buildTarget));
});

gulp.task('package', ['build'], function (done) {
  return gulp.src(path.join(buildDir, '**', '*'))
    .pipe(tar(packageName + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest(targetDir));
});

gulp.task('dev', ['sync'], function (done) {
  gulp.watch(['package.json', 'index.js', 'public/**/*', 'server/**/*'], ['sync', 'lint']);
});
