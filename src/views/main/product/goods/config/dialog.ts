import { ref, reactive } from 'vue'
import type { FormRules } from 'element-plus'

interface RuleForm {
  brand: string
  country: number
  desc: string
}

const useFormOptions = (params: any) => {
  const formOptions = ref<any>(null)
  formOptions.value = {
    formData: reactive<RuleForm>({
      brand: '',
      country: 0,
      desc: ''
    }),
    rules: reactive<FormRules<RuleForm>>({
      brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
      country: [{ required: true, message: '请选择国家', trigger: 'change' }],
      desc: [{ required: true, message: '请输入描述', trigger: 'blur' }]
    }),
    formItems: [
      {
        label: '品牌',
        type: 'input',
        field: 'brand',
        prop: 'brand',
        placeHolder: '请输入品牌'
      },
      {
        label: '国家',
        type: 'select',
        placeHolder: '请选择国家',
        field: 'country',
        otherOptions: {
          options: []
        }
      },
      {
        label: '描述',
        type: 'textarea',
        field: 'desc',
        placeHolder: '请输入描述',
        slotName: 'desc'
      }
    ],
    labelPosition: 'right',
    labelWidth: 60,
    size: 'default',
    formStyle: {},
    formItemStyle: {
      margin: '10px 30px'
    }
  }
  return formOptions
}

export default useFormOptions
