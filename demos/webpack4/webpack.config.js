const path = require('path')
const CompilerThenPlugin = require('compiler-then-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // iife: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // host: '0.0.0.0',
    port: 13871,
    // allowedHosts: 'all',
    compress: true,
    hot: false,
    liveReload: false,
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有资源访问
    },
    // open: true,
  },
  plugins: [new CompilerThenPlugin()],
}
