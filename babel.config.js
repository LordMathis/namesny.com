module.exports = function (api) {
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-proposal-class-properties'
  ]

  if (api.env() === 'development') {
    plugins.push([
      'css-modules-transform', {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        preprocessCss: processSass,
        extensions: ['.css', '.scss']
      }
    ])
  }

  return {
    presets,
    plugins
  }
}

var sass = require('node-sass')

function processSass (data, filename) {
  var result
  result = sass.renderSync({
    data: data,
    file: filename
  }).css
  return result.toString('utf8')
}
