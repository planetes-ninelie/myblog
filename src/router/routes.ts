import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

export const constantRoutes = [
  {
    //首页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      icon: 'Avatar',
      isMenu: true,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'home',
          isMenu: true
        }
      },
      {
        path: '/frontEnd',
        component: () => import('@/views/frontEnd/index.vue'),
        name: 'frontEnd',
        meta: {
          title: '前端学习',
          icon: 'frontEnd',
          isMenu: true
        },
        children: [
          {
            path: '/frontEnd/testPages',
            name: 'testPages',
            meta: {
              title: '测试页面',
              icon: '',
              isMenu: true
            },
            component: () => import('@/views/frontEnd/testPages/index.vue'),
            children: [
              {
                path: '/frontEnd/testPages/schoolAdmin',
                name: 'schoolAdmin',
                meta: {
                  title: '学校管理员页面',
                  icon: '',
                  isMenu: true
                },
                component: () => import('@/views/frontEnd/testPages/schoolAdmin/index.vue')
              },
              {
                path: '/frontEnd/testPages/schoolAdd',
                name: 'schoolAdd',
                meta: {
                  title: '添加学校管理员',
                  icon: '',
                  isMenu: false
                },
                component: () => import('@/views/frontEnd/testPages/schoolAdmin/schoolAdd.vue')
              },
              {
                path: '/frontEnd/testPages/schoolAmend',
                name: 'schoolAmend',
                meta: {
                  title: '修改学校管理员',
                  icon: '',
                  isMenu: false
                },
                component: () => import('@/views/frontEnd/testPages/schoolAdmin/schoolAmend.vue')
              }
            ]
          },
          {
            path: '/frontEnd/study',
            name: 'study',
            meta: {
              title: '学习笔记',
              icon: '',
              isMenu: true
            },
            component: () => import('@/views/frontEnd/study/index.vue')
          }
        ]
      },
      {
        path: '/others',
        name: 'other',
        meta: {
          title: '其他',
          icon: '',
          isMenu: true
        },
        component: () => import('@/views/others/index.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '关于',
          icon: '',
          isMenu: true
        },
        component: () => import('@/views/about/index.vue')
      },
    ],
  },
  {
    //404页面
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
