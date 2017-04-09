const path = require('path');

module.exports = {
  entry: [
    './src/app-client.js'
  ],
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    publicPath: "/js/",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.json$/, exclude: /node_modules/, loader: 'json-loader' },
      {test: /\.(png|jpg)$/, exclude: /node_modules/, loader: 'url-loader'},
      {test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }
    ]
  },
  plugins: []
}
