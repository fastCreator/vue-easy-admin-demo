<template>
  <div class="about">
    <h1>登录页面</h1>
  </div>
</template>
<script>
export default {
  created () {
    this.$net('function.add.apis.add', {
      params: { userId: 1 },
      body: { a: 1 },
      // query: { b: 2 }
    })
    this.$net('function.add.apis.get', {
      params: { userId: 1 },
      // query: { b: 2 }
    })
  }
}
</script>
