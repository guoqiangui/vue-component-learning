/**
 * 生成随机字符串
 * @param length
 * @returns
 */
export const randomString = (length: number = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

const typeOf = (data: unknown) => {
  const t = Object.prototype.toString.call(data)
  const map: Record<string, string> = {
    '[object Array]': 'array',
    '[object Object]': 'object',
  }
  return map[t] || 'unknown'
}

/**
 * 深拷贝
 * @param data
 * @returns
 */
export const deepClone = <T>(data: T) => {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    ;(data as unknown[]).forEach((item) => (o as unknown[]).push(deepClone(item)))
  } else {
    const d = data as Record<string, unknown>
    Object.keys(d).forEach((key) => ((o as Record<string, unknown>)[key] = deepClone(d[key])))
  }

  return o as T
}
