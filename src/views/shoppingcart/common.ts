// 存放Tab数据

interface TypeArrType {
  id: string
  type: string
  title: string
  count: number
}

export const datatable: TypeArrType[] = [
  {
    id: "section-a",
    type: "model",
    title: "3D模型库",
    count: 4,
  },
  {
    id: "section-b",
    type: "print",
    title: "3D打印",
    count: 5,
  },
  {
    id: "section-c",
    type: "scan",
    title: "3D扫描",
    count: 2,
  },
  {
    id: "section-d",
    type: "process",
    title: "CNC加工",
    count: 1,
  },
  {
    id: "section-e",
    type: "Handboardlaminating",
    title: "手板复膜",
    count: 2,
  },
]
