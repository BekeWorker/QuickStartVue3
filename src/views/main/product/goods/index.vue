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
          <base-form ref="formRef" :formOptions="formOptions">
            <!-- slot示例 -->
            <template #desc="{ row }">
              <el-form-item v-bind="row">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  v-model="formOptions.ruleForm[row.field]"
                  :placeholder="row.placeHolder"
                >
                </el-input>
              </el-form-item>
            </template>
          </base-form>
        </div>
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
    const formRef = ref<any>(null)
    const handleClick = (type: string, value: {}) => {
      switch (type) {
        case '删除':
        case '编辑':
        case '新增':
          currRow.value = value
          formOptions.value.ruleForm = value
          dialogRef.value.changeDialogData(type, true)
          break
        case '确定':
          // formRef.value.submitForm()
          // console.log(formRef.value)
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
      formRef,
      currRow
    }
  }
})
</script>

<style lang="less" scoped></style>
