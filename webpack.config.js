const path = require('path');

module.exports = {
  entry: {
    main: './src/main/main.js',
    'renderer/assets/scripts/index': './src/renderer/assets/scripts/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx',
    ],
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js[x]?$/,
      },
    ],
  },
  externals: {
    electron: 'require("electron")',
    net: 'require("net")',
    remote: 'require("remote")',
    shell: 'require("shell")',
    app: 'require("app")',
    ipc: 'require("ipc")',
    fs: 'require("fs")',
    buffer: 'require("buffer")',
    system: '{}',
    file: '{}',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
