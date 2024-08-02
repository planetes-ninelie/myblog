//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
//引入路由常量
import { constantRoutes } from './routes'

//创建路由器
let router = createRouter({
  //路由模式Hash
  history: createWebHashHistory(),
  routes: constantRoutes,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      right: 0,
    }
  },
})

export default router
