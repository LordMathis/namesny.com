const fs = require('fs')
const path = require('path')
const async = require('async')
const Compiler = require('./compiler')
const config = require('../../config.json')
const jsonfile = require('jsonfile')

module.exports = function () {
  const data = jsonfile.readFileSync(config.dataPath)
  var compiler = new Compiler(data)

  /**
   * Reads the directory and returns it's content
   */
  function readdir (callback) {
    fs.readdir(config.contentPath, callback)
  }

  /**
   * Calls compile on each file in the directory
   */
  function compile (files, callback) {
    console.log('[Scanner] Discovered files: ' + files)
    async.each(files, compileFile, (err) => {
      if (err) throw err
      callback()
    })
  }

  /**
   * Helper function which calls compile in the Compiler module
   */
  function compileFile (file, callback) {
    const filePath = path.join(process.cwd(), config.contentPath, file)

    // config.files contains list of file names which are not considered blog posts
    if (config.files.indexOf(file) === -1) {
      compiler.addFile(filePath, true, callback)
    } else {
      compiler.addFile(filePath, false, callback)
    }
  }

  /**
   * Writes updated data into the data file
   */
  function writeData (callback) {
    compiler.writeData(callback)
  }

  /**
   * Main function. Scans the directory for files and compiles them into html
   * using the Compiler module
   */
  async.waterfall([
    readdir,
    compile,
    writeData
  ], (err) => {
    if (err) throw err
  })
}
