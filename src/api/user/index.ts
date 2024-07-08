//引入封装后axios的实例
import request from '@/utils/request'
//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
//登录方法
export const reqLogin = (data: any) => request.post(API.LOGIN_URL, data)
//获取用户信息方法
export const reqUserInfo = () => request.get(API.USERINFO_URL)
