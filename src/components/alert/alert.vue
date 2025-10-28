<script setup lang="ts">
import { ref } from 'vue'
import type { Notice, NoticeOption } from './types'

const notices = ref<Notice[]>([])

let id = 0
const getId = () => ++id

const add = (notice: NoticeOption) => {
  const id = getId()
  notices.value.push({ ...notice, id })
  setTimeout(() => {
    remove(id)
  }, notice.duration)
}

const remove = (id: Notice['id']) => {
  notices.value = notices.value.filter((item) => item.id !== id)
}

defineExpose({
  add,
})
</script>

<template>
  <div class="flex flex-col items-center fixed top-0 left-0 right-0 pointer-events-none">
    <TransitionGroup>
      <div v-for="item in notices" :key="item.id" class="shadow p-4 w-2/3 my-2 bg-white">
        {{ item.content }}
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.v-leave-active {
  position: absolute;
}
</style>
