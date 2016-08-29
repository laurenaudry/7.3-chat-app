module.exports = {
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    publicPath: 'javascripts'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}
