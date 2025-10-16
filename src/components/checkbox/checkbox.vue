<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue'
import { checkboxGroupContextKey } from './constants'
import type { Value } from './types'
import { formItemContextKey } from '../form/constants'

type ModelValue = Value | Value[] | undefined

const {
  modelValue,
  trueValue = true,
  falseValue = false,
  disabled = false,
  label,
} = defineProps<{
  modelValue?: ModelValue
  trueValue?: Value
  falseValue?: Value
  disabled?: boolean
  label?: Value
}>()

const currentValue = ref(false)

const emit = defineEmits(['update:modelValue'])

const formItemContext = inject(formItemContextKey)

const handleChange = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked
  const value = checked ? trueValue : falseValue
  emit('update:modelValue', value)

  if (!group) {
    formItemContext?.validate('change')
  }
}

watchEffect(() => {
  currentValue.value = modelValue === trueValue
})

const checkboxGroupContext = inject(checkboxGroupContextKey, undefined)
const group = !!checkboxGroupContext

const currentModel = computed({
  get() {
    return checkboxGroupContext?.modelValue.value
  },
  set(val) {
    checkboxGroupContext?.updateModel(val)
  },
})
</script>

<template>
  <label>
    <input
      v-if="group"
      type="checkbox"
      :disabled="disabled"
      v-model="currentModel"
      :value="label"
      @change="handleChange"
    />
    <input
      v-else
      type="checkbox"
      :checked="currentValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <slot></slot>
  </label>
</template>
