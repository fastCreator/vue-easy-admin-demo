<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>
      <el-input v-model="v"/>
    </h2>
    <!-- <el-button v-permission="add">新增</el-button> -->
    <!-- <div>{{ data }}</div> -->
  </div>
</template>
<script>
export default {
  data () {
    return { v: 1 }
  },
  created () {
    // this.API.getTable()
  }
}
</script>
