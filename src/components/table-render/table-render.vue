<script setup lang="ts">
import type { TableColumn } from './types'

const { rowKey = 'id' } = defineProps<{
  columns: TableColumn[]
  data: Record<string, unknown>[]
  rowKey?: string
}>()
</script>

<template>
  <table class="border-collapse w-full">
    <thead class="bg-slate-100">
      <tr>
        <th
          v-for="item in columns"
          :key="item.key"
          class="border border-solid border-slate-300 p-2"
        >
          {{ item.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="item[rowKey] as PropertyKey">
        <td v-for="col in columns" :key="col.key" class="border border-solid border-slate-300 p-2">
          <template v-if="col.render">
            <component :is="col.render" :row="item" :col="col" :index="index" />
          </template>
          <template v-else>{{ item[col.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
