require('babel-register');
var path = require('path');

var app = new (require('express'))();
var port = process.env.PORT || 3000;

const sass = require('node-sass');

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) => sass.renderSync({
      data,
      file: filename,
  }).css
});

var fs = require('fs');
var filename = './src/utils/data.json';
var dataStub = {"posts": [], "other": []};
fs.writeFileSync(filename, JSON.stringify(dataStub));

require('./utils/scanner')();

var serverRender = require('./utils/serverRender');
app.get("*", serverRender);

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("[Server] Listening on port %s", port);
  }
})
