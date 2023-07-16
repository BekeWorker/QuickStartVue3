export interface Result<T = any> {
  code: number
  data: T
}

export interface UserInfo {
  id: string | number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: Date
  updateAt: Date
  role: Role
  department: Department
}
