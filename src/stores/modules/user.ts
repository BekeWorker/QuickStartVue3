import { defineStore } from 'pinia'
import router from '@/router'
import { handleMenu } from '@/router/menu'

import type { UserInfo, UserMenu } from '@/service/types'
import { getUserInfo, getUserMenus } from '@/service/login'
import { localCache } from '@/utils'
import { USER_MENUS_KEY, USER_INFO_KEY } from '@/constants/cache-keys'

interface UserState {
  userInfo?: UserInfo
  userMenus?: UserMenu[]
  userPermissions?: string[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: undefined,
    userMenus: undefined,
    userPermissions: undefined
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || localCache.getCache(USER_INFO_KEY)
    },
    getUserMenus(): UserMenu {
      return this.userMenus || localCache.getCache(USER_MENUS_KEY)
    }
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      localCache.setCache(USER_INFO_KEY, userInfo)
    },
    setUserMenus(userMenus: UserMenu[]) {
      this.userMenus = userMenus
      localCache.setCache(USER_MENUS_KEY, userMenus)
    },
    async login() {
      router.beforeEach(async (to, from, next) => {
        // const userInfo = await getUserInfo()
        // this.setUserInfo(userInfo)
        // const userMenus = await getUserMenus()
        // this.setUserMenus(userMenus)

        const userMenus = [
          {
            name: 'main',
            children: [
              {
                name: 'analysis',
                children: [
                  {
                    name: 'overview',
                    children: []
                  },
                  {
                    name: 'dashboard',
                    children: []
                  }
                ]
              },
              {
                name: 'system',
                children: [
                  {
                    name: 'user',
                    children: []
                  },
                  {
                    name: 'role',
                    children: []
                  },
                  {
                    name: 'department',
                    children: []
                  },
                  {
                    name: 'menu',
                    children: []
                  }
                ]
              },
              {
                name: 'product',
                children: [
                  {
                    name: 'goods',
                    children: []
                  },
                  {
                    name: 'category',
                    children: []
                  }
                ]
              },
              {
                name: 'story',
                children: [
                  {
                    name: 'chat',
                    children: []
                  },
                  {
                    name: 'list',
                    children: []
                  }
                ]
              }
            ]
          }
        ]

        // 默认路由的个数
        if (router.getRoutes().length <= 2) {
          handleMenu(userMenus)?.map((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } else {
          next()
        }
      })
    }
  }
})
