const { resolve, join } = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = {
  mode: 'production',
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
          MiniCssExtractPlugin.loader,
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
            loader: 'sass-loader'
          }
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
    new MiniCssExtractPlugin({})
  ]
}

module.exports = config
