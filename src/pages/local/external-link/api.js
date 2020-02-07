export default {
  getTable () {
    return this.get(this.apiPath.getTable).then(d => d.data)
  }
}
