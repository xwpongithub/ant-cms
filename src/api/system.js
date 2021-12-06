import request from '@/utils/request'

/**
 * 登录系统
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
