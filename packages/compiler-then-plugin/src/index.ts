import * as Net from 'net'
import * as WebSocket from 'ws'
import * as Webpack from 'webpack'

interface CompilerThenPluginOptions {
  /**
   * Port number of the internal websocket service
   *
   * default port is `3872`
   */
  port?: number
  /**
   * Custom execute script, a JavaScript string
   *
   * default script is `location.reload()`
   */
  script?: string
}

interface WebSocketServer extends WebSocket.Server {
  clients: Set<WebSocket>
}

function findAvailablePort(startPort: number): Promise<number> {
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
  options: CompilerThenPluginOptions
  wss: WebSocketServer = {} as WebSocketServer

  constructor(options?: CompilerThenPluginOptions) {
    const defaultOptions = { port: 3872, script: 'location.reload()' }
    this.options = { ...defaultOptions, ...(options || {}) }
    this.initServer()
  }

  async initServer() {
    this.options.port = await findAvailablePort(this.options.port!)
    this.wss = new WebSocket.Server({
      port: this.options.port,
    }) as WebSocketServer
  }

  apply(compiler: Webpack.Compiler) {
    if (
      !(
        process.env.NODE_ENV === 'development' ||
        compiler.options.mode === 'development'
      )
    )
      return

    const PluginName = 'CompilerThenPlugin'

    compiler.hooks.emit.tapAsync(PluginName, (compilation, callback) => {
      const codeToInject = /* js */ `
        ;(function () {
          const ws = new WebSocket('ws://localhost:' + ${this.options.port});

          ws.addEventListener('open', function (event) {
            console.log('[${PluginName}] Server started!')
          })
  
          ws.addEventListener('message', function (event) {
            if (event.data === 'recompile') {
              new Function(\`${this.options.script}\`)()
            }
          })
        })();
      `

      // Get the entry JS file
      const entryFiles = new Set()

      compilation.entrypoints.forEach((entry) => {
        entry.getFiles().forEach((file) => {
          if (file.endsWith('.js')) {
            entryFiles.add(file)
          }
        })
      })

      // Only the entry file is injected
      for (const filename of entryFiles) {
        if (compilation.assets[filename as string]) {
          const originalSource = compilation.assets[filename as string].source()
          const newSource = codeToInject + '\n' + originalSource
          compilation.assets[filename as string] = {
            source: () => newSource,
            size: () => newSource.length,
          } as any
        }
      }

      callback()
    })

    compiler.hooks.done.tap(PluginName, () => {
      this.wss.clients.forEach((client) => {
        client.send('recompile')
      })
    })
  }
}

export default CompilerThenPlugin
