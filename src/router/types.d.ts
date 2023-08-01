export interface IMenu {
  name: string
  desc: string
  children: any[]
  fullPath?: string
}
export interface IMeta {
  name: string
}
export interface IRoute {
  path: string
  meta: IMeta
  fullPath: string
  children?: any[]
  redirect?: string
  component?: () => void
}
