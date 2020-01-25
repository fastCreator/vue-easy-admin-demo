module.exports = {
  publicPath: './',
  configureWebpack: {
    entry: './example/main.js',
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: 'less-loader' // compiles Less to CSS
        },
        {
          test: /\.node$/,
          use: [
            {
              loader: './node.loader.js'
            }
          ]
        }
      ]
    },
    externals: {
      // lodash: {
      //   commonjs: 'libraryName',
      //   commonjs2: 'libraryName',
      //   amd: 'libraryName',
      //   root: '_'
      // }
    }
  }
}
