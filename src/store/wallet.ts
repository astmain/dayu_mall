import { create } from "zustand"

interface WalletStore {
  isMoney: number
  setIsisMoney: (walletName: number) => void
}

export const useWalletStore = create<WalletStore>((set) => ({
  isMoney: 0,
  setIsisMoney: (numl) => set(() => ({ isMoney: numl })),
}))
