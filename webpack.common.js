const fs = require("fs");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const markdown = require("jstransformer")(require("jstransformer-markdown-it"));

module.exports = {
  entry: {
    app: "./app/index.js"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: ".concat() 2018",
      template: "./app/index.pug"
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "app/assets"),
        to: path.resolve(__dirname, "dist/assets")
      },
      {
        from: path.join(__dirname, "app/favicons"),
        to: path.resolve(__dirname, "dist/favicons")
      },
      {
        from: path.join(__dirname, "node_modules/font-awesome/fonts"),
        to: path.resolve(__dirname, "dist/fonts")
      },
      {
        from: path.join(__dirname, "app/images"),
        to: path.resolve(__dirname, "dist/images")
      }
    ]),
    new ImageminPlugin({
      pngquant: {
        quality: "95-100"
      },
      jpegtran: {
        progressive: true
      },
      test: /\.(jpe?g|png|gif|svg)$/i
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
      Headroom: "headroom.js"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        include: [/node_modules/],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: [/node_modules/]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.pug$/,
        use: [
          "raw-loader",
          {
            loader: "pug-html-loader",
            options: {
              data: {
                dynamicmd: function(path) {
                  return markdown.render(fs.readFileSync(path.trim()) + "")
                    .body;
                }
              }
            }
          }
        ]
      }
    ]
  },
  name: "website",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  target: "web"
};
