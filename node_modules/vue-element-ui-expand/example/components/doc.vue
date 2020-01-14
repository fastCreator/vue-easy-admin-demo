<template functional>
  <div class="elpand-doc">
    <div
      class="item"
      v-for="it in parent.$root.doc.data.doc"
      :key="it.title"
    >
      <h3 class="title">{{it.title}}</h3>
      <el-table
        :data="it.data"
        style="width: 100%"
      >
        <el-table-column
          v-for="jt in it.table"
          :key="jt.prop"
          :prop="jt.prop"
          :label="jt.label"
        >
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<style lang="less">
.elpand-doc {
  border-top: 1px solid #ccc;
}
</style>
  