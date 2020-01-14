<template>
  <div class="elpand-inputUpload-demo">
    <elpand-inputUpload
      v-bind="bind"
      v-model="value"
    ></elpand-inputUpload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      bind: {
        upload(file) {
          console.log(file)
          return Promise.resolve('https://123.png')
        }
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
.elpand-inputUpload-demo {
}
</style>
