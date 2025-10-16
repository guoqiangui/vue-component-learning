import type { ComputedRef } from 'vue'

export type Value = boolean | string | number

export type CheckboxGroupContext = {
  modelValue: ComputedRef
  updateModel: (val: Value[]) => void
}
