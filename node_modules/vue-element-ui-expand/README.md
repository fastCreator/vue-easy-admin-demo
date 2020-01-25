# vue-element-ui-expand
## 由来以及描述
```
一般VUE后台系统开发选择的是elmenent-ui组件库开发，elmenent-ui组件是基础的、通用型的组件库，然而在常规性后台系统开发中，会出现大量类似的场景和交互形式；为了提升开发效率，遂基于elmenent-ui组件库进行二次封装
```
## demo
https://fastcreator.github.io/vue-element-ui-expand/
## github
https://github.com/fastCreator/vue-element-ui-expand
## npm
https://www.npmjs.com/package/vue-element-ui-expand
## 使用
```
npm install vue-element-ui-expand --save

import ElementUIExpand from 'vue-element-ui-expand'
Vue.use(ElementUIExpand)
```

## 开发
### 运行
```
npm install
npm run serve
```
### 新增组件
```
node add 组件名 描述

example/pages/对应组件/index.vue(开发案列)
lib/对应组件/...(开发组件)
```
### 更新文档
```
example/pages/对应组件/config.json中填写对应JSON文档
```
### 发布更新pages以及npm
```
1. 修改packjson版本号
2. npm run deploy
```

### Feature
- 等待版本稳定，打包为library，公用模块独立externals
- 
