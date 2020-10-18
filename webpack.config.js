const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const outputDirectory = "dist";
const IS_DEV = process.env.NODE_ENV !== "production";

module.exports = {
  target: "web",
  entry: ["babel-polyfill", "./src/client/index.js"],
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
    new HtmlWebpackPlugin({
      // hash: true,
      //inject: true,
      // template: path.resolve(
      //   __dirname,
      //   "..",
      //   "src",
      //   "client",
      //   "public",
      //   "index.html"
      // ),
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    // new ExtractTextPlugin({
    //   filename: "[name].css",
    //   disable: IS_DEV,
    // }),
    //  new webpack.EnvironmentPlugin(["NODE_ENV"]),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "all",
  //       },
  //     },
  //   },
  // },
};
