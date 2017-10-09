const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: ['./src/app.js', './src/main.scss'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, { 
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
    }, { 
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
      loader: 'file-loader' 
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }],
    // rules: [{
    //   test: /\.scss$/,
    //   use: [
    //     { loader: 'style-loader' },
    //     { loader: 'css-loader' },
    //     { loader: 'sass-loader' }
    //   ]
    // }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ],
  devServer: {
    contentBase: './dist',
    watchContentBase: true
  }
};