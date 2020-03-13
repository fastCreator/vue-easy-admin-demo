export default {
  getTableData (params) {
    return this.$net('get:/v1/apis/tableList', { query: params })
  },
  getDepartment (params) {
    return this.$net('get:/v1/apis/department', { query: params })
  }
}
