<script>
import { debounce, merge } from '../../utils/commom';
import emitter from '../../utils/emitter';
export default {
  name: 'elpand-mostSelect',
  mixins: [emitter],
  props: {
    createElement: {

    },
    showPagination: {
      default: true,
      type: Boolean
    },
    component: {
      default() {
        return {
          tag: 'el-input',
          bind: {}
        }
      }
    },
    searchProps: {
      type: Object,
      required: true
    },
    search: {
      type: Function,
      required: true
    },
    optionsProps: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          pageSize: 20
        }
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      searchText: '',
      options: [],
      currentPage: this.pagination.currentPage,
      pageSize: this.pagination.pageSize,
      total: 0
    }
  },
  mounted() {
    this.handlerSearch()
  },
  watch: {
    'component.tag'() {
      this.init()
    }
  },
  render(h) {
    h = this.createElement || h
    return <div class="elpand-mostSelect">
      <div>
        {
          h(this.component.tag,
            merge(
              {
                props: { value: this.searchText },
                attrs: { value: this.searchText },
                on: { input: this.changeSearchText }
              },
              this.component.bind
            )
          )
        }
      </div>
      <div class="select-all-wrap">
        <el-checkbox
          indeterminate={this.isIndeterminate}
          value={this.ischeckAll}
          on-input={this.checkAll}>
          全选
      </el-checkbox>
      </div>
      <div>
        <el-checkbox-group
          value={this.value}
          on-input={this.input}
        >
          {this.options.map(it =>
            <el-checkbox
              border={true}
              key={it[this.optionsProps.value]}
              label={it[this.optionsProps.value]}
            >
              {it[this.optionsProps.label]}
            </el-checkbox>)}
        </el-checkbox-group>
        {
          this.showPagination &&
          <el-pagination
            {...this.pagination}
            pageSize={this.pageSize}
            currentPage={this.currentPage}
            total={this.total}
            on-size-change={this.handlerSizeChange}
            on-current-change={this.handlerSearch}
            on-prev-click={this.handlerSearch}
            on-next-click={this.handlerSearch}/>
        }
      </div>
    </div>
  },
  methods: {
    init() {
      this.searchText = ''
      this.options = []
      this.currentPage = this.pagination.currentPage
      this.pageSize = this.pagination.pageSize
      this.total = 0
      this.input([])
    },
    handlerSizeChange(v) {
      this.pageSize = v
      debounce(this.handlerSearch, 200)
    },
    checkAll(v) {
      let checkList = this.value
      this.options.forEach(it => {
        let value = it[this.optionsProps.value]
        if (v) {
          checkList.push(value)
        } else {
          let index = checkList.indexOf(value)
          checkList.splice(index, 1)
        }
      })
      this.input(checkList)
    },
    input(v) {
      this.$emit('input', v)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [v]);
      }
    },
    changeSearchText(v) {
      this.searchText = v
      if (this.t) {
        clearTimeout(this.t)
      }
      this.t = setTimeout(() => {
        this.handlerSearch()
      }, 200)
    },
    handlerSearch() {
      this.search(this.searchText, {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(d => {
        if (d && d[this.searchProps.list]) {
          this.options = d[this.searchProps.list]
          let path = this.searchProps.total.split('.')
          this.total = d
          path.forEach(it => {
            this.total = this.total[it]
          })
        }
      })
    }
  },
  computed: {
    ischeckAll() {
      let ischeckAll = true
      for (let i = 0; i < this.options.length; i++) {
        if (!~this.value.indexOf(this.options[i][this.optionsProps.value])) {
          ischeckAll = false
          break
        }
      }
      return ischeckAll
    },
    isIndeterminate() {
      let hasTrue, hasFalse
      for (let i = 0; i < this.options.length; i++) {
        if (~this.value.indexOf(this.options[i][this.optionsProps.value])) {
          hasTrue = true
        } else {
          hasFalse = true
        }
        if (hasTrue && hasFalse) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style lang="less">
.elpand-mostSelect {
  .select-all-wrap {
    margin-top: 6px;
  }
  .el-checkbox-group {
    padding-left: 14px;
    .el-checkbox {
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 8px;
    }
    margin-bottom: 10px;
  }
}
</style>