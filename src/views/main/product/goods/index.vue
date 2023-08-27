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

import useTableOptions from './config/table'

export default defineComponent({
  name: 'GoodsIndex',
  components: {
    BaseTable,
    BaseDialog,
    BaseForm
  },
  setup() {
    const initData = () => {
      const { pageNum, pageSize } = tableOptions.value
      console.log(pageNum, pageSize)
      // tableOptions.value.tableData = []
    }
    const tableOptions = useTableOptions({ initData })
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

    return {
      tableOptions,
      handleClick,
      dialogRef
    }
  }
})
</script>

<style lang="less" scoped></style>
