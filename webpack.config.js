const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/', // Define onde os arquivos serão copiados
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      'leaflet': path.resolve(__dirname, 'node_modules/leaflet/dist/leaflet.js'),
      'leaflet.css': path.resolve(__dirname, 'node_modules/leaflet/dist/leaflet.css'),
    },
  },
  
};