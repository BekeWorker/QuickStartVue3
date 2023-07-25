export interface Result<T = any> {
  code: number
  data: T
}

export interface UserInfo {
  loginUser: {
    name: string
    email: string
    username: string
  }
  logoutUrl: string
}

export interface UserMenu {
  children?: UserMenu[]
  desc: string
  icon?: string
  id: number
  name: string
  parentId: number
  url: string
}
