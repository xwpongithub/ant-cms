import storage from 'good-storage'
import md5 from 'md5'
import router from '@/router'

import {CONSTANT} from '@/config'
import { login, getUserInfo } from '@/api/system'

export default {
  namespaced: true,
  state: {
    token: storage.get(CONSTANT.token),
    userInfo: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      storage.set(CONSTANT.token, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  getters: {
    token: state => state.token
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
        this.commit('user/setUserInfo', rs)
      } catch (e) {
        throw new Error(e.message)
      }
    }
  }
}
