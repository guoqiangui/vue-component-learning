<script setup lang="ts">
import Display from '@/components/display.vue'
import { code } from './code'
import { ref } from 'vue'

const isRender = ref(true)
</script>

<template>
  <button @click="isRender = !isRender">切换组件渲染</button>
  <Display v-if="isRender" :code="code" />
</template>
