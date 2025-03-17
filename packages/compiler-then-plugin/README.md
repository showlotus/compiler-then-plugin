# Compiler Then Plugin

<!-- ln -s packages/compiler-then-plugin/README.md README.md -->

## Install

Install the plugin

```shell
npm install compiler-then-plugin -D
```

Configure Webpack

```js
const CompilerThenPlugin = require('compiler-then-plugin')

module.exports = {
  plugins: [
    new CompilerThenPlugin({
      port: 3333,
      script: 'console.log("something...")',
    }),
  ],
}
```

## Configuration

### parameter

#### port

Type: `number`

Default: `3872`

Port number of the internal websocket service.

#### script

Type: `string`

Default: `location.reload`

Custom execute script, a JavaScript string.
