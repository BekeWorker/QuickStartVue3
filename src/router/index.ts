import { createRouter, createWebHistory } from 'vue-router'
import type { MenuItem, RouteItem } from './types.d'

const modules = import.meta.glob('../views/**/*.vue')

const menuData = [
  // 这里也可以不写(直接在路由拦截中查看是否有token, 决定去到登录页面, 还是自己有的页面)
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

const handleMenu = (data: any[], isChild?: boolean | undefined, cpnPath = '') => {
  return data?.map((menu: MenuItem) => {
    let handleChild
    const { name, children } = menu
    const hasChild = children && children.length
    menu.cpnPath = cpnPath ? cpnPath + '/' : cpnPath
    menu.cpnPath += name[0].toUpperCase() + name.substr(1)
    const fullPath = menu.cpnPath.toLocaleLowerCase()
    if (hasChild) handleChild = handleMenu(children, true, menu.cpnPath)

    const route: RouteItem = {
      path: isChild ? name : `/${name}`,
      children: handleChild || []
    }

    if (hasChild) {
      route.redirect =
        '/' + (children && children.length ? children[0].cpnPath.toLocaleLowerCase() : fullPath)
    } else {
      route.component = modules[`../views/${fullPath}/index.vue`]
    }
    return route
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // 跳转到首页 /home
      // 路由拦截中判断有没有token(store)
      //  > next
      //  > next("/login")
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login/index.vue')
    }
  ]
})
router.addRoute(handleMenu(menuData)[0])
export default router
