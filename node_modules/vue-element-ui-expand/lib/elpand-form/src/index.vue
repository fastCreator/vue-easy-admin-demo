<template>
  <el-dialog v-if="dialog" v-bind="dialog.bind" v-on="dialog.on" :before-close="close" visible>
    <my-form :createElement="createElement" v-bind="form" ref="form"/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
  <my-form ref="form" v-else v-bind="form"/>
</template>
<script>
import myForm from './form'

export default {
  name: 'elpand-form',
  components: {
    myForm
  },
  props: {
    createElement: {
      type: Function
    },
    dialog: {
      type: Object
    },
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async submit() {
      await this.$refs.form.validate()
      this.close()
    }
  }
}
</script>
<style lang="less">
.elpand-form {
  .el-input {
    max-width: 220px;
  }
}
</style>
