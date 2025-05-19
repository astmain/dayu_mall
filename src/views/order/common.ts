export type OrderStatusType = "all" | "pending" | "processing" | "shipped" | "completed" | "cancelled" | "refund"
interface StatusArrType {
  name: string
  status: OrderStatusType
}

enum OrderStatus {
  All = "all",
  Pending = "pending",
  Processing = "processing",
  Shipped = "shipped",
  Completed = "completed",
  Cancelled = "cancelled",
  Refund = "refund",
}
export const STATUS_ARR: StatusArrType[] = [
  {
    name: "所有订单",
    status: OrderStatus.All,
  },
  {
    name: "待付款",
    status: OrderStatus.Pending,
  },
  {
    name: "生产中",
    status: OrderStatus.Processing,
  },
  {
    name: "已发货",
    status: OrderStatus.Shipped,
  },
  {
    name: "已完成",
    status: OrderStatus.Completed,
  },
  {
    name: "已取消",
    status: OrderStatus.Cancelled,
  },
  {
    name: "退款/售后",
    status: OrderStatus.Refund,
  },
]

export const STATUS_MAP = STATUS_ARR.reduce(
  (acc, item) => {
    acc[item.status] = item.name
    return acc
  },
  {} as Record<string, string>,
)

export type OrderTypeType = "model" | "print" | "scan" | "design" | "cnc" | "handboard"

interface TypeArrType {
  name: string
  count: number
  type: OrderTypeType
}

enum OrderType {
  Model = "model",
  Print = "print",
  Scan = "scan",
  Design = "design",
  CNC = "cnc",
  Handboard = "handboard",
}
export const TYPE_ARR: TypeArrType[] = [
  {
    name: "3D模型订单",
    count: 1,
    type: OrderType.Model,
  },
  {
    name: "3D打印订单",
    count: 4,
    type: OrderType.Print,
  },
  {
    name: "3D扫描订单",
    count: 8,
    type: OrderType.Scan,
  },
  {
    name: "3D设计订单",
    count: 2,
    type: OrderType.Design,
  },
  {
    name: "CNC加工订单",
    count: 7,
    type: OrderType.CNC,
  },
  {
    name: "手板复模订单",
    count: 7,
    type: OrderType.Handboard,
  },
]
