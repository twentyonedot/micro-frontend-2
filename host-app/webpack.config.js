const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: "http://localhost:3004/",
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ModuleFederationPlugin({
      name: "hostApp",
      filename: "remoteEntry.js",
      remotes: {
        remoteApp: "remoteApp@http://localhost:3005/remoteEntry.js",
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
    port: 3004,
    historyApiFallback: true,
    // static: {
    //   directory: require("path").join(__dirname, "dist"), // Serve from dist
    // },
  },
};
