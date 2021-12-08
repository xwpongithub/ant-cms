import path from 'path'
import {computed} from 'vue'

/**
 * 1.如果meta && meta.title && meta.icon ：则显示在 menu 菜单中，其中 title 为显示的内容，icon 为显示的图标
 *   1.1 如果存在 children ：则以 a-sub-menu（子菜单） 展示
 *   1.2 否则：则以 a-menu-item（菜单项） 展示
 * 2.否则：不显示在 menu 菜单中
 *
 * 通过getRoutes方法拿到的是完整路由，数据存在两个问题需要解决
 * 1.存在重复路由数据
 * 2.不满足条件meta && meta.title && meta.icon的数据不应该存在
 */

export default function useSidebarMenu(routes) {
  const menus = computed(() => {
    const filteredRoutes = filterRoutes(routes)
    return generateMenus(filteredRoutes)
  })
  return {
    menus
  }
}

// 处理routes数据，返回对应的menu规则数据
const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足条件meta && meta.title && meta.icon的数据不应该存在
  routes.forEach(route => {
    const {meta, children} = route
    // 不存在children && 不存在meta的数据直接return
    if (isNull(children) && isNull(meta)) return
    // 存在children不存在meta,迭代generateMenus
    if (isNull(meta) && !isNull(children)) {
      result.push(...generateMenus(children))
      return
    }
    // 不存在children但存在meta
    // 因为最终的menu需要进行跳转，因此需要合并path
    const routePath = path.resolve(basePath, route.path)
    // 路由分离后可能存在同名父级路由的情况
    let routeObj = result.find(item => item.path === routePath)
    if (!routeObj) {
      routeObj = {
        ...route,
        path: routePath,
        children: []
      }
      const {icon, title} = route.meta
      if (icon && title) {
         result.push(routeObj)
      }
    }
    // 第二种情况存在children且存在meta
    if (!isNull(children)) {
      routeObj.children.push(...generateMenus(children, routeObj.path))
    }
  })
  return result
}

// 去掉脱离层级的路由
const filterRoutes = routes => {
  // 获取到所有的子路由
  const allChildRoutes = getAllChildRoutes(routes)
  // 对比子路由和一级路由，如果已经存在，则把存在一级根路由下与子路由相同的路由删掉
  return routes.filter(route =>
    !allChildRoutes.find(childRoute => childRoute.name === route.name)
  )
}

// 获取所有子路由(filterRoutes方法调用)
const getAllChildRoutes = routes => {
  const result = []
  routes.forEach(route => {
    const {children} = route
    if (children && children.length) {
      result.push(...children)
    }
  })
  return result
}

const isNull = obj => !obj || JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]'
