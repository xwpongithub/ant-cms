import Layout from '@/components/layout'

export default {
  path: '/article',
  name: 'articleCreate',
  redirect: '/article/ranking',
  component: Layout,
  meta: {
    title: 'article',
    icon: 'icon-guizeyinqing'
  },
  children: [
    {
      path: '/article/create',
      name: 'articleCreate',
      component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-create'),
      meta: {
        title: 'articleCreate',
        icon: 'icon-ceshi'
      }
    },
    {
      path: '/article/editor/:id',
      name: 'articleEditor',
      component: () => import(/* webpackChunkName: "article-editor" */ '@/views/article-create'),
      meta: {
        title: 'articleEditor'
      }
    }
  ]
}
