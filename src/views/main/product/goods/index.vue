<template>
  <div class="goods-index-wrap base-page">
    <div class="page-header">物品管理</div>
    <div class="page-content">
      <div class="interact">
        <div></div>
        <el-button type="primary" @click="handleClick('新增', { brand: '', country: 0, desc: '' })"
          >新增</el-button
        >
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
        <div v-if="dialogRef.dialogData.title === '删除'">确认删除{{ currRow.brand }}吗？</div>
        <div v-else>
          <base-form :formOptions="formOptions" @handleClick="handleClick">
            <!-- slot示例 -->
            <template #desc="{ row }">
              <el-form-item v-bind="row">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  v-model="formOptions.formData[row.field]"
                  :placeholder="row.placeHolder"
                >
                </el-input>
              </el-form-item>
            </template>
          </base-form>
        </div>
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
import useFormOptions from './config/dialog'

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
    const formOptions = useFormOptions({})

    const currRow = ref({})
    const dialogRef = ref<any>(null)
    const handleClick = (type: string, value: object = {}) => {
      switch (type) {
        case '删除':
        case '编辑':
        case '新增':
          currRow.value = value
          formOptions.value.formData = value
          dialogRef.value.changeDialogData(type, true)
          break
        case '确定':
          console.log({ value })
          dialogRef.value.changeDialogData('关闭', false)
          break
        default:
          currRow.value = {}
          dialogRef.value.changeDialogData('关闭', false)
          break
      }
    }

    return {
      tableOptions,
      formOptions,
      handleClick,
      dialogRef,
      currRow
    }
  }
})
</script>

<style lang="less" scoped></style>
