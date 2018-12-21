const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const fs = require("fs");

const devMode = process.env.NODE_ENV !== "production";

module.exports = env => {
  return {
    entry: {
      index: "./src/index.jsx"
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/"
    },
    resolve: {
      extensions: [".js", ".jsx", ".css", ".ts", ".tsx"]
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
          exclude: /\.module.scss$/,
          use: [
            // Style-loader fallback adds CSS to DOM by injecting a <style> tag in dev mode
            // MiniCSSExtract plugin creates a CSS file per JS file which contains CSS in production mode
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            // Interprets imports/requires and resolves them for .css files
            "css-loader",
            // First converts .scss/.sass files into .css files
            "sass-loader"
          ]
        },
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.module.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
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
      }),
      new Dotenv({
        // path: fs.existsSync("./.env." + env.ENVIRONMENT)
        //   ? "./.env." + env.ENVIRONMENT
        //   : "./.env"
        path: "./.env.mock"
      })
    ],
    devServer: {
      port: 8080,
      historyApiFallback: true
    }
  };
};
