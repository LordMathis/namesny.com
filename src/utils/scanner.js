const fs = require('fs');
const path = require('path');
const Compiler = require('./compiler');
const config = require('../static/config/config.json');
const data = require('./data.json');

module.exports = function() {

  console.log(data);
  var compiler = new Compiler(data);

  fs.readdir(config.contentPath, (err, files) => {
    files.forEach(file => {
      const filePath = path.join(process.cwd(), config.contentPath, file);
      compiler.addFile(filePath);
    });
    compiler.writeData();
  });
}
