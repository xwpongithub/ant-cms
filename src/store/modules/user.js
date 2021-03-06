import storage from 'good-storage'
import md5 from 'md5'
import router, {resetRouter} from '@/router'

import {KEY_TOKEN, KEY_LOGIN_TIME} from '@/config/constant'
import { login, getUserInfo } from '@/api/system'

export default {
  namespaced: true,
  state: {
    token: storage.get(KEY_TOKEN),
    userInfo: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      storage.set(KEY_TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 用户登录action
    async login(ctx, userInfo) {
      const {username, password} = userInfo
      try {
        const rs = await login({
          username,
          password: md5(password)
        })
        this.commit('user/setToken', rs.token)
        // 保存登录时间
        storage.set(KEY_LOGIN_TIME, Date.now())
        // 跳转至登录页
        router.push('/')
        return rs
      } catch (e) {
        throw new Error(e.message)
      }
    },
    // 获取用户信息action
    async getUserInfo() {
      try {
        const rs = await getUserInfo()
        console.log(rs)
        console.log('userInfo')
        this.commit('user/setUserInfo', rs)
        return rs
      } catch (e) {
        throw new Error(e.message)
      }
    },
    // 退出登录
    logout() {
      resetRouter()
      this.commit('user/setToken', null)
      this.commit('user/setUserInfo', null)
      this.commit('app/removeAllTagsView')
      storage.clear()
      storage.session.clear()
      router.push('/login')
    }
  }
}
