<template>
  <div class="elpand-select-demo">
    <h1>基础用法</h1>
    <elpand-select
      :options="options"
      :optionsProps="optionsProps"
      v-model="value"
    ></elpand-select>
    <h1>ajax请求options</h1>
    <elpand-select
      :options="getOptions"
      :optionsProps="optionsProps"
      v-model="value"
    ></elpand-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 'zhangsan',
      options: [
        {
          label: '张三',
          value: 'zhangsan'
        },
        {
          label: '李四',
          value: 'lisi'
        }
      ],
      optionsProps: {
        label: 'label',
        value: 'value'
      }
    }
  },
  created() {
  },
  methods: {
    getOptions() {
      return Promise.resolve({ data: this.options }).then(d => d.data)
    }
  }
}
</script>
<style lang="less">
.elpand-select-demo {
}
</style>
