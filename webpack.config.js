const path = require('path');
const env = require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/javascript/index.js',
  },
  mode: env.parsed.WP_ENV,
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }
    ),
    new CopyPlugin({
      patterns: [
        './src/manifest.json',
        './src/sw.js',
      ],
    }),
  ],
  output: {
    filename: 'javascript/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      },
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|ico)$/,
        type: 'asset/resource',
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      }
    ]
  },
};