<template>
  <div class="elpand-form-demo">
    <elpand-form
      v-bind="bind"
      v-if="visible"
      @close="close"
    ></elpand-form>
  </div>
</template>
<script>
const selectData = {
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
  },
}
import { Promise } from 'q';
export default {
  data() {
    return {
      visible: true,
      bind: {
        dialog: {
          bind: {
            title: '新增',
            width: '500px'
          },
          on: {}
        },
        form: {
          data: {
            name: 'zhangsan',
            hide: ''
          },
          on: {},
          bind: {
            labelWidth: '180px'
          },
          list: [
            {
              tag: 'elpand-select',
              prop: 'name',
              label: '姓名',
              bind: {
                options: selectData.options,
                optionsProps: selectData.optionsProps
              },
              itemBind: {
                rules: [{ required: true, message: '姓名不能为空' }]
              }
            },
            {
              tag: 'el-input',
              prop: 'hide',
              label: '隐藏项',
              visible(data) {
                console.log(data)
                return data.name !== 'zhangsan'
              }
            }
          ],
          submit(o) {
            console.log(o)
            return new Promise(r => {
              setTimeout(() => {
                r()
              }, 1000);
            })
          }
        }
      }
    }
  },
  created() {
  },
  methods: {
    close() {
      this.visible = false
    }
  }
}
</script>
<style lang="less">
.elpand-form-demo {
}
</style>
