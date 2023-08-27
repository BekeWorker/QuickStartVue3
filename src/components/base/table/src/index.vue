<template>
  <div class="base-table-wrap">
    <el-table :data="tableData" show-overflow-tooltip border>
      <template v-for="column in tableColumn" :key="column.label">
        <el-table-column v-bind="column" align="center">
          <template #default="scope">
            <slot :name="column.slotName" :row="scope.row">
              {{ column.type === 'index' ? scope.$index : scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pagination-wrap" v-if="showPagination">
      <el-pagination
        small
        background
        :total="total"
        :page-sizes="pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, sizes"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'BaseTable',
  props: {
    tableOptions: {
      type: Object,
      required: true
    }
  },
  components: {},
  setup(props) {
    return {
      ...props.tableOptions
    }
  }
})
</script>

<style lang="less" scoped>
.base-table-wrap {
  .pagination-wrap {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
  }
}
</style>
