module.exports = {
  define: {
    title: 'Vue Admin'
  },
  configureWebpack: {
    devServer: {
      proxy: {
        '^/service': {
          target: 'http://39.105.156.22:8095'
        }
      }
    }
  }
}
