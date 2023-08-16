<template>
  <div class="goods-index-wrap base-page">
    <div class="page-header">物品管理</div>
    <div class="page-content">
      <div class="interact">
        <div></div>
        <el-button type="primary" @click="handleClick('新增', {})">新增</el-button>
      </div>
      <base-table :tableOptions="tableOptions">
        <template #operation="scope">
          <el-button text size="small" type="primary" @click="handleClick('编辑', scope.row)"
            >编辑</el-button
          >
          <el-button text size="small" type="primary" @click="handleClick('删除', scope.row)"
            >删除</el-button
          >
        </template>
      </base-table>
    </div>
    <base-dialog ref="dialogRef">
      <template #content>
        <base-form></base-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="handleClick('确定', {})">确定</el-button>
        <el-button @click="handleClick('取消', {})">取消</el-button>
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseTable from '@/components/base/table'
import BaseDialog from '@/components/base/dialog'
import BaseForm from '@/components/base/form'
export default defineComponent({
  name: 'GoodsIndex',
  components: {
    BaseTable,
    BaseDialog,
    BaseForm
  },
  setup() {
    const initData = () => {}
    const handleSizeChange = (val: number) => {
      tableOptions.value.pageNum = 1
      tableOptions.value.pageSize = val
      initData()
    }
    const handleCurrentChange = (val: number) => {
      tableOptions.value.pageNum = val
      initData()
    }

    const dialogRef = ref<any>(null)
    const currRow = ref({})
    const handleClick = (type: string, value: {}) => {
      switch (type) {
        case '删除':
          dialogRef.value.changeDialogData(type, true)
          break
        case '编辑':
          currRow.value = value
          dialogRef.value.changeDialogData(type, true)
          break

        default:
          break
      }
    }
    const tableOptions = ref({
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
      pageNum: 0,
      pageSize: 10,
      pageSizes: [10, 20, 30],
      handleSizeChange,
      handleCurrentChange,
      total: 0
    })
    return {
      tableOptions,
      handleClick,
      dialogRef
    }
  }
})
</script>

<style lang="less" scoped></style>
