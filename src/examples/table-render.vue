<script setup lang="ts">
import Table from '@/components/table-render/table-render.vue'
import type { TableRenderFunction, TableRenderProps } from '@/components/table-render/types'
import { h, ref } from 'vue'

const buttonClass = 'bg-slate-400 text-white px-2 py-1 rounded-md border-none cursor-pointer mr-2'

const editRender: TableRenderFunction = ({ row, col, index }) => {
  if (editRowIndex.value === index) {
    editRow.value[col.key] ??= row[col.key]

    return h('input', {
      value: editRow.value[col.key],
      onInput: (e) => {
        editRow.value[col.key] = (e.target as HTMLInputElement).value
      },
    })
  }

  return col.key === 'birth' ? formatBirth(row[col.key] as number) : (row[col.key] as number)
}

const formatBirth = (birth: number | string) => {
  const date = new Date(+birth)
  return date.toLocaleDateString()
}

const resetEditRow = () => {
  editRowIndex.value = -1
  editRow.value = {}
}

const columns = [
  {
    title: '姓名',
    key: 'name',
    render: editRender,
  },
  {
    title: '年龄',
    key: 'age',
    render: editRender,
  },
  {
    title: '出生日期',
    key: 'birth',
    render: editRender,
  },
  {
    title: '操作',
    key: 'action',
    render: ({ index }: TableRenderProps) => {
      if (editRowIndex.value === index) {
        return [
          h(
            'button',
            {
              class: buttonClass,
              onClick: () => {
                Object.assign(data.value[index], editRow.value)
                resetEditRow()
              },
            },
            '保存',
          ),
          h(
            'button',
            {
              class: buttonClass,
              onClick: resetEditRow,
            },
            '取消',
          ),
        ]
      }

      return h(
        'button',
        {
          class: buttonClass,
          onClick: () => (editRowIndex.value = index),
        },
        '修改',
      )
    },
  },
]

const data = ref([
  { id: 1, name: '张三', age: 18, birth: 1672531200000 },
  { id: 2, name: '李四', age: 19, birth: 1672531200000 },
])

const editRowIndex = ref(-1)

const editRow = ref<Record<string, unknown>>({})
</script>

<template>
  <Table :columns="columns" :data="data" />
</template>
