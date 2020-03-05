<template>
  <el-card class="page-container page-department">
    <div class="operation">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" />
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="danger" @click="deleteMuti">删除</el-button>
    </div>
    <el-tree
      :data="data"
      :props="defaultProps"
      default-expand-all
      show-checkbox
      node-key="id"
      :filter-node-method="filterNode"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ node }">
        <span class="text">{{ node.label }}</span>
        <span class="operation">
          <el-button type="primary">
            编辑
          </el-button>
          <el-button type="danger">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <elpand-form ref="form" v-bind="form" />
  </el-card>
</template>
<script>
export default {
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    filterNode (value, data, node) {
      if (!value) return true
      if (data.label.indexOf(value) !== -1) {
        return true
      }
      let p = node.parent
      while (p.level > 0) {
        if (p.label.indexOf(value) !== -1) {
          return true
        } else {
          p = p.parent
        }
      }
      return false
    },
    add () {
      this.$refs.form.open('新增')
    },
    deleteMuti () {
      this.$confirm(`删除${this.$refs.tree.getCheckedKeys()}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    async getDepartment () {
      let data = await this.$api.getDepartment()
      this.data = data
    }
  },
  data () {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {
    this.getDepartment()
  },
  computed: {
    form () {
      return {
        dialogBind: {
          width: '800px'
        },
        list (data, title) {
          return [
            {
              label: '部门名称',
              prop: 'name',
              tag: 'el-input'
            }
          ]
        },
        async submit (o) {}
      }
    }
  }
}
</script>
<style lang="less">
.page-department .el-card__body {
  & > .operation {
    display: flex;
    margin-bottom: 10px;
    .el-button {
      margin-left: 10px;
    }
  }
  & > .el-tree {
    border: 1px solid rgb(220, 223, 230);
    height: calc(100% - 50px);
    overflow: auto;
    border-radius: 4px;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      display: flex;
      .text {
        flex: 1;
      }
      .operation {
        flex: 0;
        .el-button {
          padding: 3px;
        }
      }
    }
  }
}
</style>
