<template>
  <el-select
    class="elpand-select"
    :value="value"
    v-bind="$attrs"
    v-on="_events"
  >
    <el-option
      v-for="item in items"
      :key="item[optionsProps.value]"
      :label="item[optionsProps.label]"
      :value="item[optionsProps.value]"
    />
  </el-select>
</template>
<script>
export default {
  name: 'elpand-select',
  props: {
    type: [Array, Function],
    value: {},
    options: {
      default() { return [] }
    },
    optionsProps: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value'
        }
      }
    }
  },
  data() {
    return {
      items: []
    }
  },
  async created() {
    console.log(this)
    if (typeof (this.options) === 'function') {
      this.items = await this.options()
    } else {
      this.items = this.options
    }
  }
}
</script>
