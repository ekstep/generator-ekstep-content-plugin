# generator-ekstep-content-plugin

[Yeoman](http://yeoman.io) generator for esktep content plugin

## Usage

Install [Yeoman](http://yeoman.io) and generator-ekstep-content-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g ekstep/generator-ekstep-content-plugin
```

Then generate your new plugin:

```bash
yo ekstep-content-plugin
```

## Development

* Running tests

```
npm install
npm test
```

* Running tests in watch mode

```
node_modules/jest/bin/jest.js --watch __tests__/*
```

* Verifying generator locally

```
mkdir -p /tmp/generator-test && cd /tmp/generator-test
yo <path-to-generator-ekstep-content-plugin>
```

