const fs = require('fs');
const compiler = require('./compiler');
const config = require('../static/config/config.json');

module.exports = function() {
  fs.readdir(config.contentPath, (err, files) => {
    files.forEach(file => {
      console.log(file);
    })
  });
}
