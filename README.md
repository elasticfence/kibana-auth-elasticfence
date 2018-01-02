Authentication module for Kibana 5
==================================
Authentication module for Kibana 5.4.1 (should work with kibana 5.x as long as the version number in the package.json matches) and Elasticfence HTTP Authentication plugin

**Login**

<img src="https://raw.githubusercontent.com/ryanlutgen/kibana-auth-elasticfence/6057d8154da438db8da2064e728e338ad9a5898a/KibanaLogin.PNG"/>

**Logout**

<img src="https://raw.githubusercontent.com/ryanlutgen/kibana-auth-elasticfence/6057d8154da438db8da2064e728e338ad9a5898a/KibanaLogout.PNG"/>

Requires:

* [Elasticfence Auth](https://github.com/elasticfence/elasticsearch-http-user-auth)


## Setup
```
bin/kibana plugin install https://github.com/elasticfence/kibana-auth-elasticfence/releases/download/5.x/kauth-latest.tar.gz
```

## Usage

* Add users via Elasticfence plugin
* Login using Authentication Form

License: MIT.

## Dev

1. Clone repository.
2. Create the `config.json.template` file and create a `config.json` file.
3. Modify the contents of the `config.json` file to point to a local Kibana installation directory.

### Build Commands:

- `npm run dev` will build the code and copy it to the specified local Kibana installation.
    - Kibana 5.x+ uses Webpack to build bundles.  Kibana needs to be restarted in order for local changes to take effect!
- `npm run build` will build the code into the `build` directory.
- `npm run package` will perform the same actions as build, but will also produce a `.tar` file in the `target` directory.
- `npm run clean` will clean all local build directories
- `npm run cleanKibana` will remove the build Kibana plugin from the specified local Kibana installation
