export interface NoticeOption {
  content: string
  duration: number
}

export interface Notice extends NoticeOption {
  id: number
}
