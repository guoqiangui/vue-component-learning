import type { RuleItem } from 'async-validator'

export interface FormItemRule extends RuleItem {
  trigger?: string
}

export type FormProps = {
  model: Record<string, unknown>
  rules?: Record<string, FormItemRule[]>
}

export type FormContext = FormProps & {
  addFormItem: (formItemContext: FormItemContext) => void
  removeFormItem: (formItemContext: FormItemContext) => void
}

export type FormItemContext = {
  validate: (trigger?: string) => Promise<true>
  resetField: () => void
}
