export interface BaseCompanyData {
  id: number
  tax_no: string
  bank_no: string
  bank_name: string
  company_name: string
  address: string
  phone: string
  code: string
}

export interface DeleteCompanyData {
  id: number
}

export interface BaseRes<T> {
  data: T
  code: number
  message: string
}

export interface CompanyDataRes {
  id: number
  tax_no: string
  bank_no: string
  bank_name: string
  company_name: string
  address: string
}
