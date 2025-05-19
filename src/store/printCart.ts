import { create } from "zustand"

import { getCartListApi } from "@/network/api/print"

interface PrintCartItem {
  id: number
  name: string
  file_name: string
  file_url: string
  // imgSrc: string
  material_name: string
  order_type: string
  amount: number
  price: number
  qty: number
  size: string
  weight: string
  floor_height: string
  isChecked?: boolean

  // materialScience: string
  // viewPicture: string
  // modifySpecifications: string
  // isChecked: boolean
  // paint: {
  //   c: { pantone: string; hex: string }[]
  //   u: { pantone: string; hex: string }[]
  // }
}

interface CurrentItemType extends PrintCartItem {
  material: string
  attributes: string
  paint: {
    c: { pantone: string; hex: string }[]
    u: { pantone: string; hex: string }[]
  }
}

interface PrintCartStore {
  printCart: PrintCartItem[]
  initPrintCart: () => Promise<void>
  setPrintCart: (printCart: PrintCartItem[]) => void
  deliveryInfo: DeliveryInfoType
  setDeliveryInfo: (deliveryInfo: DeliveryInfoType) => void
  getisCheckededPrintCart: () => PrintCartItem[]
  calculateTotalPrice: () => number
  updatePrintCart: (id: number, printCart: PrintCartItem) => void
  deliveryList: DeliveryInfoType[]
  setDeliveryList: (deliveryList: DeliveryInfoType[]) => void
  isAgree: boolean
  setIsAgree: (isAgree: boolean) => void
  isEditModalOpen: boolean
  openEditModal: () => void
  setOpenEditModal: (openEditModal: boolean) => void
  currentItem: CurrentItemType
  setCurrentItem: (currentItem: CurrentItemType) => void
  updateCurrentItem: (currentItem: CurrentItemType) => void
}

interface DeliveryInfoType {
  type: string
  price: number
  label: string
}

const deliveryList: DeliveryInfoType[] = [
  {
    label: "7个工作日",
    type: "标准",
    price: 88.88,
  },
  {
    label: "12个工作日",
    type: "经济",
    price: 50.0,
  },
  {
    label: "3个工作日",
    type: "加急",
    price: 288.0,
  },
  {
    label: "2个工作日",
    type: "专机加急",
    price: 588.0,
  },
]
export const usePrintCartStore = create<PrintCartStore>((set, get) => ({
  isAgree: false,
  setIsAgree: (isAgree: boolean) => set({ isAgree }),
  printCart: [] as PrintCartItem[],
  initPrintCart: async () => {
    const res = await getCartListApi()
    set({ printCart: res?.data || [] })
  },
  setPrintCart: (printCart: PrintCartItem[]) => set({ printCart }),
  addPrintCart: (printCart: PrintCartItem[]) => set((state) => ({ printCart: [...state.printCart, ...printCart] })),
  removePrintCart: (id: number[]) =>
    set((state) => ({ printCart: state.printCart.filter((item) => !id.includes(item.id)) })),
  updatePrintCart: (id: number, printCart: PrintCartItem) =>
    set((state) => ({ printCart: state.printCart.map((item) => (item.id === id ? printCart : item)) })),
  deliveryList,
  setDeliveryList: (deliveryList: DeliveryInfoType[]) => set({ deliveryList }),
  deliveryInfo: deliveryList[0],
  setDeliveryInfo: (deliveryInfo: DeliveryInfoType) => set({ deliveryInfo }),
  getisCheckededPrintCart: () => get().printCart.filter((item) => item?.isChecked),
  calculateTotalPrice: () => {
    const itemPrice = get()
      .getisCheckededPrintCart()
      .reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0)
    const totalPrice = itemPrice + Number(get().deliveryInfo.price)
    return totalPrice
  },
  isEditModalOpen: false,
  openEditModal: () => set({ isEditModalOpen: true }),
  setOpenEditModal: (openEditModal: boolean) => set({ isEditModalOpen: openEditModal }),
  currentItem: {} as CurrentItemType,
  setCurrentItem: (currentItem: CurrentItemType) => set({ currentItem }),
  updateCurrentItem: (currentItem: CurrentItemType) =>
    set({ currentItem: { ...get().currentItem, ...JSON.parse(JSON.stringify(currentItem)) } }),
}))
