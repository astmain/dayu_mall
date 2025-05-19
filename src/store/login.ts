import { create } from "zustand"

interface LoginStore {
  currentComponent: string
  setCurrentComponent: (name: string) => void
  // const [isPwdLogin, setIsPwdLogin] = useState(true)
  // 弹框的密码登录变量
  // isPwdLogin: number
  // setIsPwdLogin: (name: number) => void

  // 点击登录/注册的变量
  isClickPwdreg: number
  setIsLoginPwdreg: (name: number) => void

  // 新增一个变量微信code
  weChatCode: null | string
  setIsWeChatCode: (name: null | string) => void

  // 新增一个变量用来控制loading加载
  loadingLqh: boolean
  setLoadingLqh: (loading: boolean) => void

  // 新增一个变量用来控制tip标题
  tipTitleLqh: string
  setTipTitleLqh: (title: string) => void

  loading: boolean
  setLoading: (loading: boolean) => void
}
export const useLoginStore = create<LoginStore>((set) => ({
  currentComponent: "login",
  setCurrentComponent: (name) => set(() => ({ currentComponent: name })),
  // // 弹框的密码登录变量
  // isPwdLogin: 0,
  // setIsPwdLogin: (num) => set(() => ({ isPwdLogin: num })),

  // 点击登录/注册的变量
  isClickPwdreg: 0,
  setIsLoginPwdreg: (numPwdreg) => set(() => ({ isClickPwdreg: numPwdreg })),
  // 新增一个变量微信code
  weChatCode: null,
  setIsWeChatCode: (weChatCodeNum) => set(() => ({ weChatCode: weChatCodeNum })),

  // 新增一个变量用来控制loading加载效果
  loadingLqh: false,
  setLoadingLqh: (loading) => set(() => ({ loadingLqh: loading })),

  // 新增一个变量用来控制加载标题
  tipTitleLqh: "加载中...",
  setTipTitleLqh: (tipTitle) => set(() => ({ tipTitleLqh: tipTitle })),
  loading: false,
  setLoading: (loading) => set(() => ({ loading: loading })),
}))

export const useLoginStoreWithout = () => {
  return useLoginStore.getState()
}
