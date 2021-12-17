import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout'
import Article from './modules/Article'
import UserManage from './modules/UserManage'
import RoleList from './modules/RoleList'
import PermissionList from './modules/PermissionList'
import ArticleCreate from './modules/ArticleCreate'
import store from '@/store'

/**
 * 私有路由表
 */
export const privateRoutes = [
  UserManage,
  RoleList,
  PermissionList,
  Article,
  ArticleCreate
]

/**
 * 公开路由表（不需要权限验证）
 */
export const publicRoutes = [
  {
    path: '/',
    redirect: '/profile',
    component: Layout,
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "console" */ '@/views/profile'),
        meta: {
          title: 'profile',
          icon: 'icon-kongzhitai'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404')
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes]
})

export function resetRouter() {
  if (store.state.user.userInfo && store.state.user.userInfo.permission && store.state.user.userInfo.permission.menus) {
    const menus = store.state.user.userInfo.permission.menus
    menus.forEach(menu => {
      router.removeRoute(menu)
    })
  }
}

export default router
