import { create } from "zustand"

interface MerchantcenterStore {
  isMerchant: number
  setIsMerchant: (isMerchantName: number) => void
}

export const useMerchantcenterStoreStore = create<MerchantcenterStore>((set) => ({
  isMerchant: 0,
  setIsMerchant: (num) => set(() => ({ isMerchant: num })),
}))

// 我上传的作品--切换变量数据
interface uploadworkStore {
  isUploadworks: number
  setIsUploadworks: (isisUploadworksName: number) => void
}

export const useuploadworkStore = create<uploadworkStore>((set) => ({
  isUploadworks: 0,
  setIsUploadworks: (num) => set(() => ({ isUploadworks: num })),
}))

// 交易订单--切换变量数据
interface TradingorderStore {
  isTradingorder: number
  setIsTradingorder: (isTradingorderName: number) => void
}

export const useTradingorderStore = create<TradingorderStore>((set) => ({
  isTradingorder: 0,
  setIsTradingorder: (num) => set(() => ({ isTradingorder: num })),
}))
