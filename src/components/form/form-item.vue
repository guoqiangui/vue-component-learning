<script setup lang="ts">
import Schema, { type ValidateError, type ValidateFieldsError } from 'async-validator'
import { computed, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { formContextKey, formItemContextKey } from './constants'
import type { FormItemContext } from './types'

const props = defineProps<{ label: string; prop: string }>()

const formContext = inject(formContextKey)

const validateMessage = ref('')
const validateState = ref<'validating' | 'success' | 'error' | ''>('')

function getFilteredRules(trigger?: string) {
  const rules = formContext?.rules?.[props.prop] || []
  return rules.filter((rule) => !rule.trigger || !trigger || rule.trigger === trigger)
}

const validate: FormItemContext['validate'] = async (trigger) => {
  validateState.value = 'validating'

  const filteredRules = getFilteredRules(trigger)
  filteredRules.forEach((r) => delete r.trigger)
  if (!filteredRules.length) return true

  const descriptor = { [props.prop]: filteredRules }
  const validator = new Schema(descriptor)

  const value = formContext?.model[props.prop]
  return validator
    .validate({ [props.prop]: value })
    .then(() => {
      validateState.value = 'success'
      return true as const
    })
    .catch(({ errors, fields }: { errors: ValidateError[]; fields: ValidateFieldsError }) => {
      validateState.value = 'error'
      validateMessage.value = errors[0].message || ''
      return Promise.reject(fields)
    })
}

const resetField: FormItemContext['resetField'] = () => {
  validateMessage.value = ''
  validateState.value = ''

  if (formContext) {
    formContext.model[props.prop] = initialValue.value
  }
}

const formItemContext = { validate, resetField }
formContext?.addFormItem(formItemContext)

provide(formItemContextKey, formItemContext)

const initialValue = ref()

const isRequired = computed(() => {
  const rules = getFilteredRules()
  return rules.some((rule) => rule.required)
})

onMounted(() => {
  initialValue.value = formContext?.model[props.prop]
})

onBeforeUnmount(() => {
  formContext?.removeFormItem(formItemContext)
})

defineExpose({ resetField })
</script>

<template>
  <div>
    <label>
      <span v-if="isRequired" style="color: red">*</span>
      <span>{{ props.label }}</span>
      <slot></slot>
    </label>
    <div v-if="validateState === 'error'" style="color: red">{{ validateMessage }}</div>
  </div>
</template>
