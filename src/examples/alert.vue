<script setup lang="ts">
import Alert from '@/components/alert/alert'

let count = 0

const showAlert = () => {
  Alert.info({ content: `提示${++count}`, duration: 2000 })
}
</script>

<template>
  <button @click="showAlert">展示alert</button>
</template>
