const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, '.', './src/index.tsx'),
  devtool: "inline-source-map",
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              ["@babel/preset-react", {"runtime": "automatic"}]
            ]
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: 'asset/resource'
    
     },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              ["@babel/preset-react", {"runtime": "automatic"}],
              '@babel/preset-typescript'
            ],
            plugins: ["@babel/transform-runtime"]
          }
        }]
      }
    ]
  },
  plugins: [
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
    modules: ['src', 'node_modules'] 
  } 
}