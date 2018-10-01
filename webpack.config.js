const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          // Style-loader fallback adds CSS to DOM by injecting a <style> tag in dev mode
          // MiniCSSExtract plugin creates a CSS file per JS file which contains CSS in production mode
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // Interprets imports/requires and resolves them for .css files
          "css-loader",
          // First converts .scss/.sass files into .css files
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css"
    })
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true
  }
};
