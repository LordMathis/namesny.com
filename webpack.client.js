const { resolve } = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')

const browserConfig = {
  entry: {
    bundle: [
      './src/app-client.js'
    ]
  },
  output: {
    path: resolve(__dirname, 'public/static'),
    filename: '[name].[contenthash].js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ],
        include: resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
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
          limit: 8192
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CompressionPlugin({})
  ],
  node: { fs: 'empty' }
}

module.exports = browserConfig
