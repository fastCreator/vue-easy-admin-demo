const regex = /\.\/(.+)\/config\.json$/
const context = require.context('./pages', true, /\.\/(.+)\/config\.json$/)
let configs = context.keys().map(key => ({
  path: `/${key.match(regex)[1]}`,
  data: context(key)
}))

export default configs
