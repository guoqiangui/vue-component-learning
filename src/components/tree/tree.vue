<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import Node from './node.vue'
import type { TreeContext, TreeNode } from './types'
import { deepClone } from '@/utils'
import { treeContextKey } from './constants'

const { data = [], showCheckbox = false } = defineProps<{
  data?: TreeNode[]
  showCheckbox?: boolean
}>()

const clonedData = ref<TreeNode[]>([])

const rebuildData = () => {
  clonedData.value = deepClone(data)
}
rebuildData()
watch(() => data, rebuildData)

const emit = defineEmits(['on-toggle-expand', 'on-check-change'])

const handleExpand: TreeContext['handleExpand'] = (node) => {
  node.expanded = !node.expanded

  emit('on-toggle-expand', node)
}

const updateTreeDown = (node: TreeNode, checked: boolean) => {
  node.checked = checked

  if (node.children) {
    node.children.forEach((child) => updateTreeDown(child, checked))
  }
}

const updateChecked = (tree: TreeNode[]) => {
  tree.forEach((node) => {
    if (node.children) {
      updateChecked(node.children)
    }

    if (node.children) {
      const allChecked = node.children.every((child) => !!child.checked)

      node.checked = allChecked
    }
  })
}

const handleCheck: TreeContext['handleCheck'] = (node, checked) => {
  updateTreeDown(node, checked)
  updateChecked(clonedData.value)

  emit('on-check-change', node)
}

provide(treeContextKey, {
  handleExpand,
  handleCheck,
})
</script>

<template>
  <div>
    <Node v-for="item in clonedData" :key="item.title" :data="item" :showCheckbox="showCheckbox" />
  </div>
</template>
