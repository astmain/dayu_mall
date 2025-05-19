import { create } from "zustand"

interface PrintProcessStore {
  grindingOption: GrindingOptionType[]
  paintOption: PaintOptionType[]
  nutsOption: NutsOptionType[]
  ceilHeightOption: CeilHeightOptionType[]
}

export interface GrindingOptionType {
  label: string
  value: string
  priceRate: number
}

export interface PaintOptionType {
  label: string
  value: string
  priceRate: number
}

export interface NutsOptionType {
  label: string
  value: string
  priceRate: number
}

export interface CeilHeightOptionType {
  label: string
  value: string
  priceRate: number
}

export const usePrintProcessStore = create<PrintProcessStore>(() => ({
  grindingOption: [
    { label: "不需要", value: "no", priceRate: 1 },
    { label: "粗磨", value: "cu", priceRate: 1.5 },
    { label: "精磨", value: "jing", priceRate: 2 },
  ],
  paintOption: [
    { label: "不需要", value: "no", priceRate: 1 },
    { label: "需要", value: "qi", priceRate: 1 },
  ],
  nutsOption: [
    { label: "不需要", value: "no", priceRate: 1 },
    { label: "需要", value: "nut", priceRate: 1 },
  ],
  // bracesOption: [
  //     { label: "不需要", value: "no", priceRate: 1 },
  //     { label: "喷漆", value: "qi", priceRate: 1 },
  // ],
  ceilHeightOption: [
    { label: "0.05mm", value: "0.05", priceRate: 1 },
    { label: "0.1mm", value: "0.1", priceRate: 2 },
  ],
}))
