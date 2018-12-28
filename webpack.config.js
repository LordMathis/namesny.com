const { resolve, join } = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const commonConfig = {
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
      loader: 'url-loader',
      options: {
        limit: 8192
      }
    },
  ]
}

const browserConfig = {
  mode: 'production',
  context: resolve(__dirname, 'src'),
  entry: {
    bundle: [
      './app-client.js'
    ]
  },
  output: {
    path: resolve(__dirname, 'public/static'),
    filename: '[name].[contenthash].js',
    publicPath: '/static/'
  },
  module: commonConfig,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DefinePlugin({__isBrowser__: "true"}),
    new CleanWebpackPlugin(['public/static'], {}),
    new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
    // new CompressionPlugin({}),
    // new ManifestPlugin(),
  ]
}

const serverConfig = {
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: commonConfig,
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    new MiniCssExtractPlugin({filename: '[name].[contenthash].css'}),
  ]
}

module.exports = [browserConfig, serverConfig]
