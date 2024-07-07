//引入express
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
//配置端口号
const POST = 8086
// 创建一个app服务器实例
const app = express()

//配置静态资源
app.use(express.static(__dirname + '/dist'))

app.use(
  createProxyMiddleware({
    target: `http://localhost:${POST}`,
    changeOrigin: true,
    pathFilter: '/myblog',
    //路径重写
    pathRewrite: {'^/myblog' : ''}
  })
);

//绑定端口监听
app.listen(POST,() => {
  console.log(`本地服务器启动！http://localhost:${POST}`);
})