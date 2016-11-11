var webpack = require('webpack');

module.exports = {
  entry: [
    "./_scripts/libs.js",
    "./_scripts/scripts.js"
  ],
  output: {
    path: __dirname + "./_site/js/",
    filename: "all.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle: false,
    //   sourcemap: false,
    //   comments: false
    // })
  ]
};
