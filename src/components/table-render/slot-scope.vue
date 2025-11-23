<script setup lang="ts">
import { inject } from 'vue'
import type { TableColumn } from './types'
import { tableRootKey } from './constants'

const tableRoot = inject(tableRootKey)

const { row, col, index } = defineProps<{
  row: Record<string, unknown>
  col: TableColumn
  index: number
}>()
const slot = col.slot ? tableRoot?.slots[col.slot] : undefined
</script>

<template>
  <div>
    <component :is="slot" :row="row" :col="col" :index="index" />
  </div>
</template>
