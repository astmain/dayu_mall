import { create } from "zustand"

interface RegisterStore {
  // 点击注册的变量
  isClickregister: number
  setIsisClickregister: (name: number) => void

  // 手机找回变量
  isfind: number
  setIsfind: (name: number) => void
}
export const useRegisterStore = create<RegisterStore>((set) => ({
  // // 点击注册的变量
  isClickregister: 0,
  setIsisClickregister: (numPwdreg) => set(() => ({ isClickregister: numPwdreg })),

  isfind: 0,
  setIsfind: (numIsFindPwd) => set(() => ({ isfind: numIsFindPwd })),
}))

// export const useIsfindStore = create<RegisterStore>((set) => ({
//   // // 点击注册的变量
//   isfind: 0,
//   setIsfind: (numFindreg) => set(() => ({ isfind: numFindreg })),
// }))
