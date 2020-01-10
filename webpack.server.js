const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')

const serverConfig = {
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'server.js',
    publicPath: '/'
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
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              onlyLocals: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new WebpackCleanupPlugin()
  ]
}

module.exports = serverConfig
