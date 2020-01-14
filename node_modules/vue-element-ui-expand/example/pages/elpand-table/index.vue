<template>
  <div class="elpand-table-demo">
    <elpand-table
      ref="table"
      v-bind="bind"
    ></elpand-table>
  </div>
</template>
<script>
import { Promise } from 'q';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      bind: {
        tableSort(evt, data, cb) {
          console.log(evt, data)
          //接口调用成功后执行cb()
          cb()
        },
        tableExport: {
          filter(row, prop) {
            if (prop === 'sex') {
              return row.sex ? '男' : '女'
            }
            return row[prop]
          },
          filename: 'excel-list',
          autoWidth: true,
          bookTypes: ['xlsx', 'xlsm', 'csv', 'txt']
        },
        tableFilter: true,
        filters: [
          {
            label: '输入框',
            prop: 'input',
            tag: 'el-input'
          },
          {
            label: '选择框',
            prop: 'select',
            tag: 'elpand-select',
            default: 'zhangsan',
            bind: {
              options: [{ label: '张三', value: 'zhangsan' }]
            }
          }
        ],
        table: {
          data: 'list',
          bind: {
            height: '50vh',
            rowKey: 'id',
            border: true
          },
          on: {
            'row-dblclick'(row, column, event) {
              console.log(row, column, event)
            }
          },
          columns: [
            { type: 'selection', bind: { width: '55' } },
            { type: 'time', format: 'yyyy-MM-dd hh:mm:ss', label: '出生时间', prop: 'birth' },
            { type: 'image', label: '头像', prop: 'header' },
            { component: { tag: 'el-input', bind: {}, on: {} }, label: '输入框', prop: 'input' },
            {
              component: {
                tag: 'elpand-select',
                bind: {
                  options: this.getOptions,
                  optionsProps: {
                    label: 'label',
                    value: 'value'
                  }
                }, on: {}
              },
              label: '下拉选择框', prop: 'select'
            },
            { label: '姓名', prop: 'name' },
            { label: '年龄', prop: 'age' },
            { type: 'color', label: '喜欢颜色', prop: 'color', bind: { width: '80' } },
            { type: 'audio', label: '喜欢音乐', prop: 'audio', bind: { width: '320' } },
            { label: '性别', prop: 'sex', render(h, props) { return props.row.sex ? '男' : '女' } },
            {              label: '家属',
              child: [
                { prop: 'mother', label: '母亲' },
                { prop: 'father', label: '父亲' }
              ]
            },
            {
              label: '操作',
              bind: { width: '200' },
              type: 'btns',
              btns(props) {
                let btns = [
                  {
                    label: '删除',
                    type: 'danger',
                    confirm: '你确认删除吗？',
                    call(props, handlerSearch) {
                      console.log(props)
                      handlerSearch()
                    }
                  },
                  {
                    label: '禁用 ',
                    bind: {
                      disabled: true
                    }
                  }
                ]
                if (props.row.status === 1) {
                  btns.push(
                    {
                      label: '隐藏',
                      call(props, handlerSearch) {
                        console.log(props)
                        handlerSearch()
                      }
                    })
                }
                return btns
              }
            },
          ]
        },
        operations: [
          {
            label: '删除',
            confirm: '你确定删除吗？',
            call(selection, search) {
              console.log(selection)
              search()
            },
            bind: {
              type: "danger",
              icon: "el-icon-delete"
            }
          },
          {
            label: '获取表单数据',
            call: () => {
              let tableFef = this.$refs.table
              // 获取表单数据
              console.log(tableFef.getData())
            }
          },
          {
            label: '主动触发search',
            call: () => {
              let tableFef = this.$refs.table
              tableFef.handlerSearch()
            }
          }
        ],
        pagination: {
          total: 'pages.allSize',
          currentPage: 1,
          pageSize: 10,
          bind: {
            layout: "sizes,total, prev, pager, next",
            pageSizes: [10, 20, 30, 40]
          }
        },
        search(filters, pagination) {
          console.log(filters, pagination)
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                list: [
                  {
                    id: Math.random(),
                    name: '张三',
                    age: parseInt(Math.random() * 80),
                    sex: 0,
                    mother: '吴**',
                    father: '张**',
                    birth: '2000-01-02',
                    color: 'red',
                    input: '输入值1',
                    select: 'zhangsan',
                    audio: 'http://m4a.inke.cn/sktv/ori/m4a_64/12/20/1000382_9605.m4a',
                    header: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg'
                  },
                  {
                    id: Math.random(),
                    name: '李四',
                    age: '21',
                    sex: 1,
                    mother: '吴**',
                    father: '张**',
                    color: '#cccccc',
                    input: '',
                    select: '',
                    zhangsan: '',
                    birth: new Date('1900-01-02'),
                    audio: 'http://m4a.inke.cn/sktv/ori/m4a_64/12/20/1000382_9605.m4a',
                    header: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg'
                  }
                ],
                pages: {
                  allSize: 110
                }
              })
            }, 1000)
          })
        }
      }
    }
  },
  created() {
  },
  methods: {
    getOptions() {
      return Promise.resolve({
        data: [
          {
            label: '张三',
            value: 'zhangsan'
          },
          {
            label: '李四',
            value: 'lisi'
          }
        ]
      }).then(d => d.data)
    },
    handlerDelete(e) {
      console.log(e)
      alert('删除')
    }
  }
}
</script>
<style lang="less">
.elpand-table-demo {
}
</style>
