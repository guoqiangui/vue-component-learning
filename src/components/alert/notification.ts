import { createVNode, render } from 'vue'
import Alert from './alert.vue'
import type { Notice, NoticeOption } from './types'

Alert.newInstance = (properties: Record<string, unknown>) => {
  const props = properties || {}
  const vnode = createVNode(Alert, props)
  render(vnode, document.body)

  return {
    add(noticeProps: NoticeOption) {
      vnode.component?.exposed?.add(noticeProps)
    },
    remove(id: Notice['id']) {
      vnode.component?.exposed?.remove(id)
    },
  }
}

export default Alert
