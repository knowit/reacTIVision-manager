require('webpack');
const resolve = require('path').resolve;

module.exports = config = {
       devtool: 'eval-source-map',
       output:{
              library: 'bundle',
              libraryTarget: 'umd',
              filename: 'bundle.js',
              path: resolve('../public')
       },
       resolve: {
              extensions: ['.js','.jsx']
       },
       module: {
              rules: [
                     {
                            test: /\.js?|\.jsx?/,
                            loader: 'babel-loader',
                            exclude: /node_modules/
                     }
              ]
       }
};
