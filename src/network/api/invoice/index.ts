import { request } from "@/network/axios"

import { BaseInvoiceData, BaseRes, DeleteInvoiceData, SetDefaultInvoiceData } from "./type"

const PREFIX = "user_invoice/"

enum URL {
  createInvoiceApi = PREFIX + "create",
  getInvoiceApi = PREFIX + "list",
  updateInvoiceApi = PREFIX + "update",
  deleteInvoiceApi = PREFIX + "delete",
  setDefaultInvoiceApi = PREFIX + "default",
}

export const createInvoiceApi = (data: BaseInvoiceData) =>
  request.post<BaseRes<BaseInvoiceData>>(URL.createInvoiceApi, data)

export const getInvoiceApi = () => request.get<BaseRes<BaseInvoiceData[]>>(URL.getInvoiceApi)

export const updateInvoiceApi = (data: BaseInvoiceData) =>
  request.post<BaseRes<BaseInvoiceData>>(URL.updateInvoiceApi, data)

export const deleteInvoiceApi = (data: DeleteInvoiceData) =>
  request.post<BaseRes<{ id: number }>>(URL.deleteInvoiceApi, data)

export const setDefaultInvoiceApi = (data: SetDefaultInvoiceData) =>
  request.post<BaseRes<{ id: number }>>(URL.setDefaultInvoiceApi, data)
