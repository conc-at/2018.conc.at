const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
})

const copyStatic = new CopyWebpackPlugin([
  {
    from: path.join(__dirname, '../app/images'),
    to: 'images'
  },
  {
    from: path.join(__dirname, '../app/favicons'),
    to: 'favicons'
  }
])

const plugins = [
  new HtmlWebpackPlugin({
    title: 'frontend-boilerplate',
    template: path.join(__dirname, '../app/index.html')
  }),
  extractSass,
  copyStatic
]

module.exports = function() {
  return {
    entry: {
      app: path.join(__dirname, '../app/scripts/main.js')
    },

    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[hash].js'
    },

    module: {
      rules: [
        // JavaScript / ES6
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Styles
        {
          test: /\.scss$/,
          use: extractSass.extract({
            use: [
              {
                loader: 'css-loader',
                options: {sourceMap: true}
              },
              {
                loader: 'sass-loader',
                options: {sourceMap: true}
              }
            ],
            fallback: 'style-loader'
          })
        },
        // Images
        // Inline base64 URLs for <=8k images, direct URLs for the rest
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'url',
          query: {
            limit: 8192,
            name: 'images/[name].[ext]?[hash]'
          }
        }
      ]
    },

    plugins
  }
}
