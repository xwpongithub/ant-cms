import request from '@/utils/request'

export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

export const rolePermission = id => {
  return request({
    url: `role/permission/${id}`
  })
}

export const distPermission = data => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
