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

import path from 'path'

// 处理routes数据，返回对应的menu规则数据
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 不满足条件meta && meta.title && meta.icon的数据不应该存在
  routes.forEach(route => {
    const {meta, children} = route
    // 不存在children && 不存在meta的数据直接return
    if (isNull(children) && isNull(meta)) {
      return
    }
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
export const filterRoutes = routes => {
  // 获取到所有的子路由
  const allChildRoutes = getAllChildRoutes(routes)
  // 对比子路由和一级路由，如果已经存在，则把存在一级根路由下与子路由相同的路由删掉
  return routes.filter(route =>
    !allChildRoutes.find(childRoute => childRoute.path === route.path)
  )
}

// 获取所有子路由(filterRoutes方法调用)
export const getAllChildRoutes = routes => {
  const result = []
  routes.forEach(route => {
    const {children} = route
    if (children && children.length) {
      result.push(...children)
    }
  })
  return result
}

/**
 * 筛选出可供搜索的路由对象
 * @param routes
 * @param basePath
 * @param prefixTitle
 */
export const generateSearchRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []
  // 循环 routes 路由
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const re = /.*\/:.*/
    if (
      route.meta &&
      route.meta.title &&
      !re.exec(route.path) &&
      !res.find(item => item.path === data.path)
    ) {
      data.title = [...data.title, route.meta.title]
      res.push(data)
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateSearchRoutes(route.children, data.path, data.title)
      if (tempRoutes.length) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

const isNull = obj => !obj || JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]'
