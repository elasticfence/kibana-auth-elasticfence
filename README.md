Authentication module for Kibana 4
==================================
Authentication module for Kibana 4.x and Elasticfence HTTP Authentication plugin

<img src="https://cloud.githubusercontent.com/assets/1423657/18619991/c47b632e-7e09-11e6-9eff-7b8324ad04c6.png"/>

Requires:

* [Elasticfence Auth](https://github.com/elasticfence/elasticsearch-http-user-auth)


## Setup
```
bin/kibana plugin --install kibana-auth-plugin -u https://github.com/elasticfence/kibana-auth-elasticfence/releases/download/snapshot/kauth-latest.tar.gz
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
