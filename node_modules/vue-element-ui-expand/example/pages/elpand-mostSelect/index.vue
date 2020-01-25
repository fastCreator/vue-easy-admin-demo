<template>
  <div class="elpand-mostSelect-demo">
    <elpand-mostSelect
      v-bind="bind"
      v-model="value"
    ></elpand-mostSelect>
  </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      value: [],
      bind: {
        searchProps: {
          list: 'list',
          total: 'total'
        },
        search: this.search,
        optionsProps: {
          label: 'label',
          value: 'value'
        }
      }
    }
  },
  created() {

  },
  methods: {
    search(v) {
      console.log(v)
      return new Promise(r => {
        setTimeout(() => {
          r({
            list: [
              { label: '张三1', value: '1' },
              { label: '张三2', value: '2' },
              { label: '张三3', value: '3' }
            ],
            total: 100
          })
        }, 1000)
      })
    }
  }
}
</script>
<style lang="less">
.elpand-mostSelect-demo {
}
</style>
