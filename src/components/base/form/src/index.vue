<template>
  <div class="form-wrap">
    <el-form
      ref="ruleFormRef"
      :size="size"
      :rules="rules"
      :model="formData"
      :label-width="labelWidth"
    >
      <template v-for="item in formItems" :key="item.label">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="item"></slot>
        </template>
        <el-form-item v-else v-bind="item">
          <template v-if="item.type === 'input'">
            <el-input v-model="formData[item.field]" :placeholder="item.placeHolder"></el-input>
          </template>
          <template v-if="item.type === 'select'">
            <el-select
              v-model="formData[item.field]"
              :placeholder="item.placeHolder"
              style="width: 100%"
            >
              <template v-for="{ value, label } in item.otherOptions.options" :key="value">
                <el-option :label="label" :value="value"></el-option>
              </template>
            </el-select>
          </template>
          <!-- <template v-if="item.type === 'textarea'">
            <el-input v-model="formData[item.field]" :placeholder="item.placeHolder"></el-input>
          </template> -->
        </el-form-item>
      </template>
    </el-form>
    <div>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
      <el-button @click="cancelForm()">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { FormInstance } from 'element-plus'
export default defineComponent({
  name: 'BaseForm',
  components: {},
  props: {
    formOptions: {
      type: Object,
      required: true
    }
  },
  emits: ['handleClick'],
  setup(props, { emit }) {
    const ruleFormRef = ref<FormInstance>()

    const size = ref(props.formOptions.size)
    const rules = ref(props.formOptions.rules)
    const formData = ref(props.formOptions.formData)
    const formItems = ref(props.formOptions.formItems)
    const labelWidth = ref(props.formOptions.labelWidth)

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid) => {
        if (valid) emit('handleClick', '确定', formData.value)
      })
    }
    const cancelForm = () => {
      emit('handleClick', '取消')
    }
    return {
      size,
      rules,
      formData,
      formItems,
      labelWidth,
      cancelForm,
      submitForm,
      ruleFormRef
    }
  }
})
</script>

<style lang="less" scoped>
.form-wrap {
}
</style>
