const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
      //publicPath: '/build/',
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};