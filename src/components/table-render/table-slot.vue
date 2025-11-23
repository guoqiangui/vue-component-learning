<script setup lang="ts">
import { getCurrentInstance, provide } from 'vue'
import type { TableColumn } from './types'
import SlotScope from './slot-scope.vue'
import { tableRootKey } from './constants'

const { rowKey = 'id' } = defineProps<{
  columns: TableColumn[]
  data: Record<string, unknown>[]
  rowKey?: string
}>()

const instance = getCurrentInstance()!
provide(tableRootKey, instance)
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
          <template v-else-if="col.slot">
            <SlotScope :row="item" :col="col" :index="index" />
          </template>
          <template v-else>{{ item[col.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
