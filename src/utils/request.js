import {message} from 'ant-design-vue'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import store from '@/store'
import {baseURL} from '@/config'

const service = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'x-requested-with': 'XMLHttpRequest'
  }
})

service.interceptors.request.use(config => {
  const token = store.getters['user/token']
  if (token) {
    config.headers.Authorization = `Bear ${token}`
  }
  return config
}, e => Promise.reject(new Error(e.message)))

service.interceptors.response.use(resp => {
  const {success, data} = resp.data
  const msg = resp.data.message
  // 请求成功
  if (success) {
    // 成功则返回解析后的数据
    return data
  } else {
    // 失败（请求成功，业务失败），消息提示
    message.error(msg)
    return Promise.reject(new Error(msg))
  }
}, e => {
  const msg = e.message
  message.error(msg)
  return Promise.reject(new Error(msg))
})

axiosRetry(service, { retries: 5 })

export default service
