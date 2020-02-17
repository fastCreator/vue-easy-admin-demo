module.exports = {
  'post:/v1/apis/login' (req) {
    return Promise.resolve('token1')
  }
}
