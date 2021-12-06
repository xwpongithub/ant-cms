import {message} from 'ant-design-vue'
import axios from 'axios'
import axiosRetry from 'axios-retry'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'x-requested-with': 'XMLHttpRequest'
  }
})

service.interceptors.response.use(resp => {
  const {success, message, data} = resp.data
  // 请求成功
  if (success) {
    // 成功则返回解析后的数据
    return data
  } else {
    // 失败（请求成功，业务失败），消息提示
    message.error(message)
    return Promise.reject(new Error(message))
  }
}, e => {
  message.error(e.message)
  return Promise.reject(e)
})

axiosRetry(service, { retries: 5 })

export default service
