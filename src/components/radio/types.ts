import type { ComputedRef } from 'vue'
import type { Value } from '../checkbox/types'

export type RadioGroupContext = {
  modelValue: ComputedRef
  updateModel: (val: Value) => void
}
