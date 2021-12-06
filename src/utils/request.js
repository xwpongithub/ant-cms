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

axiosRetry(service, { retries: 5 })

export default service
