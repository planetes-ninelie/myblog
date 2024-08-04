//学校管理员页面EasyMock
import request from "@/utils/request";

enum API {
  //分页查询学校管理员API
  PAGEADMINSCHOOL = 'frontEnd/testPages/schoolAdmin/pageAdminSchool'
}

//分页查询学校管理员
export const reqPageSchoolAdmin = (page, limit, userName, phone) =>
  request.get<any, any>(API.PAGEADMINSCHOOL + `/?page=${page}/?limit=${limit}/?userName=${userName}/?phone=${phone}`)