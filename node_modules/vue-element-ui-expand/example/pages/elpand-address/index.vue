<template>
  <div class="elpand-address-demo">
    <elpand-address
      v-model="value"
      :bind="bind"
    ></elpand-address>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      bind: {
        filterable: true
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
.elpand-address-demo {
}
</style>
