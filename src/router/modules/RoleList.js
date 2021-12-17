import Layout from '@/components/layout'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'roleList',
  meta: {
    title: 'user',
    icon: 'icon-gongzuoliucheng-02'
  },
  children: [
    {
      path: '/user/role',
      name: 'userRole',
      component: () => import(/* webpackChunkName: "role-list" */ '@/views/role-list'),
      meta: {
        title: 'roleList',
        icon: 'icon-liuchengbushu'
      }
    }
  ]
}
