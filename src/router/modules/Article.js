import Layout from '@/components/layout'

export default {
  path: '/article',
  name: 'articleRanking',
  redirect: '/article/ranking',
  component: Layout,
  meta: {
    title: 'article',
    icon: 'icon-guizeyinqing'
  },
  children: [
    {
      path: '/article/ranking',
      component: () => import(/* webpackChunkName: "article-create" */ '@/views/article-ranking'),
      meta: {
        title: 'articleRanking',
        icon: 'icon-guizedingyix'
      }
    },
    {
      path: '/article/:id',
      component: () => import(/* webpackChunkName: "article-detail" */ '@/views/article-detail'),
      meta: {
        title: 'articleDetail'
      }
    }
  ]
}
