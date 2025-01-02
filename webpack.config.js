const path = require('path')
const chalk = require('chalk')

class WatchThen {
  apply(compiler) {
    compiler.hooks.done.tap('WatchThen', stats => {
      console.log(chalk.green.underline('webpack build is done'))
    })
  }
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    iife: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // host: 'localhost.xxx.com',
    port: 8080,
    // allowedHosts: 'all',
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有资源访问
    },
  },
  plugins: [new WatchThen()],
}
