interface FormHeaderType {
  title: string
  dataIndex: string
  key: string
  flex: number
}
export const FORMHEADER: FormHeaderType[] = [
  {
    title: "图纸",
    dataIndex: "image",
    key: "image",
    flex: 1,
  },
  {
    title: "规格",
    dataIndex: "specification",
    key: "specification",
    flex: 3,
  },
  {
    title: "金额",
    dataIndex: "price",
    key: "price",
    flex: 1,
  },
  {
    title: "数量",
    dataIndex: "count",
    key: "count",
    flex: 1,
  },
  {
    title: "订单状态",
    dataIndex: "status",
    key: "status",
    flex: 1,
  },
  {
    title: "总金额",
    dataIndex: "total",
    key: "total",
    flex: 1,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    flex: 1,
  },
]
export interface MockDataType {
  key: string
  status: string
  total: string
  orderTime: string
  orderNumber: string
  expandStatus: boolean
  orders: {
    image: string
    specification: string
    price: string
    count: string
  }[]
}
;[]
export const mockData: MockDataType[] = [
  {
    key: "1",
    status: "pending",
    total: "1000",
    orderTime: "2022-01-01 12:00:00",
    orderNumber: "20220546101670001",
    expandStatus: true,
    orders: [
      {
        image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPyOJlFimXa.png",
        specification: "1234567890",
        price: "100",
        count: "10",
      },
      {
        image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPyOJlFimXa.png",
        specification: "1234567890",
        price: "100",
        count: "10",
      },
    ],
  },
  {
    key: "2",
    status: "processing",
    total: "2000",
    orderTime: "2022-05-01 12:00:00",
    expandStatus: true,
    orderNumber: "20320546101670001",
    orders: [
      {
        image: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        specification: "9876543210",
        price: "200",
        count: "20",
      },
    ],
  },
]
