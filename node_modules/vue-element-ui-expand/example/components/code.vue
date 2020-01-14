<template>
  <div class="elpand-code">
    <el-button
      type="text"
      @click="dialogVisible = true"
    >
      <h2>DEMO CODE</h2>
    </el-button>
    <el-dialog
      title="代码"
      :visible.sync="dialogVisible"
    >
      <pre><code>{{code}}</code></pre>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import file from './file.node';
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    code() {
      return file[this.$route.path.slice(1)]
    }
  }
}
</script>
<style lang="less">
.elpand-code {
  border-top: 1px solid #ccc;
  margin-top: 50px;
}
</style>
  