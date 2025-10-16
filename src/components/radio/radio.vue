<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Value } from '../checkbox/types'
import { radioGroupContextKey } from './constants'
import { formItemContextKey } from '../form/constants'

const { modelValue } = defineProps<{ modelValue?: Value; value: Value }>()

const emit = defineEmits(['update:modelValue'])

const formItemContext = inject(formItemContextKey, undefined)

const currentValue = computed({
  get() {
    return modelValue
  },
  set(val) {
    emit('update:modelValue', val)

    formItemContext?.validate('change')
  },
})

const radioGroupContext = inject(radioGroupContextKey, undefined)

const group = !!radioGroupContext

const currentModel = computed({
  get() {
    return radioGroupContext?.modelValue.value
  },
  set(val) {
    radioGroupContext?.updateModel(val)
  },
})
</script>

<template>
  <label>
    <input v-if="group" type="radio" :value="value" v-model="currentModel" />
    <input v-else type="radio" :value="value" v-model="currentValue" />
    <slot></slot>
  </label>
</template>
