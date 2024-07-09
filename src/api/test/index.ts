//测试EasyMock
import request from "../../utils/request";

enum API {
  MOCK = "mock",
  PICTURE = 'picture'
}

export const reqMock = () => request.get<any,any>(API.MOCK) 
export const reqPicture = () => request.get<any,any>(API.PICTURE)