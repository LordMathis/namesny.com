
const { resolve, join } = require('path')
const webpack = require('webpack')

const config = {
  context: resolve(__dirname, 'src'),
  entry: {
    bundle: [
      './app-client.js'
    ]
  },
  output: {
    path: resolve(__dirname, 'public/static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
         // this assumes your vendor imports exist in the node_modules directory
         return module.context && module.context.indexOf('node_modules') !== -1
      }
    })
  ]
}

module.exports = config
