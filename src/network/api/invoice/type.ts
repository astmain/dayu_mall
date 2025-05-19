export interface BaseInvoiceData {
  id: number
  invoice_type: string
  phone: string
  code: string
  address: string
  tax_no: string
  bank_no: string
  bank_name?: string
  name?: string
  email?: string
  is_default?: boolean
}

export interface DeleteInvoiceData {
  id: number
}

export interface BaseRes<T> {
  data: T
  code: number
  message: string
}

export interface SetDefaultInvoiceData {
  id: number
  is_default: boolean
}
