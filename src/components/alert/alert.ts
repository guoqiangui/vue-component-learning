import Notification from './notification'
import type { NoticeOption } from './types'

let messageInstance

const getMessageInstance = () => {
  return messageInstance || Notification.newInstance()
}

const notice = ({ duration = 1500, content = '' }) => {
  const instance = getMessageInstance()
  instance.add({ duration, content })
}

export default {
  info(options: NoticeOption) {
    notice(options)
  },
}
