// 当前环境是否位调试环境
export const debug = process.env.VUE_APP_ENV !== 'production'
// api请求地址前缀
export const baseURL = process.env.VUE_APP_BASE_URL

// 当前系统使用的常量
export const CONSTANT = {
  token: '__token__'
}
