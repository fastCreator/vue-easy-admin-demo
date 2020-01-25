<template>
  <el-row class="elpand-inputUpload">
    <el-col
      :span="18"
      class="input-wrap"
    >
      <el-input
        :value="value"
        @input="input"
        :placeholder="placeholder"
      />
    </el-col>
    <el-col :span="4">
      <el-upload
        :multiple="false"
        :auto-upload="false"
        :fileList="[]"
        :show-file-list="false"
        :accept="accept"
        :action="$attrs.action||''"
        :on-change="change"
        v-bind="$attrs"
        v-on="_events"
      >
        <el-button type="primary">上传</el-button>
      </el-upload>
    </el-col>
  </el-row>
</template>
<script>
import emitter from '../../utils/emitter';
import { MIME_type } from '../../utils/commom'
export default {
  name: 'elpand-inputUpload',
  mixins: [emitter],
  props: {
    upload: {
      type: Function,
      require: true,
    },
    value: {
      type: String,
      require: true,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    type: {
      type: [Array, String],
      default: () => (['png', 'jpg', 'jpeg'])
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    accept() {
      return this.type.map(it => MIME_type[it] || it).join(',')
    }
  },
  methods: {
    input(v) {
      this.$emit('input', v)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      }
    },
    async change(e) {
      this.input(await this.upload(e))
    }
  }
}
</script>

<style lang="less">
.elpand-inputUpload {
  .input-wrap {
    padding-right: 14px;
  }
}
</style>