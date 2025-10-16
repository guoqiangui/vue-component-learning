<script setup lang="ts">
import { computed, provide, inject } from 'vue'
import { checkboxGroupContextKey } from './constants'
import type { CheckboxGroupContext, Value } from './types'
import { formItemContextKey } from '../form/constants'

const { modelValue } = defineProps<{ modelValue: Value[] }>()

const emit = defineEmits(['update:modelValue'])

const formItemContext = inject(formItemContextKey)

const updateModel: CheckboxGroupContext['updateModel'] = (val) => {
  emit('update:modelValue', val)

  formItemContext?.validate('change')
}

const currentValue = computed(() => modelValue)

provide(checkboxGroupContextKey, { modelValue: currentValue, updateModel })
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
