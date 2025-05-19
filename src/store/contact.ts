import { create } from "zustand"

interface ColumnsType {
  title: string
  dataIndex: string
  key: string
  flex: number
}

interface ContactStore {
  isEditModalOpen: boolean
  openEditModal: (data?: any) => void
  closeEditModal: () => void
  isManageModalOpen: boolean
  openManageModal: (currentId?: number) => void
  closeManageModal: () => void
  currentId: number
  formData: any
  setFormData: (data: any) => void
  columns1: ColumnsType[]
  columns2: ColumnsType[]
  formColumns: ColumnsType[]
}

// const initialStatus = { region: [], tag: { label: "公司", value: "company" } }

const formColumns = [
  {
    title: "下单联系人",
    dataIndex: "contact",
    key: "contact",
    flex: 1,
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    key: "phone",
    flex: 1,
  },
  {
    title: "技术联系人",
    dataIndex: "technician",
    key: "technician",
    flex: 1,
  },
  {
    title: "联系电话",
    dataIndex: "tecphone",
    key: "tecphone",
    flex: 1,
  },
]

export const useContactStore = create<ContactStore>((set) => ({
  isEditModalOpen: false,
  openEditModal: (data?: any) => set(() => ({ isEditModalOpen: true, formData: data || {} })),
  closeEditModal: () => set(() => ({ isEditModalOpen: false, formData: {} })),
  isManageModalOpen: false,
  openManageModal: (currentId?: number) => set(() => ({ isManageModalOpen: true, currentId: currentId || -6 })),
  closeManageModal: () => set(() => ({ isManageModalOpen: false, currentId: -6 })),
  currentId: -6,
  formData: {},
  setFormData: (data: any) => set((state) => ({ formData: { ...state.formData, ...data } })),
  columns1: [
    ...formColumns,
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      flex: 1,
    },
  ],
  columns2: [
    ...formColumns,
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      flex: 2,
    },
  ],
  formColumns,
  // Other state variables and functions can be added here as needed
}))

export interface DataListType {
  contact: string
  phone: string
  technician: string
  tecphone: string
  operate?: React.ReactNode
}
