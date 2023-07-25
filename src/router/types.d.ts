export interface IMenu {
  name: string
  children: any[]
  fullPath?: string
}
export interface IRoute {
  path: string
  children?: any[]
  redirect?: string
  component?: () => void
}
