import { create } from "zustand"

interface SelectDataType {
  material: any[]
  grinding: any[]
  ceilHeight: any[]
  nuts: any[]
  braces: any[]
}

interface grindingType {
  label: string
  rate: number
}
interface PrintStore {
  percentage: number
  changePercentage: (percentage: number) => void
  selectData: SelectDataType
  isEditModalOpen: boolean
  openEditModal: () => void
  closeEditModal: () => void
  currentMaterialType: string
  setCurrentMaterialType: (type: string) => void
  currentList: any
  setCurrentList: () => void
  currentGrinding: grindingType
  setCurrentGrinding: (item: grindingType) => void
  submit: any
  // setSpecificationsModalVisible: (visible: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCurrentList = (_type: string, _list: any[]): any => {
  // console.log("TCL: type", type, list)
  // return list.filter((item) => item.type === type)
  return [
    {
      material: "9600",
      price: "50.00",
      attributes: "热变形温度: 59°C",
      color: "哑光白",
    },
    {
      material: "LEDO 6060",
      price: "33.00",
      attributes: "热变形温度: 59°C",
      color: "淡黄色",
    },
  ]
  // return []
}
export const usePrintStore = create<PrintStore>((set) => ({
  percentage: 0,
  changePercentage: (percentage) => set(() => ({ percentage: percentage })),
  selectData: { material: [], grinding: [], ceilHeight: [], nuts: [], braces: [] },
  isEditModalOpen: false,
  openEditModal: () => set(() => ({ isEditModalOpen: true })),
  closeEditModal: () => set(() => ({ isEditModalOpen: false })),
  currentMaterialType: "线材",
  setCurrentMaterialType: (type: string) => set(() => ({ currentMaterialType: type })),
  currentList: [],
  setCurrentList: () =>
    set((state) => ({ currentList: getCurrentList(state.currentMaterialType, state.selectData.material) })),
  currentGrinding: {
    label: "不需要",
    rate: 1,
  },
  setCurrentGrinding: (item: grindingType) => set(() => ({ currentGrinding: item })),
  submit: {
    specificationsModalVisible: false,
    setSpecificationsModalVisible: (visible: boolean) =>
      set((state) => ({ submit: { ...state.submit, specificationsModalVisible: visible } })),
  },
}))

// export const setFirst = (newname: string) => useThreeStore.setState({ firstName: newname })
