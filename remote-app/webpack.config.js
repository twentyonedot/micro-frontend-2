const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: "http://localhost:3005/",
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ModuleFederationPlugin({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Component": "./src/Component",
      },
      shared: {
        axios: {
          singleton: true,
          requiredVersion: "^1.6.8",
          eager: true,
        },
        lodash: {
          singleton: true,
          requiredVersion: "^4.17.21",
          eager: true,
        },
      },
    }),
  ],
  devServer: {
    port: 3005,
    historyApiFallback: true,
    // static: {
    //     directory: require("path").join(__dirname, "dist"),
    //   },
  },
};
