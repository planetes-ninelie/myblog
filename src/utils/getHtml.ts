//引入axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

export const data = [
  {
    type: '数据结构与算法',
    title: '数据结构与算法学习笔记',
    url: '/%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md'
  },
  {
    type: 'index',
    title: '遇到的问题',
    url: '/%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98.md'
  },
  {
    type: 'JavaScript',
    title: 'JavaScript',
    url: '/JavaScript.md'
  },
  {
    type: 'AJAX',
    title: 'AJAX',
    url: '/AJAX.md'
  },
  {
    type: 'index',
    title: 'HTML+CSS',
    url: '/HTML%2BCSS.md'
  },
  {
    type: '项目部署',
    title: 'github搭建图床',
    url: '/github%E6%90%AD%E5%BB%BA%E5%9B%BE%E5%BA%8A.md'
  },
  {
    type: '项目部署',
    title: '前端部署项目',
    url: '/%E5%89%8D%E7%AB%AF%E9%83%A8%E7%BD%B2%E9%A1%B9%E7%9B%AE.md'
  },
  {
    type: '项目部署',
    title: '如何将vue3打包后的静态文件部署到github pages呢？',
    url: '/%E5%A6%82%E4%BD%95%E5%B0%86vue3%E6%89%93%E5%8C%85%E5%90%8E%E7%9A%84%E9%9D%99%E6%80%81%E6%96%87%E4%BB%B6%E9%83%A8%E7%BD%B2%E5%88%B0github%20pages%E5%91%A2%EF%BC%9F.md'
  },

  {
    type: '面经',
    title: '题库',
    url: '/%E9%A2%98%E5%BA%93.md'
  },

  {
    type: '计算机网络',
    title: '图解Http',
    url: '/%E5%9B%BE%E8%A7%A3Http.md'
  },

  {
    type: '工作小结',
    title: '7.19-7.24',
    url: '/7.19-7.24.md'
  },
  {
    type: '工作小结',
    title: '7.25 -7.27',
    url: '/7.25 -7.27.md'
  },
  {
    type: 'vue',
    title: 'vue',
    url: '/vue.md'
  },
  {
    type: 'vue',
    title: 'vue3项目搭建',
    url: 'vue3%E9%A1%B9%E7%9B%AE%E6%90%AD%E5%BB%BA.md'
  },
  {
    type: 'vue',
    title: 'vue3项目实战出现的问题汇总',
    url: '/vue3%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98%E5%87%BA%E7%8E%B0%E7%9A%84%E9%97%AE%E9%A2%98%E6%B1%87%E6%80%BB.md'
  },
  {
    type: 'vue',
    title: 'VueREADME',
    url: '/VueREADME.md'
  },
  {
    type: 'vue',
    title: '由vue-router联想到的问题',
    url: '/%E7%94%B1vue-router%E8%81%94%E6%83%B3%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98.md'
  },

]

//利用axios创建getHtml实例
let getHtml = axios.create({
  baseURL: `${import.meta.env.VITE_HTML_URL}`,
  timeout: 5000
})

export const requestHtml = (name: any) => {
  let url = data.find((element) => element.title === name).url
  return getHtml.get<any, any>(url)
}

export const requestMd = (name: any) => {
  let url = data.find((element) => element.title === name).url
  return getHtml.get<any, any>(url)
}