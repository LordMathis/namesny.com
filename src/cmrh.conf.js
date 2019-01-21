var sass = require('node-sass');

module.exports = {
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) => sass.renderSync({
      data,
      file: filename,
  }).css
}
