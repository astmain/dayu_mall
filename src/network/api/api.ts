import { request } from "@/network/axios"

import { getCanvasData, getOrderParams, orderDataParams } from "./api-params-moudle"
import { BaseRes, GetAllOrderModel, GetCityTotal } from "./api-res-model"

/** 这里枚举定义所有接口 */
enum APIS {
  GET_CITY_TOTAL_NUMBER = "/xxxx/xxxx/xxxxx",
}

/** 一个示例 */
export const getCityTotalNumber = (params: getCanvasData) =>
  request.get<GetCityTotal>(APIS.GET_CITY_TOTAL_NUMBER, params)

export const getAllOrder = (params: getOrderParams) =>
  request.get<BaseRes<GetAllOrderModel>>(APIS.GET_CITY_TOTAL_NUMBER, params)

export const getOrderData = (params: orderDataParams) =>
  request.get<BaseRes<GetAllOrderModel[]>>(APIS.GET_CITY_TOTAL_NUMBER, params)
