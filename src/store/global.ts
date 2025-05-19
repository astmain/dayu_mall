import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GlobalStore {
  itemIndex: number
  changeIndex: (index: number) => void
  cartCount: number
  changeCartCount: (count: number) => void
  isLogin: boolean
  isLoading: boolean
  toggleLoading: () => void
}
export const useGlobalStore = create<GlobalStore>((set) => ({
  itemIndex: -1,
  changeIndex: (index) => set(() => ({ itemIndex: index >= 0 ? index : -1 })),
  cartCount: 8,
  changeCartCount: (count) => set(() => ({ cartCount: count })),
  isLogin: false,
  changeLogin: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
  isLoading: false,
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
}))

interface LanguageStore {
  currentLanguage: string
  changeLanguage: (lang: string) => void
}
export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLanguage: "zh",
      changeLanguage: (lang: string) => set(() => ({ currentLanguage: lang })),
    }),
    {
      name: "languageStore",
    },
  ),
)

interface NavigationStore {
  currentNavigation: string
  changeNavigation: (nav: string) => void
}
export const useNavigationStore = create<NavigationStore>()(
  persist(
    (set) => ({
      currentNavigation: "home",
      changeNavigation: (nav: string) => set(() => ({ currentNavigation: nav })),
    }),
    {
      name: "navigationStore",
    },
  ),
)
