<script setup lang="ts">
import Table from '@/components/table-render/table-render.vue'
import type { TableRenderProps } from '@/components/table-render/types'
import { ref, useTemplateRef, watch } from 'vue'

const buttonClass = 'bg-slate-400 text-white px-2 py-1 rounded-md border-none cursor-pointer mr-2'

const formatBirth = (birth: number | string) => {
  const date = new Date(+birth)
  return date.toLocaleDateString()
}

const resetEditRow = () => {
  editRowIndex.value = -1
  editRow.value = {}
}

const tableRef = useTemplateRef('tableRef')

const createColRender = (slotName: string) => {
  return (props: TableRenderProps) => {
    return tableRef.value?.$slots[slotName]?.(props)
  }
}

const editRender = createColRender('edit')

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
    render: createColRender('action'),
  },
]

const handleSave = (index: number) => {
  Object.assign(data.value[index], editRow.value)
  resetEditRow()
}

const data = ref([
  { id: 1, name: '张三', age: 18, birth: 1672531200000 },
  { id: 2, name: '李四', age: 19, birth: 1672531200000 },
])

const editRowIndex = ref(-1)

const editRow = ref<Record<string, unknown>>({})

watch(editRowIndex, (newVal) => {
  if (newVal !== -1) {
    editRow.value = { ...data.value[newVal] }
  }
})
</script>

<template>
  <Table ref="tableRef" :columns="columns" :data="data">
    <template #edit="{ row, col, index }">
      <input v-if="editRowIndex === index" v-model="editRow[col.key]" />
      <span v-else>{{
        col.key === 'birth' ? formatBirth(row[col.key] as number) : row[col.key]
      }}</span>
    </template>
    <template #action="{ index }">
      <template v-if="editRowIndex === index">
        <button :class="buttonClass" @click="handleSave(index)">保存</button>
        <button :class="buttonClass" @click="resetEditRow">取消</button>
      </template>
      <template v-else>
        <button :class="buttonClass" @click="editRowIndex = index">修改</button>
      </template>
    </template>
  </Table>
</template>
