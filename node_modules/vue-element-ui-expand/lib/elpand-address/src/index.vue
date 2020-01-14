<template>
  <el-cascader
    class="elpand-address"
    :value="value"
    :options="myOptions"
    v-bind="bind"
    v-on="on"
    @input="input"
  ></el-cascader>
</template>
<script>
import address from './address'
export default {
  name: 'elpand-address',
  props: {
    options: {
      type: [Function, Array],
      default: () => address
    },
    bind: {
      type: Object,
      default: () => ({})
    },
    on: {
      type: Object,
      default: () => ({})
    },
    value: {
      required: true
    }
  },
  data() {
    return {
      myOptions: []
    }
  },
  created() {
    this.setOptions()
  },
  methods: {
    async setOptions() {
      const options = this.options
      if (Array.isArray(options)) {
        this.myOptions = options
      } else {
        this.myOptions = await this.options()
      }
    },
    input(v) {
      this.$emit('input', v)
    }
  }
}
</script>
<style lang="less">
.elpand-address {
}
</style>
