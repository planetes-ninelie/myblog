//测试EasyMock
import request from "../../utils/request";

enum API {
  MOCK = "mock"
}

export const reqMock = () => request.get<any,any>(API.MOCK) 