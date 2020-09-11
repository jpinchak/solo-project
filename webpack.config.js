const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
      path: path.resolve(__dirname, 'assets/build'),
      filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/assets/build',
    proxy: {
      '/items' : 'http://localhost:3000',
      '/additem' : 'http://localhost:3000',
      '/deleteitem' : 'http://localhost:3000',
      '/maxid': 'http://localhost:3000'
    }
  },
  mode: process.env.NODE_ENV,
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
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};