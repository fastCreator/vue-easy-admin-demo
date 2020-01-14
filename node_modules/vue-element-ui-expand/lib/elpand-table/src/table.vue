<script>
import { timeFormat } from '../../utils/timer'
export default {
  props: {
    tableSort: {
      type: Function
    },
    handlerSearch: {
      type: Function
    },
    hideTableLabel: {
      type: Array,
      default() { return [] }
    },
    bind: {
      type: Object,
      required: true,
      default: () => ({ rowKey: 'id' })
    },
    on: {
      type: Object,
      default() { return {} }
    },
    columns: {
      type: Array,
      default() { return [] }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  render(h) {
    const { data, tableSort, bind, bind: { rowKey } } = this
    const { getColumns, handlerSelect } = this
    if (!rowKey) {
      console.error('bind.rowKey不能为空')
    }
    return h('el-table', {
      class: 'my-table',
      props: {
        ...bind,
        data
      },
      on: {
        select: handlerSelect,
        'select-all': handlerSelect
      },
      ref: 'table'
    }, [
        getColumns(h, this.columns),
        !!tableSort && <el-table-column
          width="60"
          label="">
          <el-button plain circle icon="el-icon-sort" class="sortableHanlder"></el-button>
        </el-table-column>
      ])
  },
  mounted() {
    this.setTableSort()
  },
  methods: {
    confirm(it, prop) {
      if (it.confirm) {
        this.$confirm(it.confirm, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          it.call(prop, this.handlerSearch)
        })
      } else {
        it.call(prop, this.handlerSearch)
      }
    },
    setTableSort() {
      const { tableSort } = this
      if (tableSort) {
        let disabled = false
        import('sortablejs').then(({ Sortable }) => {
          const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
          Sortable.create(el, {
            animation: 150,
            dragClass: "expand-sortable-drag",
            handle: ".sortableHanlder",
            filter() {
              return disabled
            },
            onEnd: (evt) => {
              disabled = true
              let oldRow = this.data.splice(evt.oldIndex, 1)
              this.data.splice(evt.newIndex, 0, oldRow[0])
              this.$emit('sort', evt, this.data, () => {
                disabled = false

              })
            }
          })
        })
      }
    },
    handlerSelect(selection) {
      this.$emit('select', selection)
    },
    getColumns(h, arr) {
      return arr.filter(it => !~this.hideTableLabel.indexOf(it.label)).map(it => {
        return h('el-table-column', {
          key: it.label,
          props: {
            align: this.getColumnsAlign(it),
            label: it.label,
            type: it.type,
            prop: it.prop,
            ...it.bind
          },
          on: it.on,
          scopedSlots: {
            default: this.getColumnsScopedSlots(h, it)
          }
        }, it.child && this.getColumns(h, it.child))
      })
    },
    getColumnsScopedSlots(h, it) {
      if (it.render) {
        return (props) => it.render(h, props)
      }
      if (it.type === 'time') {
        return (props) => timeFormat(props.row[it.prop], it.format)
      }
      if (it.type === 'image') {
        return (props) => <img class="table-img" src={props.row[it.prop]} />
      }
      if (it.type === 'color') {
        return (props) => <div class="table-color" style={{ backgroundColor: props.row[it.prop] }}></div>
      }
      if (it.type === 'audio') {
        return (props) => <audio class="table-audio" controls="controls" src={props.row[it.prop]}></audio>
      }
      if (it.type === 'btns') {
        return (props) => it.btns(props)
          .map((bt, i) => h('el-button', {
            props: {
              ...bt.bind,
              type: bt.type
            },
            on: {
              ...bt.on,
              click: () => {
                this.confirm(bt, props)
              }
            },
            key: i
          }, bt.label))
      }
      if (it.component) {
        let c = it.component
        return function (props) {
          return h(c.tag,
            {
              props: {
                ...c.bind,
                value: props.row[it.prop]
              },
              attrs: {
                ...c.bind,
                value: props.row[it.prop]
              },
              on: {
                ...c.on,
                input(v) {
                  props.row[it.prop] = v
                }              }
            },
            c.child)
        }
      }
    },
    getColumnsAlign(col) {
      if (['selection', 'image', 'color', 'audio'].find(it => it === col.type)) {
        return 'center'
      }
    }
  }
}
</script>
<style lang="less">
.elpand-table {
  .my-table {
    margin-top: 12px;
    .expand-sortable-drag {
      opacity: 0;
    }
    .table-img {
      max-width: 120px;
      max-height: 120px;
      min-width: 38px;
      min-height: 38px;
    }
    .table-color {
      display: inline-block;
      width: 60px;
      height: 28px;
    }
    .table-audio {
      width: 270px;
    }
  }
}
</style>