<template>
  <div class="form-wrap">
    <el-form :model="ruleForm" :rules="rules" :label-width="labelWidth" :size="size">
      <template v-for="item in formItems" :key="item.label">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="item"></slot>
        </template>
        <el-form-item v-else v-bind="item">
          <template v-if="item.type === 'input'">
            <el-input v-model="ruleForm[item.field]" :placeholder="item.placeHolder"></el-input>
          </template>
          <template v-if="item.type === 'select'">
            <el-select
              v-model="ruleForm[item.field]"
              :placeholder="item.placeHolder"
              style="width: 100%"
            >
              <template v-for="{ value, label } in item.otherOptions.options" :key="value">
                <el-option :label="label" :value="value"></el-option>
              </template>
            </el-select>
          </template>
          <template v-if="item.type === 'textarea'">
            <el-input v-model="ruleForm[item.field]" :placeholder="item.placeHolder"></el-input>
          </template>
        </el-form-item>
      </template>
    </el-form>
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
  setup(props) {
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, field) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', field)
        }
      })
    }
    return {
      ...props.formOptions
    }
  }
})
</script>

<style lang="less" scoped>
.form-wrap {
}
</style>
