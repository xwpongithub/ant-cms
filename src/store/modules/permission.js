import {publicRoutes, privateRoutes} from '@/router'

export default {
  namespaced: true,
  state: () => ({
    // 初始时拥有的路由表
    routes: publicRoutes
  }),
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限数据筛选路由
     * @param ctx
     * @param menus
     */
    filterRoutes(ctx, menus) {
      const routes = []
      menus.forEach(key => {
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      this.commit('permission/setRoutes', routes)
      return routes
    }
  }
}
