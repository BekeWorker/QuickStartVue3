import request from '../index'
import type { UserInfo, UserMenu } from '../types'

const enum UserAPI {
  UserInfo = '/userInfo',
  UserMenus = '/menu'
}
/**
 *
 * @param params
 * @returns
 */
export function getUserInfo() {
  return request.get<UserInfo>({
    url: UserAPI.UserInfo
  })
}

export function getUserMenus() {
  return request.get<UserMenu[]>({
    url: UserAPI.UserMenus
  })
}
