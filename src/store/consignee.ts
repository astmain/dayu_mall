import { create } from "zustand"

import { CreateAddressData, UpdateAddressData } from "@/network/api/address/type"

type FormData = CreateAddressData | UpdateAddressData
interface ConsigneeStore {
  isEditModalOpen: boolean
  openEditModal: (data?: any) => void
  closeEditModal: () => void
  isManageModalOpen: boolean
  openManageModal: (currentId?: number) => void
  closeManageModal: () => void
  currentId: number
  formData: FormData
  setFormData: (data: Partial<FormData>) => void
  isUpdate: boolean
  setIsUpdate: (isUpdate: boolean) => void
}

const initialStatus: CreateAddressData = {
  address_type: "company",
  name: "",
  phone: "",
  street: "",
  region: [],
  region_id: 0,
}

export const useConsigneeStore = create<ConsigneeStore>((set) => ({
  isEditModalOpen: false,
  isUpdate: false,
  setIsUpdate: (isUpdate: boolean) => set(() => ({ isUpdate })),
  openEditModal: (data?: any) => set(() => ({ isEditModalOpen: true, formData: { ...initialStatus, ...data } })),
  closeEditModal: () => set(() => ({ isEditModalOpen: false, isUpdate: false, formData: initialStatus })),
  isManageModalOpen: false,
  openManageModal: (currentId?: number) => set(() => ({ isManageModalOpen: true, currentId: currentId || -6 })),
  closeManageModal: () => set(() => ({ isManageModalOpen: false, currentId: -6 })),
  currentId: -6,
  formData: initialStatus,
  setFormData: (data: any) => set((state) => ({ formData: { ...state.formData, ...data } })),
  // Other state variables and functions can be added here as needed
}))
