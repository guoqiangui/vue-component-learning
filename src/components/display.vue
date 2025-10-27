<script setup lang="ts">
import { randomString } from '@/utils'
import { createApp, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const { code } = defineProps<{ code: string }>()

const getSource = (source: string, type: string) => {
  const reg = new RegExp(`<${type}[^>]*>`)
  const match = source.match(reg)
  if (!match) return ''

  const startTag = match[0]
  const start = source.indexOf(startTag)
  const end = source.indexOf(`</${type}>`)
  const code = source.slice(start + startTag.length, end)
  return code
}

const template = getSource(code, 'template')
const script = getSource(code, 'script').replace('export default', 'return')
const style = getSource(code, 'style')

const component = new Function(script)()

const app = createApp({
  template,
  ...component,
})

const container = useTemplateRef('container')

const styleId = randomString()

onMounted(() => {
  if (container.value) {
    app.mount(container.value)
  }

  if (style) {
    const styleElement = document.createElement('style')
    styleElement.setAttribute('id', styleId)
    styleElement.textContent = style
    document.head.appendChild(styleElement)
  }
})

onBeforeUnmount(() => {
  app.unmount()

  const styleElement = document.getElementById(styleId)
  if (styleElement) {
    styleElement.remove()
  }
})
</script>

<template>
  <div ref="container"></div>
</template>
