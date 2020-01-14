// node add 组件名 描述
const PRENAME = 'elpand-'
const fs = require('fs')
const path = require('path')
const args = process.argv.splice(2)
const cname = PRENAME + args[0].replace(PRENAME, '')
const des = args[1]

const demo = `<template>
<div class="${cname}-demo">
  <${cname}></${cname}>
</div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="less">
  .${cname}-demo{

  }
</style>
`

const config = `{
  "name": "${des}",
  "doc": [
      {
          "title": "attributes",
          "table": [
              {
                  "prop": "prop",
                  "label": "参数"
              },
              {
                  "prop": "des",
                  "label": "说明"
              },
              {
                  "prop": "type",
                  "label": "类型"
              },
              {
                  "prop": "options",
                  "label": "可选值"
              },
              {
                  "prop": "default",
                  "label": "默认值"
              }
          ],
          "data": [
              {
                  "prop": "-",
                  "des": "-",
                  "type": "-",
                  "options": "-",
                  "default": "-"
              }
          ]
      },
      {
          "title": "events",
          "table": [
              {
                  "prop": "event",
                  "label": "事件名称"
              },
              {
                  "prop": "des",
                  "label": "说明"
              },
              {
                  "prop": "call",
                  "label": "回调参数"
              }
          ],
          "data": [
              {
                  "event": "-",
                  "des": "-",
                  "call": "-"
              }
          ]
      }
  ]
}
`
const js = `
import index from './src'

index.install = function (Vue) {
  Vue.component(index.name, index)
}

export default index
`
const vue = `<template>
<div class="${cname}">
 Hello ${cname}
</div>
</template>
<script>
export default {
  name: '${cname}',
  props: {

  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="less">
.${cname}{

}
</style>
`
init()
function init () {
  if (!cname) {
    console.log('请添加组件名')
    return false
  }
  if (!des) {
    console.log('请添加描素')
    return false
  }
  addExample()
  addLib()
  addindexJS()
}
function addExample () {
  const myPath = `example/pages/${cname}`
  create(myPath)
  write(`${myPath}/index.vue`, demo)
  write(`${myPath}/config.json`, config)
}

function addLib () {
  const myPath = `lib/${cname}`
  create(myPath)
  create(`${myPath}/src`)
  write(`${myPath}/src/index.vue`, vue)
  write(`${myPath}/index.js`, js)
}

function addindexJS () {
  const url = 'lib/index.js'
  const name = cname.replace(PRENAME, '')
  read(url, data => {
    data = `import ${name} from './${cname}'\n` + data
    const componentsText = 'const components = ['
    data = data.replace(componentsText, componentsText + `${name}, `)
    const ExportText = 'export default {'
    data = data.replace(ExportText, ExportText + `\n\t${name}, `)
    write(url, data)
  })
}

function write (uri, data) {
  fs.writeFile(path.join(process.cwd(), uri), data, function (err) {
    if (err) {
      console.error(err)
    }
  })
}

function read (uri, fuc) {
  fs.readFile(path.join(process.cwd(), uri), 'utf-8', function (err, data) {
    if (err) {
      console.log('error')
    } else {
      fuc(data)
    }
  })
}

function create (uri) {
  uri = path.join(process.cwd(), uri)
  if (!fs.existsSync(uri)) {
    fs.mkdirSync(uri)
  }
}
