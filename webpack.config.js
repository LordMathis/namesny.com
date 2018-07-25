const { resolve, join } = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin');

const config = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  context: resolve(__dirname, 'src'),
  entry: {
    bundle: [
      'webpack-hot-middleware/client',
      './app-client.js'
    ]
  },
  output: {
    path: resolve(__dirname,'public/static'),
    filename: 'bundle.js',
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
          {
            loader: "style-loader"
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new ManifestPlugin({'writeToFileEmit': true})
  ]
}
module.exports = config
