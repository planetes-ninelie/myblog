import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//导入svg配置
import 'virtual:svg-icons-register'
//引入全局组件
import globalComponent from './components/index'
import '@/styles/index.scss'
//引入路由
import router from './router'
//引入store
import pinia from './store'
//引入el-cion
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入el消息提示
import { ElMessage } from 'element-plus'

//获取应用实例对象
const app = createApp(App)
//安装el-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
//安装全局组件
app.use(globalComponent)
//调用路由
app.use(router)
//安装仓库
app.use(pinia)
//安装el消息提示
app.use(ElMessage)
//将应用挂载到挂载点上
app.mount('#app')
