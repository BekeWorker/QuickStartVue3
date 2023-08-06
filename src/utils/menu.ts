import type { IMenu, IRoute, INavMenu } from './types'
const modules = import.meta.glob('@/views/**/*.vue')
/**
 * 递归菜单树，动态添加路由
 * @param menuData
 * @param parentMenu
 * @returns
 */
export function handleRouteMenu(menuData: any[], parentMenu?: IMenu) {
  return (
    menuData?.map((menu: IMenu) => {
      const { name, children } = menu
      menu.fullPath = parentMenu?.fullPath ? parentMenu.fullPath + '/' : ''
      menu.fullPath += name
      const route: IRoute = { path: parentMenu ? name : `/${name}` }
      if (children && children.length) {
        route.children = handleRouteMenu(children, menu)
        route.redirect = '/' + children[0].fullPath
      } else {
        route.component = modules[`/src/views/${menu.fullPath}/index.vue`]
      }

      return route
    }) || []
  )
}

export const defaultOpeneds: string[] = []

/**
 * 递归菜单树，处理左侧导航
 * @param menuData
 * @param parentMenu
 * @returns
 */
export function handleNavMenu(menuData: any[], parentMenu?: IMenu) {
  return (
    menuData?.map((menu: IMenu) => {
      const { name, children, desc } = menu
      menu.fullPath = parentMenu?.fullPath ? parentMenu.fullPath + '/' : ''
      menu.fullPath += name
      const navMenu: INavMenu = {
        path: parentMenu ? name : `/${name}`,
        fullPath: menu.fullPath,
        meta: { name: desc }
      }
      if (children && children.length) {
        navMenu.children = handleNavMenu(children, menu)
      }
      // 全部展开
      defaultOpeneds.push(name)
      return navMenu
    }) || []
  )
}
