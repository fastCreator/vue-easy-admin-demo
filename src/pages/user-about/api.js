export default {
  getTable () {
    ajax(this.bascic.getTree, {
      path, query, data
    }).then(d => d.data)
  }
}
