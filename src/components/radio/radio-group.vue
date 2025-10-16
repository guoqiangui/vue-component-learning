<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import type { Value } from '../checkbox/types'
import { radioGroupContextKey } from './constants'
import type { RadioGroupContext } from './types'
import { formItemContextKey } from '../form/constants'

const { modelValue } = defineProps<{ modelValue: Value | undefined }>()

const emit = defineEmits(['update:modelValue'])

const formItemContext = inject(formItemContextKey, undefined)

const updateModel: RadioGroupContext['updateModel'] = (val) => {
  emit('update:modelValue', val)

  formItemContext?.validate('change')
}

const currentModel = computed(() => modelValue)

provide(radioGroupContextKey, { modelValue: currentModel, updateModel })
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
