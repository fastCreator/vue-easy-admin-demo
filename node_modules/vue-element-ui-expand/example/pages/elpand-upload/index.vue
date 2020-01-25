<template>
  <div class="elpand-upload-demo">
    <elpand-upload
      v-model="value"
      :bind="bind"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
      >上传到服务器</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传jpg/png文件，且不超过500kb</div>
    </elpand-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      bind: {
        action: ''
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less">
.elpand-upload-demo {
}
</style>
