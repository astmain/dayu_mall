import { create } from "zustand"

interface PersonalcenterStore {
  isInformation: number
  setIsInformation: (isInformationName: number) => void
}

export const usePersonalcenterStore = create<PersonalcenterStore>((set) => ({
  isInformation: 0,
  setIsInformation: (num) => set(() => ({ isInformation: num })),
}))
