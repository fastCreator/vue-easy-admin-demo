<template>
  <div id="app">
    <el-container>
      <el-aside>
        <NavMenu />
      </el-aside>
      <el-main>
        <router-view></router-view>
        <Code></Code>
        <Doc></Doc>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'
import Doc from './components/doc.vue'
import Code from './components/code.vue'

export default {
  name: 'app',
  components: {
    NavMenu,
    Doc,
    Code
  }
}
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  & > .el-container {
    height: 100vh;
  }
}
</style>
