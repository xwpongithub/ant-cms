import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout'

/**
 * 公开路由表（不需要权限验证）
 */
const publicRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/console',
    component: Layout,
    children: [
      {
        path: 'console',
        name: 'console',
        component: () => import(/* webpackChunkName: "console" */ '@/views/console'),
        meta: {
          title: '控制台',
          icon: 'icon-kongzhitai'
        }
      },
      {
        path: '404',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404')
      },
      {
        path: '401',
        name: '401',
        component: () => import(/* webpackChunkName: "401" */ '@/views/error-page/401')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  }
]

/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/workflow',
    name: 'workflow',
    redirect: '/workflow/task-list',
    component: Layout,
    meta: {
      title: '工作流程',
      icon: 'icon-gongzuoliucheng-02'
    },
    children: [
      {
        path: 'task-list',
        name: 'workflow-task-list',
        component: () => import(/* webpackChunkName: "workflow-task-list" */ '@/views/workflow/task-list'),
        meta: {
          title: '任务列表',
          icon: 'icon-renwu'
        }
      },
      {
        path: 'deployment',
        name: 'workflow-deployment',
        component: () => import(/* webpackChunkName: "workflow-deployment" */ '@/views/workflow/deployment'),
        meta: {
          title: '流程部署',
          icon: 'icon-liuchengbushu'
        }
      },
      {
        path: 'definition',
        name: 'workflow-definition',
        component: () => import(/* webpackChunkName: "workflow-definition" */ '@/views/workflow/definition'),
        meta: {
          title: '流程定义',
          icon: 'icon-_liuchengdingyi'
        }
      },
      {
        path: 'design',
        name: 'workflow-design',
        component: () => import(/* webpackChunkName: "workflow-design" */ '@/views/workflow/design'),
        meta: {
          title: '流程设计',
          icon: 'icon-a-ziyuan7'
        }
      }
    ]
  },
  {
    path: '/dmn',
    name: 'dmn',
    redirect: '/dmn/test',
    component: Layout,
    meta: {
      title: '规则引擎',
      icon: 'icon-guizeyinqing'
    },
    children: [
      {
        path: 'definition',
        name: 'dmn-definition',
        component: () => import(/* webpackChunkName: "dmn-definition" */ '@/views/dmn/definition'),
        meta: {
          title: '规则定义',
          icon: 'icon-guizedingyix'
        }
      },
      {
        path: 'test',
        name: 'dmn-test',
        component: () => import(/* webpackChunkName: "dmn-test" */ '@/views/dmn/test'),
        meta: {
          title: '规则测试',
          icon: 'icon-ceshi'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes, {
    path: '/:pathMath(.*)',
    redirect: '/404'
  }]
})

export default router
