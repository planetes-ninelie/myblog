import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
//引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      //配置svg
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: command === 'serve',
      }),
    ],
    //修改公共路径
    // base: `${env.VITE_APP_BASE_PATH}/`,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    // server: {
    //   proxy: {
    //     [env.VITE_APP_BASE_API]: {
    //       //获取数据的服务器地址设置
    //       target: env.VITE_SERVE,
    //       //需要代理跨域
    //       changeOrigin: true,
    //       //路径重写
    //       //rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   },
    // },

    chainWebpack: (config) => {
      config.module
        .rule("md")
        .test(/\.md/)
        .use("vue-loader")
        .loader("vue-loader")
        .end()
        .use("vue-markdown-loader")
        .loader("vue-markdown-loader/lib/markdown-compiler")
        .options({
          raw: true,
        });
    }
  }
})
