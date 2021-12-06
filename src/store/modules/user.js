import storage from 'good-storage'
import md5 from 'md5'

import {CONSTANT} from '@/config'
import { login } from '@/api/system'

export default {
  namespaced: true,
  state: {
    token: storage.get(CONSTANT.token)
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      storage.set(CONSTANT.token, token)
    }
  },
  actions: {
    // 用户登录action
    login(ctx, userInfo) {
      const {username, password} = userInfo
      return new Promise((resolve, reject) => {
          login({
            username,
            password: md5(password)
          }).then(rs => {
            this.commit('user/setToken', rs.token)
            resolve(rs)
          })
            .catch(e => reject(e))
      })
    }
  }
}
