
<template functional>
  <el-menu
    router
    :default-active="parent.$route.path"
    class="el-menu-vertical-demo"
  >

    <el-menu-item
      v-for="it in parent.$root.configs"
      :key="it.path"
      :index="it.path"
    >
      <span slot="title">{{it.data.name}}</span>
    </el-menu-item>

  </el-menu>

</template>
