import { create } from "zustand"

import { getAllOrder, getOrderData } from "@/network/api/api"
import { OrderStatusType, OrderTypeType } from "@/views/order/common"
interface UserOrderStore {
  data: any
  loading: boolean
  isModalOpenTk: boolean
  isViewLogistics: boolean
  error: string | null
  orderData: any[]
  currentType: OrderTypeType
  orderStatusMap: {
    [k in OrderTypeType]: OrderStatusType
  } // 记录每个订单类型对应的状态
  expendedNodes: Record<string, boolean> // 节点展开状态（key 为节点 id，value 为展开状态）
  orderPaginationMap: {
    [k in OrderTypeType]: { currentPage: number; pageSize: number; totalItems: number }
  } // 记录每个订单类型对应的分页信息
  // Actions
  toggleExpand: (index: string) => void // 切换节点的展开/收起状态
  fetchOrders: (type: OrderTypeType, status: OrderStatusType) => Promise<void>
  setOrderType: (type: OrderTypeType) => void
  setOrderStatus: (status: OrderStatusType) => void
  fetchData: () => Promise<void>
  refetchData: () => Promise<void> // 重新获取数据，清空旧数据并重新加载数据

  setIsModalOpenTk: (type: boolean) => void

  setIsViewLogistics: (type: boolean) => void
}

const paginationInitial = { currentPage: 1, pageSize: 10, totalItems: 0 }
export const useUserOrderStore = create<UserOrderStore>((set, get) => ({
  data: null,
  loading: false,
  isModalOpenTk: false,
  isViewLogistics: false,
  error: null,
  orderData: [],
  currentType: "model",
  // 记录每个订单类型对应的状态
  orderStatusMap: {
    model: "all",
    print: "all",
    scan: "all",
    design: "all",
    cnc: "all",
    handboard: "all",
  },
  expendedNodes: {
    // 节点展开状态
  },
  orderPaginationMap: {
    model: paginationInitial,
    print: paginationInitial,
    scan: paginationInitial,
    design: paginationInitial,
    cnc: paginationInitial,
    handboard: paginationInitial,
  },
  // 切换节点的展开/收起状态
  toggleExpand: (index) => {
    set((state) => ({
      expendedNodes: {
        ...state.expendedNodes,
        [index]: !state.expendedNodes[index], // 切换当前节点状态
      },
    }))
  },
  setCurrentType: (type: OrderTypeType) => set(() => ({ currentType: type })),
  fetchOrders: async (type: OrderTypeType, status: OrderStatusType) => {
    set({ loading: true, error: null })
    try {
      const response = await getOrderData({ type, status })
      set({ orderData: response.data, loading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "出错了", loading: false })
    }
  },
  // 重新获取数据，更新当前项的列表总数
  setCurrentPaginationTotal: (totalItems: number) => {
    const orderType = get().currentType
    set((state) => ({
      orderPaginationMap: {
        ...state.orderPaginationMap,
        [orderType]: { ...state.orderPaginationMap[orderType], totalItems },
      },
    }))
  },
  // 重新获取数据，更新当前项的列表 当前页  当前每页数量 数据
  setCurrentPagination: (currentPage: number, pageSize: number) => {
    const orderType = get().currentType
    set((state) => ({
      orderPaginationMap: {
        ...state.orderPaginationMap,
        [orderType]: { currentPage, pageSize, totalItems: state.orderPaginationMap[orderType].totalItems },
      },
    }))
    // get().fetchOrders(type, status)
  },
  // 设置当前订单类型
  setOrderType: (type: OrderTypeType) => {
    // const currentStatus = get().orderStatusMap[type] || "all"
    set({ currentType: type })
    // 自动切换到该类型的上次状态
    // get().fetchOrders(type, currentStatus)
  },
  // 设置当前订单状态
  setOrderStatus: (status: OrderStatusType) => {
    const orderType = get().currentType
    set((state) => ({
      orderStatusMap: { ...state.orderStatusMap, [orderType]: status },
    }))
    // get().fetchOrders(orderType, status)
  },
  fetchData: async () => {
    set({ loading: true, error: null })
    try {
      const response = await getAllOrder({ test: 2 })
      set({ data: response.data, loading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "出错了", loading: false })
    }
  },
  refetchData: async () => {
    set({ data: null, loading: true, error: null }) // 清空旧数据并设置加载状态
    try {
      await set({ loading: true }) // 确保加载状态
      await set({ error: null }) // 清除错误
      const response = await getAllOrder({ test: 2 }) // 重新请求数据
      // 数据请求后成功更新状态
      set({ data: response.data, loading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "出错了", loading: false })
    }
  },
  setIsModalOpenTk: (bool: boolean) => set(() => ({ isModalOpenTk: bool })),

  setIsViewLogistics: (bool: boolean) => set(() => ({ isViewLogistics: bool })),
}))
