<script setup lang="ts">
import Form from '@/components/form/form.vue'
import Input from '@/components/input.vue'
import { ref, useTemplateRef } from 'vue'
import FormItem from './components/form/form-item.vue'
import type { FormItemRule } from './components/form/types'
import type { ValidateFieldsError } from 'async-validator'

const formModel = ref<{ name: string; email: string }>({ name: '', email: '' })

const rules: Record<string, FormItemRule[]> = {
  name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
}

const nameRef = useTemplateRef('nameRef')
const formRef = useTemplateRef('formRef')

async function validate() {
  try {
    await formRef.value?.validate()
  } catch (err) {
    const errors = err as ValidateFieldsError
    alert(Object.values(errors)[0][0].message)
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

    <button type="button" @click="validate">校验</button>
    <button type="button" @click="formRef?.resetFields">重置所有</button>
  </Form>
</template>

<style scoped></style>
