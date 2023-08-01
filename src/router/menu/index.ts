import type { IMenu, IRoute } from '../types.d'
const modules = import.meta.glob('@/views/**/*.vue')

export function handleMenu(menuData: any[], parentMenu?: IMenu) {
  return (
    menuData?.map((menu: IMenu) => {
      const { name, children, desc } = menu
      menu.fullPath = parentMenu?.fullPath ? parentMenu.fullPath + '/' : ''
      menu.fullPath += name
      const route: IRoute = { path: '', fullPath: menu.fullPath, meta: { name: desc } }
      if (children && children.length) {
        route.path = parentMenu ? name : `/${name}`
        route.children = handleMenu(children, menu)
        route.redirect = '/' + children[0].fullPath
      } else {
        route.path = name
        route.component = modules[`/src/views/${menu.fullPath}/index.vue`]
      }
      return route
    }) || []
  )
}
