export default {
  getDepartment (params) {
    return this.$net('get:/v1/apis/department', { query: params })
  }
}
