export const constantRoutes = [
  {
    //首页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      icon: 'Avatar',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/frontEnd',
        component: () => import('@/views/frontEnd/index.vue')
      },
      {
        path: '/others',
        component: () => import('@/views/others/index.vue')
      },
      {
        path: '/about',
        component: () => import('@/views/about/index.vue')
      },
    ],
  },
  {
    //404页面
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
