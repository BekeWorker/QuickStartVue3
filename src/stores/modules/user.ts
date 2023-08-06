import { defineStore } from 'pinia'
import router from '@/router'
import { handleRouteMenu } from '@/utils/menu'

import type { UserInfo, UserMenu } from '@/service/types'
import { getUserInfo, getUserMenus } from '@/service/login'
import { localCache } from '@/utils'
import { USER_MENUS_KEY, USER_INFO_KEY } from '@/constants/cache-keys'

interface UserState {
  userInfo?: UserInfo
  userMenus?: UserMenu[]
  userPermissions?: string[]
}

export function setupUser() {}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: undefined,
    userMenus: undefined,
    userPermissions: undefined
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || JSON.parse(localCache.getCache(USER_INFO_KEY) || '{}')
    },
    getUserMenus(): UserMenu {
      return this.userMenus || JSON.parse(localCache.getCache(USER_MENUS_KEY) || '[]')
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
            desc: '入口',
            icon: '',
            id: 1,
            parentId: -1,
            url: '',
            children: [
              {
                name: 'analysis',
                desc: '分析管理',
                icon: '',
                id: 11,
                parentId: 1,
                url: '',
                children: [
                  {
                    name: 'overview',
                    desc: '概述管理',
                    icon: '',
                    id: 111,
                    parentId: 11,
                    url: '',
                    children: []
                  },
                  {
                    name: 'dashboard',
                    desc: '看板管理',
                    icon: '',
                    id: 112,
                    parentId: 11,
                    url: '',
                    children: []
                  }
                ]
              },
              {
                name: 'system',
                desc: '系统管理',
                icon: '',
                id: 12,
                parentId: 1,
                url: '',
                children: [
                  {
                    name: 'user',
                    desc: '用户管理',
                    icon: '',
                    id: 121,
                    parentId: 12,
                    url: '',
                    children: []
                  },
                  {
                    name: 'role',
                    desc: '角色管理',
                    icon: '',
                    id: 122,
                    parentId: 12,
                    url: '',
                    children: []
                  },
                  {
                    name: 'department',
                    desc: '部门管理',
                    icon: '',
                    id: 123,
                    parentId: 12,
                    url: '',
                    children: []
                  },
                  {
                    name: 'menu',
                    icon: '',
                    id: 124,
                    parentId: 12,
                    url: '',
                    desc: '菜单管理',
                    children: []
                  }
                ]
              },
              {
                name: 'product',
                desc: '产品管理',
                icon: '',
                id: 13,
                parentId: 1,
                url: '',
                children: [
                  {
                    name: 'goods',
                    desc: '货物管理',
                    icon: '',
                    id: 131,
                    parentId: 13,
                    url: '',
                    children: []
                  },
                  {
                    name: 'category',
                    desc: '分类管理',
                    icon: '',
                    id: 132,
                    parentId: 13,
                    url: '',
                    children: []
                  }
                ]
              },
              {
                name: 'story',
                desc: '随便聊聊',
                icon: '',
                id: 14,
                parentId: 1,
                url: '',
                children: [
                  {
                    name: 'chat',
                    desc: '闲聊内容',
                    icon: '',
                    id: 141,
                    parentId: 14,
                    url: '',
                    children: []
                  },
                  {
                    name: 'list',
                    icon: '',
                    id: 142,
                    parentId: 14,
                    url: '',
                    desc: '故事列表',
                    children: []
                  }
                ]
              }
            ]
          }
        ]
        this.setUserMenus(userMenus)
        // 默认路由的个数
        if (router.getRoutes().length <= 2) {
          handleRouteMenu(userMenus)?.map((route) => {
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
