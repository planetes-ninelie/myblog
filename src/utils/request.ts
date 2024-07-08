//引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
//利用axios创建request实例
let request = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_API}`,
  timeout: 5000,
})
//添加请求与拦截器
request.interceptors.request.use((config) => {
  return config
})
//添加相应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求资源找不到'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现异常'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
export default request
