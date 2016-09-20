require('es6-promise').polyfill();
var webpack = require('webpack');

module.exports = {
    entry: "./client/js/index",
    output: {
      path: __dirname,
           filename: "./client/js/build.js"
    },
    module: {
        loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {presets: ['es2015', 'es2016']}
          },
          {
              test: /\.css$/,
              loader: "style-loader!css!"
          },
          {
              test: /\.ejs$/,
              loader: 'underscore-template-loader'
          }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          _: 'underscore'
        }),
        new webpack.DefinePlugin({
          BACKEND_URL: "'https://tranquil-hollows-87892.herokuapp.com'"
        })
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //     warnings: false,
        //     drop_console: true,
        //     unsafe: true
        //   }
        // })
    ]
};
