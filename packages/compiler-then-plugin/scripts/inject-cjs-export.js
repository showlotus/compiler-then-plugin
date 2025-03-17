const fs = require('fs')
const path = require('path')

const entryFilePath = path.resolve(__dirname, '../dist/index.js')
fs.appendFile(
  entryFilePath,
  '\nmodule.exports = CompilerThenPlugin;',
  (err) => {
    if (err) {
      throw err
    }
  }
)

const typesFilePath = path.resolve(__dirname, '../types/index.d.ts')
const typesContent = fs
  .readFileSync(typesFilePath, { encoding: 'utf-8' })
  .replace('export default CompilerThenPlugin', 'export = CompilerThenPlugin')
fs.writeFileSync(typesFilePath, typesContent)
