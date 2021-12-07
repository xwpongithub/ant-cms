import router from './router'
import store from './store'

// 白名单路由
const whiteList = ['/login']

/**
 * 路由前置守卫
 * to 要到哪里去
 * from 你从哪里来
 * next 是否要去
 */
router.beforeEach((to, from, next) => {
  // 用户已登录，则不允许进入login
  // 用户未登录，只允许进入login
  if (store.getters['user/token']) {
    // 用户已登录，则不允许再进入login
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 用户未登录，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
