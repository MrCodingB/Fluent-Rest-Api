const path = require('path');
const TypescriptDeclarationBundler = require('./bundler');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new TypescriptDeclarationBundler({
      output: 'fluent-rest-api.d.ts',
      exclude: /index\.d\.ts/
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'fluent-rest-api.js',
    path: path.resolve(__dirname, 'lib')
  },
  mode: 'production'
};
