const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (msg) => {
    console.log(msg)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

class WatchThen {
  apply(compiler) {
    compiler.hooks.beforeRun.tapPromise('WatchThen', async (compiler) => {
      console.log('BeforeCompilePlugin: Compiler is running...')
      // 在这里执行你的逻辑
      // 例如，可以读取文件、设置环境变量等
    })

    compiler.hooks.done.tap('WatchThen', (stats) => {
      console.log('webpack build is done')

      wss.clients.forEach((client) => {
        client.send('webpack build is done')
      })

      // wss.emit('message', 'WatchThen done')

      // compiler.hooks.emit.tapAsync('WatchThen', (compilation, callback) => {
      //   const assetNames = Object.keys(compilation.assets)
      //   console.log(assetNames)
      //   assetNames.forEach((assetName) => {
      //     if (assetName.endsWith('.js')) {
      //       const asset = compilation.assets[assetName]
      //       const source = asset.source()
      //       const logCode = 'console.log("Build completed successfully");'
      //       compilation.assets[assetName] = {
      //         source: () => source + logCode,
      //         size: () => source.length + logCode.length
      //       }
      //     }
      //   })
      //   callback()
      // })
    })
  }
}

module.exports = WatchThen

// const ws = new WebSocket('ws://localhost:3000');

// ws.addEventListener("open", function (event) {
//   ws.send("Hello Server!");
// });

// // Listen for messages
// ws.addEventListener("message", function (event) {
//   console.log("Message from server ", event.data);
//   location.reload()
// });
