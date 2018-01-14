const merge = require("webpack-merge");
const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  plugins: [
    new MinifyPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CompressionPlugin()
  ]
});
