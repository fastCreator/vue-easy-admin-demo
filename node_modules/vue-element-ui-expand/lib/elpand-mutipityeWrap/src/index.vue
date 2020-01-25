<script>
import emitter from '../../utils/emitter';
import { deepClone } from '../../utils/commom';
export default {
  mixins: [emitter],
  name: 'elpand-mutipityeWrap',
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    createElement: {
      type: Function
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    addValue: {
      default: ''
    },
    props: {
      type: Object,
      default: () => ({ key: '', value: '' })
    },
    value: {
      type: Array,
      default: () => ([])
    },
    tag: {
      type: String,
      required: true
    },
    bind: {
      type: Object,
      default: () => ({})
    },
    on: {
      type: Object,
      default: () => ({})
    },
    row: {
      default: () => ({ left: 18, right: 6 })
    }
  },
  methods: {
    getValue(it) {
      const { value } = this.props
      return value ? it[value] : it
    },
    input(it, i) {
      return (v) => {
        const { value } = this.props
        if (value) {
          it[value] = v
        } else {
          this.value[i] = v
        }
        this.updateValue()
        this.$forceUpdate()
      }
    },
    Delete(i) {
      this.value.splice(i, 1)
      this.updateValue()
    },
    Add() {
      this.value.push(deepClone(this.addValue))
      this.updateValue()
    },
    updateValue() {
      this.$emit('input', this.value)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      }
    }
  },
  created() {
  },
  render(h) {
    const { value, tag, bind, on, createElement, row, min, max } = this
    const { getValue, input, Delete, Add } = this
    if (createElement) {
      h = createElement
    }
    return <div class="elpand-mutipityeWrap">
      {
        value.map((it, i) =>
          <el-row key={i}>
            <el-col span={row.left}>
              {
                h(tag, {
                  props: {
                    ...bind,
                    index: i,
                    value: getValue(it)
                  },
                  attrs: {
                    ...bind,
                    value: getValue(it)
                  },
                  on: {
                    ...on,
                    input: input(it, i)
                  }
                })
              }
            </el-col>
            <el-col span={row.right}>
              {
                value.length > min && <i
                  class="el-icon-remove-outline"
                  on-click={() => { Delete(i) }}
                >
                </i>
              }
            </el-col>
          </el-row>
        )
      }
      {
        value.length < max &&
        <el-row class="add-icon">
          <el-col span={row.right} offset={row.left}>
            <i
              class="el-icon-circle-plus-outline"
              on-click={Add}
            ></i>
          </el-col>
        </el-row>
      }
    </div>
  }
}
</script>

<style lang="less">
.elpand-mutipityeWrap {
  .el-icon-circle-plus-outline,
  .el-icon-remove-outline {
    font-size: 30px;
    cursor: pointer;
    vertical-align: middle;
  }
  .el-icon-remove-outline {
    color: #dd6161;
  }
  .el-row {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }
}
</style>