export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'home', //命名路由
  },
  {
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
