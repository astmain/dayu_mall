import { create } from "zustand"
interface ShoppingcartStore {
  isShoppingcart: number
  setIsShopoingCart: (isShoppingcart: number) => void
}

export const useShoppingcartStore = create<ShoppingcartStore>((set) => ({
  isShoppingcart: 1,
  setIsShopoingCart: (num) => set(() => ({ isShoppingcart: num })),
}))

// 定义定义3d打印购物车项的类型
interface CartItem {
  id: number
  type: string
  title: string
  chicun: string
  tiji: string
  shuangmianji: string
  zhongliang: string
  price: number
  cailiao: string
  color: string
  handle: string
  time: string
  num: number
  yujifuoriqi: string
  check: boolean //商品是否选中
  imgSrc: string

  // //表头全选功能
  // toggleAll: (index: string) => void
}

// 定义 Store 的类型
interface ShoppingCartStore {
  cart: CartItem[] // 购物车数据
  selectAll: boolean // 是否全选
  totalPrice: number // 总价
  setFakeData: () => void // 设置假数据
  toggleSelectAll: () => void // 切换全选状态
  toggleSelectAllFalse: () => void // 切换全不选状态
  toggleSingleSelect: (e: any, index: number) => void // 切换单个商品的选中状态
  toggleNumberChange: (value: number, index: number) => void // 切换单个商品的数量
  // getTotalQuantity: () => number; // 计算商品总数量
  getTotalPrice: () => number // 计算商品总价格
}

export const useShoppingCartTableStore = create<ShoppingCartStore>((set, get) => ({
  cart: [
    {
      type: "3D",
      id: 1,
      title: "hollow_of_越野车 5_1.stl ",
      chicun: "尺寸：15.00cm*15.00cm",
      tiji: "体积：11.46cm³ ",
      shuangmianji: "表面积：114.00cm² ",
      zhongliang: "重量：50.02g",
      price: 88.0,
      cailiao: "9600",
      color: "哑光白",
      handle: "打磨-粗磨",
      time: "48h",
      num: 2,
      yujifuoriqi: "2024-09-13 20:00:00",
      check: false,
      imgSrc: "",
    },
    {
      type: "3D",
      id: 2,
      title: "hollow_of_越野车 5_1.stl ",
      chicun: "尺寸：15.00cm*15.00cm",
      tiji: "体积：11.46cm³ ",
      shuangmianji: "表面积：114.00cm² ",
      zhongliang: "重量：50.02g",
      price: 88.0,
      cailiao: "9600",
      color: "哑光白",
      handle: "打磨-粗磨",
      time: "48h",
      num: 3,
      yujifuoriqi: "2024-09-13 20:00:00",
      check: false,
      imgSrc: "",
    },
  ], // 初始购物车有数据
  selectAll: false, // 初始全选为 false
  totalPrice: 0, // 初始总价为 0
  setFakeData: () =>
    set({
      cart: [
        {
          type: "3D",
          id: 1,
          title: "hollow_of_越野车 5_1.stl ",
          chicun: "尺寸：15.00cm*15.00cm",
          tiji: "体积：11.46cm³ ",
          shuangmianji: "表面积：114.00cm² ",
          zhongliang: "重量：50.02g",
          price: 88.0,
          cailiao: "9600",
          color: "哑光白",
          handle: "打磨-粗磨",
          time: "48h",
          num: 2,
          yujifuoriqi: "2024-09-13 20:00:00",
          check: false,
          imgSrc: "",
        },
        {
          type: "3D",
          id: 2,
          title: "hollow_of_越野车 5_1.stl ",
          chicun: "尺寸：15.00cm*15.00cm",
          tiji: "体积：11.46cm³ ",
          shuangmianji: "表面积：114.00cm² ",
          zhongliang: "重量：50.02g",
          price: 88.0,
          cailiao: "9600",
          color: "哑光白",
          handle: "打磨-粗磨",
          time: "48h",
          num: 3,
          yujifuoriqi: "2024-09-13 20:00:00",
          check: false,
          imgSrc: "",
        },
      ], // 初始购
    }),
  // 全选为真的时候打钩-选中
  toggleSelectAll: () => {
    set((state) => ({
      cart: state.cart.map((item) => {
        item.check = true
        return item
      }),
    }))
  },
  // 全选为false的时候-不选中
  toggleSelectAllFalse: () => {
    set((state) => ({
      cart: state.cart.map((item) => {
        item.check = false
        return item
      }),
    }))
  },
  // 切换商品单个选择状态
  toggleSingleSelect: (e: any, index: number) => {
    set((state) => ({
      cart: state.cart.map((item, index1) => (index1 === index ? { ...item, check: !e } : item)),
    }))
  },

  // 计算数量
  toggleNumberChange: (value: number, index: number) => {
    set((state) => ({
      cart: state.cart.map((item, indey) => {
        item.price * item.num

        return index == indey ? { ...item, num: value } : item
      }),
    }))
  },

  // 计算价格
  getTotalPrice: () => {
    return get().cart.reduce((pre, cur) => {
      return pre + (cur.check ? cur.price * cur.num : 0)
    }, 0)
  },
}))
