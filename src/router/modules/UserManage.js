import Layout from '@/components/layout'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'userManage',
  meta: {
    title: 'user',
    icon: 'icon-gongzuoliucheng-02'
  },
  children: [
    {
      path: '/user/manage',
      name: 'userList',
      component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-manage'),
      meta: {
        title: 'userManage',
        icon: 'icon-renwu'
      }
    },
    {
      path: '/user/info/:id',
      name: 'userInfo',
      component: () => import(/* webpackChunkName: "user-manage" */ '@/views/user-info'),
      meta: {
        title: 'userInfo'
      }
    },
    {
      path: '/user/import',
      name: 'userImport',
      component: () => import(/* webpackChunkName: "user-manage" */ '@/views/import'),
      meta: {
        title: 'excelImport'
      }
    }
  ]
}
