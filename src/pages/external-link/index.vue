<template>
  <div class="about">
    <h1>This is an link page</h1>
    <el-button @click="switchLang">切换语言</el-button>
    <!-- <el-button v-permission="add">新增</el-button> -->
    <!-- <div>{{ data }}</div> -->
    <h2>
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
      <p>{{ $l('message') }}</p>
    </h2>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: new Date()
    }
  },
  created () {
    // checkPermission
    // this.API.getTable()
  },
  methods: {
    switchLang () {
      // store.commit('increment', 10)
      this.$store.commit('setLang', 'zh-CN')
    }
  }
}
</script>
