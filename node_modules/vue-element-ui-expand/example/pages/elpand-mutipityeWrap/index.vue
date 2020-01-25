<template>
  <div class="elpand-mutipityeWrap-demo">
    <el-form>
      <elpand-mutipityeWrap
        v-bind="bind"
        v-model="value"
      ></elpand-mutipityeWrap>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: [
        {
          value: '123123',
          key: '1'
        }
      ],
      bind: {
        addValue: {
          value: '',
          key: ''
        },
        tag: 'el-input',
        props: {
          value: 'value',
          key: 'key'
        }
      }
    }
  },
  created() {
  },
  methods: {
  },
  watch: {
    value: {
      handler(v) {
        console.log(v)
      },
      deep: true
    }
  }
}
</script>
<style lang="less">
.elpand-mutipityeWrap-demo {
}
</style>
