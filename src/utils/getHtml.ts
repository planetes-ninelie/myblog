//引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

const data = [
  {
    name: 'vue',
    title: 'vue3项目搭建',
    url: '/vue3%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA.html'
  },
  {
    name: '数据结构与算法',
    title: '数据结构与算法学习笔记',
    url: '/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.html'
  }
]

//利用axios创建getHtml实例
let getHtml = axios.create({
  baseURL: `${import.meta.env.VITE_HTML_URL}`
})


export const requestHtml = (name: any) => {
  let url = data.find((element) => element.name === name).url
  return getHtml.get<any, any>(url)
}