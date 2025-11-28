<script setup lang="ts">
import Tree from '@/components/tree/tree.vue'
import type { TreeNode } from '@/components/tree/types'
import { ref } from 'vue'

const treeData = ref([
  {
    title: 'Node 1',
    children: [{ title: 'Child 1', children: [{ title: 'Grandchild 1' }] }, { title: 'Child 2' }],
  },
  {
    title: 'Node 2',
  },
])

const treeData2 = [
  {
    title: 'parent 1',
    expand: true,
    children: [
      {
        title: 'parent 1-1',
        expand: true,
        children: [
          {
            title: 'leaf 1-1-1',
          },
          {
            title: 'leaf 1-1-2',
          },
        ],
      },
      {
        title: 'parent 1-2',
        children: [
          {
            title: 'leaf 1-2-1',
          },
          {
            title: 'leaf 1-2-1',
          },
        ],
      },
    ],
  },
]

const showCheckbox = ref(true)

const handleExpand = (node: TreeNode) => {
  console.log('on-toggle-expand', node)
}

const handleCheck = (node: TreeNode) => {
  console.log('on-check-change', node)
}
</script>

<template>
  <Tree
    :data="treeData"
    :showCheckbox="showCheckbox"
    @on-toggle-expand="handleExpand"
    @on-check-change="handleCheck"
  />
  <button @click="showCheckbox = !showCheckbox">Toggle showCheckbox</button>
  <button @click="treeData = treeData2">Switch to treeData2</button>
</template>
