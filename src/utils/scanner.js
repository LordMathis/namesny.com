const fs = require('fs');
const path = require('path');
const async = require('async');
const Compiler = require('./compiler');
const config = require('../static/config/config.json');
const data = require('./data.json');

module.exports = function() {

  var compiler = new Compiler(data);

  function readdir(callback) {
    fs.readdir(config.contentPath, callback);
  }

  function compile(files, callback) {
    files.forEach(file => {
      const filePath = path.join(process.cwd(), config.contentPath, file);
      compiler.addFile(filePath);
    });
    return callback(null);
  }

  function writeData(callback) {
    compiler.writeData(callback);
  }

  async.waterfall([
    readdir,
    compile,
    writeData
  ], (err => {
    if(err) throw err;
  }));
}
