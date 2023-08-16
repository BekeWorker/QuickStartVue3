<template>
  <div>
    <el-dialog
      v-model="dialogData.visible"
      :title="dialogData.title"
      :width="dialogData.width"
      center
    >
      <slot name="content"></slot>
      <template #footer>
        <span class="dialog-footer">
          <slot name="footer"></slot>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'BaseDialog',
  components: {},
  setup() {
    const dialogData = ref({
      title: '',
      visible: false,
      width: 400
    })
    const changeDialogData = (title: string, visible: boolean, width: number = 400) => {
      Object.assign(dialogData.value, { title, visible, width })
    }

    return {
      dialogData,
      changeDialogData
    }
  }
})
</script>

<style lang="less" scoped></style>
