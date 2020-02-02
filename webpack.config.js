const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: { engine: "./engine/index.ts", demo: "./demo/scripts/demo.ts" },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts"],
    alias: {
      Engine: path.resolve(__dirname, "engine"),
      Demo: path.resolve(__dirname, "demo", "scripts")
    }
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: "demo/index.html", to: "index.html" },
      { from: "demo/styles", to: "styles" }
    ])
  ]
};
