<script setup lang="ts">
import { inject } from 'vue'
import { formItemContextKey } from './form/constants'

defineProps<{ modelValue: string }>()

const formItemContext = inject(formItemContextKey)

const emit = defineEmits(['update:modelValue'])

function handleInput(e: Event) {
  const { value } = e.target as HTMLInputElement
  emit('update:modelValue', value)
  formItemContext?.validate('change')
}

function handleBlur() {
  formItemContext?.validate('blur')
}
</script>

<template>
  <input type="text" :value="modelValue" @input="handleInput" @blur="handleBlur" />
</template>
