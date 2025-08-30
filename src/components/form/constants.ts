import type { InjectionKey } from 'vue'
import type { FormContext, FormItemContext } from './types'

export const formContextKey = Symbol() as InjectionKey<FormContext>

export const formItemContextKey = Symbol() as InjectionKey<FormItemContext>
