<template>
  <div class="page-one">
    <el-button disabled="disabled">打开</el-button>
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
  methods: {},
  computed:{
    disabled(){
      return this.$service.permission.hasPermission('root.open')
    }
  }
}
</script>
