<script setup lang="ts">
import { inject } from 'vue'
import type { TreeNode } from './types'
import Checkbox from '../checkbox/checkbox.vue'
import { treeContextKey } from './constants'

const { showCheckbox = false } = defineProps<{
  data: TreeNode
  showCheckbox?: boolean
}>()

const treeContext = inject(treeContextKey)
</script>

<template>
  <div>
    <div class="flex items-center">
      <span class="inline-block w-4 text-center leading-4" @click="treeContext?.handleExpand(data)">
        <span v-if="data.children?.length" class="cursor-pointer">{{
          data.expanded ? '-' : '+'
        }}</span>
      </span>
      <Checkbox
        v-if="showCheckbox"
        :modelValue="data.checked"
        @update:modelValue="treeContext?.handleCheck(data, $event)"
      />
      <span>{{ data.title }}</span>
    </div>
    <div class="pl-4">
      <template v-if="data.children?.length && data.expanded">
        <Node
          v-for="item in data.children"
          :key="item.title"
          :data="item"
          :showCheckbox="showCheckbox"
        />
      </template>
    </div>
  </div>
</template>
