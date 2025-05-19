import { request } from "@/network/axios"

import { AddHistory2CartDataRes, BaseRes, DeleteHistoryDataRes, GetHistoryListRes } from "./type"

const PREFIX = "drawing_upload_history/"

enum URL {
  getHistoryListApi = PREFIX + "list",
  addHistory2CartApi = PREFIX + "cart",
  deleteHistoryApi = PREFIX + "delete_multi",
}

export const addHistory2CartApi = (data: { id: number[] }) =>
  request.post<BaseRes<AddHistory2CartDataRes>>(URL.addHistory2CartApi, data)

export const deleteHistoryApi = (data: { ids: number[] }) =>
  request.post<BaseRes<DeleteHistoryDataRes>>(URL.deleteHistoryApi, data)

export const getHistoryListApi = () => request.get<BaseRes<GetHistoryListRes[]>>(URL.getHistoryListApi)

// 获取购物车列表
export const getCartListApi = () => request.get<BaseRes<any[]>>("cart/list")

// 删除购物车
export const deleteCartApi = (data: { ids: number[] }) => request.post<BaseRes<any[]>>("cart/delete_multi", data)

// 获取产品分类列表  材料加产品
export const getProductCategoryListApi = () => request.get<BaseRes<any[]>>("product_category/list")

// 购物车 当前产品  修改规格
export const updateCartProductApi = (data: { id: number; code: string; name: string; category_id: number }) =>
  request.post<BaseRes<any[]>>("product_material/update", data)
