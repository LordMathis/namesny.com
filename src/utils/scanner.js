const fs = require('fs');
const Compiler = require('./compiler');
const config = require('../static/config/config.json');
const data = require('./data.json');

module.exports = function() {

  var compiler = Compiler(data);

  fs.readdir(config.contentPath, (err, files) => {
    files.forEach(file => {
      compiler.addFile(file);
    });
    compiler.writeData();
  });
}
