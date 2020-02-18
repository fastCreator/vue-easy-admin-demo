<template>
  <div class="page-one">
    <el-button @click="copy">复制</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {},
  methods: {
    copy(){
      this.$service.copy.copyText('XXXXXXXXXXXX')
    }
  }
}
</script>
