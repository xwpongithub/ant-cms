import Layout from '@/components/layout'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'permissionList',
  meta: {
    title: 'user',
    icon: 'icon-gongzuoliucheng-02'
  },
  children: [
    {
      path: '/user/permission',
      name: 'userPermission',
      component: () => import(/* webpackChunkName: "permission-list" */ '@/views/permission-list'),
      meta: {
        title: 'permissionList',
        icon: 'icon-_liuchengdingyi'
      }
    }
  ]
}
