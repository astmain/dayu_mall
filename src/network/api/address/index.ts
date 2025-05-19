import { request } from "@/network/axios"

import {
  BaseRes,
  CreateAddressData,
  CreateAddressRes,
  DeleteAddressData,
  DeleteAddressRes,
  GetAddressListRes,
  SetDefaultAddressData,
  UpdateAddressData,
  UpdateAddressRes,
} from "./type"

const PREFIX = "user_address/"

enum URL {
  createAddressApi = PREFIX + "create",
  getAddressApi = PREFIX + "list",
  updateAddressApi = PREFIX + "update",
  deleteAddressApi = PREFIX + "delete",
  getAddressListApi = "region/list",
  setDefaultAddressApi = PREFIX + "default",
}

export const createAddressApi = (data: CreateAddressData) =>
  request.post<BaseRes<CreateAddressRes>>(URL.createAddressApi, data)

export const getAddressApi = () => request.get<BaseRes<CreateAddressRes[]>>(URL.getAddressApi)

export const updateAddressApi = (data: UpdateAddressData) =>
  request.post<BaseRes<UpdateAddressRes>>(URL.updateAddressApi, data)

export const deleteAddressApi = (data: DeleteAddressData) =>
  request.post<BaseRes<DeleteAddressRes>>(URL.deleteAddressApi, data)

export const getAddressListApi = () => request.get<BaseRes<GetAddressListRes[]>>(URL.getAddressListApi)

export const setDefaultAddressApi = (data: SetDefaultAddressData) =>
  request.post<BaseRes<UpdateAddressRes>>(URL.setDefaultAddressApi, data)
