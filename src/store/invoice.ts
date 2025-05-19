import { create } from "zustand"

interface InvoiceFormData {
  id?: number
  taxID?: string
  name?: string
  entity?: string
  invoice_type?: string
}
interface InvoiceStore {
  invoiceModalVisible: boolean
  setInvoiceModalVisible: (visible: boolean) => void
  editInvoiceModalVisible: boolean
  setEditInvoiceModalVisible: (visible: boolean) => void
  editFormData: any
  updateEditFormData: (data?: any) => void
  isUpdate: boolean
  setIsUpdate: (isUpdate: boolean) => void
  invoiceFormData: InvoiceFormData
  updateInvoiceFormData: (data: InvoiceFormData) => void
}
const initialStatus = { invoice_type: "person", prefix: "86" }
export const useInvoiceStore = create<InvoiceStore>((set) => ({
  // 发票入口弹窗
  invoiceModalVisible: false,
  setInvoiceModalVisible: (visible: boolean) => set(() => ({ invoiceModalVisible: visible })),
  // 发票信息 表单
  invoiceFormData: {},
  updateInvoiceFormData: (data: Partial<InvoiceFormData>) => set(() => ({ invoiceFormData: data })),
  // 发票编辑弹窗及表单
  editInvoiceModalVisible: false,
  setEditInvoiceModalVisible: (visible: boolean) => set(() => ({ editInvoiceModalVisible: visible })),
  editFormData: {},
  isUpdate: false,
  setIsUpdate: (isUpdate: boolean) => set(() => ({ isUpdate })),
  updateEditFormData: (data?: any) => {
    if (data?.id) {
      set(() => ({ editFormData: { ...initialStatus, ...data }, isUpdate: true }))
    } else {
      set(() => ({ editFormData: initialStatus, isUpdate: false }))
    }
    set(() => ({ editInvoiceModalVisible: true }))
  },
}))
