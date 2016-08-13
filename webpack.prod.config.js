var babelPresets = {presets: ['react', 'es2015']};
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: ['./src/index'],
  output: {
    path: __dirname + "/src",
    filename: 'app.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJSPlugin({
      minimize: true,
      mangle: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader?' + JSON.stringify(babelPresets)],
      include: path.join(__dirname, 'src'),
    },{
      test: /\.scss$/,
      exclude:/(node_modules)/,
      loaders: ["style", "css?sourceMap", "sass?sourceMap"]
    },{
      test:/\.json$/,
      loader: 'json-loader'
    }]
  },
  node: {
    console: true,
    fs: 'empty',
    tls: 'empty',
    net: 'empty'
  }
}
