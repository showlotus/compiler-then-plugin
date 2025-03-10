const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    iife: true,
  },
  devServer: {
    port: 9090,
    // allowedHosts: 'all',
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有资源访问
    },
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
}
