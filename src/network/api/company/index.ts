import { request } from "@/network/axios"

import { BaseCompanyData, BaseRes, CompanyDataRes, DeleteCompanyData } from "./type"

const PREFIX = "user/"

enum URL {
  GetCompanyApi = PREFIX + "company",
  UpdateCompanyApi = PREFIX + "change_company",
  DeleteCompanyApi = PREFIX + "delete",
}

export const GetCompanyApi = (data: { id: number }) => request.post<BaseRes<CompanyDataRes>>(URL.GetCompanyApi, data)

export const UpdateCompanyApi = (data: BaseCompanyData) =>
  request.post<BaseRes<BaseCompanyData>>(URL.UpdateCompanyApi, data)

export const DeleteCompanyApi = (data: DeleteCompanyData) =>
  request.post<BaseRes<{ id: number }>>(URL.DeleteCompanyApi, data)
