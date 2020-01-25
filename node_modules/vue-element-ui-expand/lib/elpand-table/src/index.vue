<template>
  <div class="elpand-table" v-loading="loading">
    <div class="filters">
      <div class="filters-item" v-for="it in filters" :key="it.prop">
        <div class="filters-label">{{it.label}}：</div>
        <div class="filters-value">
          <component 
            v-bind:is="it.tag" 
            v-bind="it.bind" 
            v-on="it.on" 
            clearable 
            :value="filtersValue[it.prop]" 
            @input="setFiltersValue($event,it.prop)">
          </component>
        </div>
      </div>
      <div class="btns">
        <el-button type="primary" @click="handlerSearch">搜索</el-button>
        <el-button type="warning" @click="clearFilters">重置</el-button>
        <el-dropdown v-if="tableFilter" trigger="click" :hide-on-click="false">
          <el-button type="plain" icon="el-icon-menu"></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-checkbox-group v-model="tableFilterSelected" :min="1">
                <div v-for="it in tableFilterList" :key="it">
                  <el-checkbox :label="it"></el-checkbox>
                </div>
              </el-checkbox-group>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="operations">
      <el-dropdown trigger="click" v-if="tableExport">
        <el-button class="exportExcel" type="primary" icon="el-icon-download">导出</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="it in tableExport.bookTypes" :key="it" @click.native="exportExcel(it)">{{it}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-for="(it,i) in operations" :key="i" v-bind="it.bind" v-on="it.on" @click="operationHandler(it)">
        {{it.label}}
      </el-button>
    </div>
    <my-table
      v-bind="table"
      @select="handlerSelection"
      @sort="handlerSort"
      :handlerSearch="handlerSearch"
      :createElement="createElement"
      :data="tableData"
      :hideTableLabel="hideTableLabel"
      :tableSort="tableSort">
    </my-table>
    <div
      class="pagination"
      v-if="pagination">
      <el-pagination
        v-bind="pagination.bind"
        v-on="pagination.on"
        :pageSize.sync="pageSize"
        :currentPage.sync="currentPage"
        :total="total"
        @size-change="handerSizeChange"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import MyTable from './table'
export default {
  name: 'elpand-table',
  components: {
    MyTable
  },
  props: {
    createElement: {
      type: Function
    },
    tableSort: {
      type: Function
    },
    tableExport: {
      type: Object
    },
    tableFilter: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Array,
      default() { return [] }
    },
    operations: {
      type: Array,
      default() { return [] }
    },
    table: {
      type: Object,
      require: true
    },
    pagination: {
      type: Object
    },
    search: {
      type: Function,
      require: true
    }
  },
  data() {
    return {
      filtersValue: this.initFiltersValue(),
      tableData: [],
      total: 0,
      currentPage: this.pagination ? this.pagination.currentPage : 1,
      pageSize: this.pagination ? this.pagination.pageSize : 10,
      selection: [],//table选中row
      tableFilterSelected: [],//table显示列
      loading: false
    }
  },
  created() {
    this.handlerSearch()
  },
  computed: {
    tableFilterList() {
      return this.table.columns.filter(it => it.label).map(it => it.label)
    },
    hideTableLabel() {
      return this.tableFilterList.filter(it => !~this.tableFilterSelected.indexOf(it))
    },
    hasCheckbox() {
      return this.table.columns.find(it => it.type && it.type === 'selection')
    }
  },
  watch: {
    tableFilterList: {
      handler(v) {
        this.tableFilterSelected = v
      },
      immediate: true
    }
  },
  methods: {
    getData() {
      return this.tableData
    },
    handlerSort(...args) {
      this.tableSort(...args)
    },
    exportExcel(bookType) {
      import('./Export2Excel').then(excel => {
        excel.export_json_to_excel({
          ...this.getExportExcelData(),
          filename: this.tableExport.filename,
          autoWidth: this.tableExport.autoWidth,
          bookType: bookType
        })
      })
    },
    getExportExcelData() {
      let columns = this.table.columns
      let header = []
      let props = []
      let tableExportFuc = this.tableExport.filter
      this.tableFilterSelected.forEach(st => {
        let ct = columns.find(col => col.label === st)
        this.getChildProp(ct, header, props)
      })
      return {
        data: (this.hasCheckbox ? this.selection : this.tableData).map(row => props.map(prop => {
          if (tableExportFuc) {
            return tableExportFuc(row, prop)
          } else {
            return row[prop]
          }
        })),
        header
      }
    },
    getChildProp(ct, header, props) {
      if (ct.child) {
        ct.child.forEach(cct => {
          this.getChildProp(cct, header, props)
        })
      } else {
        header.push(ct.label)
        props.push(ct.prop)
      }
    },
    handerSizeChange(v) {
      this.pageSize = v
      this.changePage()
    },
    handlerSelection(selection) {
      this.selection = selection
    },
    operationHandler(opt) {
      if (opt.confirm) {
        this.$confirm(opt.confirm, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.operationCall(opt)
        })
      } else {
        this.operationCall(opt)
      }

    },
    operationCall(opt) {
      if (opt.call) {
        opt.call(this.selection, this.handlerSearch)
      }
    },
    setFiltersValue(v, prop) {
      this.$set(this.filtersValue, prop, v)
    },
    initFiltersValue() {
      let values = {}
      this.filters.forEach(it => {
        values[it.prop] = it.default || null
      })
      return values
    },
    clearFilters() {
      this.filtersValue = this.initFiltersValue()
      this.currentPage = this.pagination ? this.pagination.currentPage : 1
      this.pageSize = this.pagination ? this.pagination.pageSize : 10
      this.handlerSearch()
    },
    clearSearch() {
      this.clearFilters()
      this.handlerSearch()
    },
    async handlerSearch() {
      this.loading = true
      let d = await this.search(this.filtersValue, {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.loading = false
      this.tableData = d[this.table.data]
      if (this.pagination) {
        this.total = d
        this.pagination.total.split('.').forEach(key => {
          this.total = this.total[key]
        })
      }
    },
    changePage() {
      this.handlerSearch()
    }
  }
}
</script>
<style lang="less">
.elpand-table {
  .filters {
    display: flex;
    .filters-item {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
    .btns {
      margin-left: 12px;
      .el-dropdown {
        margin-left: 12px;
      }
    }
  }
  .operations {
    margin-top: 12px;
    .el-dropdown {
      margin-right: 12px;
    }
  }
  .my-table {
  }
  .pagination {
    margin-top: 12px;
  }
}
</style>
