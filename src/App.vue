<script setup lang="ts">
import Form from '@/components/form/form.vue'
import Input from '@/components/input.vue'
import type { ValidateFieldsError } from 'async-validator'
import { ref, useTemplateRef } from 'vue'
import CheckboxGroup from './components/checkbox/checkbox-group.vue'
import Checkbox from './components/checkbox/checkbox.vue'
import FormItem from './components/form/form-item.vue'
import type { FormItemRule } from './components/form/types'
import RadioGroup from './components/radio/radio-group.vue'
import Radio from './components/radio/radio.vue'

interface FormModel {
  name: string
  email: string
  isAgree: number | undefined
  multiple: number[]
  radio1: boolean | undefined
  radio2: number | undefined
}

const formModel = ref<FormModel>({
  name: '',
  email: '',
  isAgree: undefined,
  multiple: [],
  radio1: undefined,
  radio2: undefined,
})

const rules: Record<string, FormItemRule[]> = {
  name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  isAgree: [
    {
      message: '请勾选',
      trigger: 'change',
      // 自定义的true和false值需要使用validator
      validator: (rule, value, callback) => {
        if (value === 1) {
          callback()
        } else {
          callback(new Error('请勾选'))
        }
      },
    },
  ],
  multiple: [{ required: true, message: '请勾选', trigger: 'change' }],
  radio1: [{ required: true, message: '请勾选', trigger: 'change' }],
  radio2: [{ required: true, message: '请勾选', trigger: 'change' }],
}

const nameRef = useTemplateRef('nameRef')
const formRef = useTemplateRef('formRef')

async function validate() {
  try {
    await formRef.value?.validate()
  } catch (err) {
    const errors = err as ValidateFieldsError
    const errorMessage = Object.values(errors)[0][0].message
    alert(`验证失败: ${errorMessage}`)
  }
}
</script>

<template>
  <Form ref="formRef" :model="formModel" :rules="rules">
    <FormItem ref="nameRef" label="用户名" prop="name">
      <Input v-model="formModel.name"></Input>
      <button type="button" @click="nameRef?.resetField">重置</button>
    </FormItem>
    <FormItem label="邮箱" prop="email">
      <Input v-model="formModel.email"></Input>
    </FormItem>
    <FormItem label="是否同意条款" prop="isAgree">
      <Checkbox v-model="formModel.isAgree" :true-value="1" :false-value="0">同意</Checkbox>
    </FormItem>
    <FormItem label="多选示例" prop="multiple">
      <CheckboxGroup v-model="formModel.multiple">
        <Checkbox :label="1">选项一</Checkbox>
        <Checkbox :label="2">选项二</Checkbox>
        <Checkbox :label="3">选项三</Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="单选示例1" prop="radio1">
      <Radio v-model="formModel.radio1" :value="true">选项一</Radio>
      <Radio v-model="formModel.radio1" :value="false">选项二</Radio>
    </FormItem>
    <FormItem label="单选示例2" prop="radio2">
      <RadioGroup v-model="formModel.radio2">
        <Radio :value="1">选项一</Radio>
        <Radio :value="2">选项二</Radio>
      </RadioGroup>
    </FormItem>

    <button type="button" @click="validate">校验</button>
    <button type="button" @click="formRef?.resetFields">重置所有</button>
  </Form>
</template>

<style scoped></style>
