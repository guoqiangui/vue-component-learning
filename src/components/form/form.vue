<script setup lang="ts">
import { provide, reactive, ref, toRefs } from 'vue'
import { formContextKey } from './constants'
import type { FormContext, FormItemContext, FormProps } from './types'
import type { ValidateFieldsError } from 'async-validator'

const props = defineProps<FormProps>()

// 储存formItem
const fields = ref<FormItemContext[]>([])

const addFormItem: FormContext['addFormItem'] = (formItemContext) => {
  fields.value.push(formItemContext)
}

const removeFormItem: FormContext['removeFormItem'] = (formItemContext) => {
  fields.value.splice(
    fields.value.findIndex((item) => item === formItemContext),
    1,
  )
}

provide(formContextKey, reactive({ ...toRefs(props), addFormItem, removeFormItem }))

async function validate() {
  let errors: ValidateFieldsError = {}

  for (let i = 0; i < fields.value.length; i++) {
    const field = fields.value[i]
    try {
      await field.validate()
    } catch (err) {
      errors = { ...errors, ...(err as ValidateFieldsError) }
    }
  }

  return Object.keys(errors).length ? Promise.reject(errors) : true
}

function resetFields() {
  fields.value.forEach((field) => {
    field.resetField()
  })
}

defineExpose({ validate, resetFields })
</script>

<template>
  <form>
    <slot></slot>
  </form>
</template>
