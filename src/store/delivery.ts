import { create } from "zustand"

interface DeliveryStore {
  columns: ColumnsType[]
  currentId: number
}

interface ColumnsType {
  title: string
  dataIndex: string
  key: string
  flex: number
}
const columns = [
  {
    title: "快递",
    dataIndex: "delivery",
    key: "delivery",
    flex: 1,
  },
  {
    title: "运费 (估)",
    dataIndex: "freight",
    key: "freight",
    flex: 1,
  },
  {
    title: "时效",
    dataIndex: "timeliness",
    key: "timeliness",
    flex: 1,
  },
]

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  currentId: -6,
  columns,
  setCurrentId: (id: number) => set(() => ({ currentId: id })),
}))
