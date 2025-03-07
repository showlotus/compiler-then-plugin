const path = require('path')
const CompilerThenPlugin = require('./CompilerThenPlugin')

module.exports = {
  mode: 'development',
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
    // host: '0.0.0.0',
    port: 8080,
    // allowedHosts: 'all',
    compress: true,
    hot: false,
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有资源访问
    },
  },
  plugins: [new CompilerThenPlugin()],
}
