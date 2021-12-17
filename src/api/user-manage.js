import request from '@/utils/request'

export const getUserManageList = data => request({
  url: '/user-manage/list',
  params: data
})

export const userRoles = id => request({
  url: `/user-manage/role/${id}`
})

export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
