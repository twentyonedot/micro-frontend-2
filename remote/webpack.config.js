const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: "http://localhost:3001/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: "^18.2.0" },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.2.0",
        },
        lodash: { singleton: true, eager: true, requiredVersion: "^4.17.21" },
      },
    }),
  ],
};
