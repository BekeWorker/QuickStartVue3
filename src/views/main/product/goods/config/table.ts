import { ref } from 'vue'
const useTableOptions = (params: any) => {
  const { initData } = params
  const handleSizeChange = (val: number) => {
    tableOptions.value.pageNum = 1
    tableOptions.value.pageSize = val
    initData()
  }
  const handleCurrentChange = (val: number) => {
    tableOptions.value.pageNum = val
    initData()
  }
  const tableOptions = ref<any>(null)
  tableOptions.value = {
    tableData: [
      {
        id: 1,
        name: 'APPLE'
      },
      {
        id: 2,
        name: 'XIAOMI'
      },
      {
        id: 3,
        name: 'HUAWEI'
      }
    ],
    tableColumn: [
      {
        type: 'index',
        label: '序号',
        width: '100'
      },
      {
        prop: 'id',
        label: 'ID',
        minWidth: '50'
      },
      {
        prop: 'name',
        label: '品牌',
        minWidth: '200'
      },
      {
        prop: 'operation',
        label: '操作',
        width: '140',
        fixed: 'right',
        slotName: 'operation'
      }
    ],
    showIndex: true,
    showPagination: true,
    pageNum: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30],
    handleSizeChange,
    handleCurrentChange,
    total: 100
  }
  return tableOptions
}

export default useTableOptions
