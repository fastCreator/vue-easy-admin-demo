module.exports = function () {
  return `export default ${JSON.stringify(getAllDirs())}`
}

const fs = require('fs')
const path = require('path')
const myPath = path.resolve(__dirname, './example/pages')
let map = {}
function getAllDirs () {
  const items = fs.readdirSync(myPath)
  items.forEach(it => {
    map[it] = fs.readFileSync(path.join(myPath, it, 'index.vue'), 'utf-8')
  })
  return map
}
