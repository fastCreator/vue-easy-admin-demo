<template>
  <el-upload class="elpand-upload" :value="value" @input="input" v-bind="bind" v-on="on">
    <slot name="tip" slot="tip"></slot>
    <slot name="trigger" slot="trigger"></slot>
    <slot name="default" slot="default"></slot>
  </el-upload>
</template>
<script>
import emitter from '../../utils/emitter';
export default {
  name: 'elpand-upload',
  mixins: [emitter],
  props: {
    validateEvent: {
      type: Boolean,
      default: true
    },
    value: {
      required: true
    },
    bind: {
      type: Object,
      default: () => ({})
    },
    on: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    input(v) {
      this.$emit('input', v)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [v]);
      }
    }
  }
}
</script>
<style lang="less">
.elpand-upload {
}
</style>
