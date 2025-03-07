const Net = require('net')
const WebSocket = require('ws')
const Webpack = require('webpack')

function findAvailablePort(startPort) {
  return new Promise((resolve) => {
    const server = Net.createServer()

    server.listen(startPort, () => {
      server.close(() => resolve(startPort))
    })

    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1))
    })
  })
}

class CompilerThenPlugin {
  constructor(options) {
    const defaultOptions = { port: 3872, script: 'location.reload()' }
    this.options = { ...defaultOptions, ...(options || {}) }
    this.initServer()
  }

  async initServer() {
    this.options.port = await findAvailablePort(this.options.port)
    this.wss = new WebSocket.Server({ port: this.options.port })
  }

  async apply(compiler) {
    if (
      !(
        process.env.NODE_ENV === 'development' ||
        compiler.options.mode === 'development'
      )
    )
      return

    const PluginName = 'CompilerThenPlugin'

    const BannerPlugin = new Webpack.BannerPlugin({
      banner: /* js */ `
        (function () {
          const ws = new WebSocket('ws://localhost:' + ${this.options.port});

          ws.addEventListener('open', function (event) {
            console.log('[${PluginName}] Server started!')
          });
  
          ws.addEventListener('message', function (event) {
            if (event.data === 'recompile') {
              new Function(\`${this.options.script}\`)()
            }
          });
        })();
      `,
      raw: true,
    })
    BannerPlugin.apply(compiler)

    compiler.hooks.done.tap(PluginName, () => {
      this.wss.clients.forEach((client) => {
        client.send('recompile')
      })
    })
  }
}

module.exports = CompilerThenPlugin
