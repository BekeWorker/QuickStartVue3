export interface MenuItem<T = any> {
  name: string
  children: T
  cpnPath?: string
}
export interface RouteItem<T = any> {
  path: string
  children: T
  redirect?: string
  component?: () => void
}
