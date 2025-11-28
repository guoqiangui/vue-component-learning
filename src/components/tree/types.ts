export interface TreeNode {
  title: string
  children?: TreeNode[]
  checked?: boolean
  expanded?: boolean
}

export interface TreeContext {
  handleExpand: (node: TreeNode) => void
  handleCheck: (node: TreeNode, checked: boolean) => void
}
