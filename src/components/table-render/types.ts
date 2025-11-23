import type { RenderFunction } from 'vue'

export interface TableColumn {
  title: string
  key: string
  render?: TableRenderFunction
  slot?: string
}

export interface TableRenderProps {
  row: Record<string, unknown>
  col: TableColumn
  index: number
}

export type TableRenderFunction = (props: TableRenderProps) => ReturnType<RenderFunction>
