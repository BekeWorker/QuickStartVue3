export interface IMenu {
  name: string
  desc: string
  children: any[]
  fullPath?: string
}
export interface IRoute {
  path: string
  children?: any[]
  redirect?: string
  component?: () => void
}
export interface INavMenu {
  path: string
  fullPath: string
  meta: {}
  children?: any[]
}
