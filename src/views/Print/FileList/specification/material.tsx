import { Button } from "antd"

import TableXzz from "@/components/TableXzz"
import TagXzz from "@/components/XzzTag"

// 定义材料项的接口
interface MaterialItem {
  material: string
  price: string
  attributes: string
  color: string
}

// 材料类型数据 - 提取到组件外部避免重复创建
const materialTypes = [
  { type: "光敏树脂", id: 1 },
  { type: "高分子粉末", id: 2 },
  { type: "金属粉末", id: 3 },
  { type: "工程塑料", id: 4 },
  { type: "陶瓷材料", id: 5 },
  { type: "其他", id: 6 },
]

export default function Material() {
  const [currentMaterialType, setCurrentMaterialType] = useState(materialTypes[0].type)
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null)

  // 使用useMemo缓存列表数据，避免不必要的重新渲染
  const currentList = useMemo<MaterialItem[]>(() => {
    // 这里可以根据currentMaterialType筛选不同类型的材料
    // 示例数据
    if (currentMaterialType === "光敏树脂") {
      return [
        {
          material: "9600",
          price: "50.00",
          attributes: "热变形温度: 59°C",
          color: "哑光白",
        },
        {
          material: "LEDO 6060",
          price: "33.00",
          attributes: "热变形温度: 59°C",
          color: "淡黄色",
        },
        {
          material: "LEDO 6060",
          price: "33.00",
          attributes: "热变形温度: 59°C",
          color: "淡黄色",
        },
      ]
    }
    return []
  }, [currentMaterialType])

  const columns = [
    {
      title: "",
      dataIndex: "select",
      key: "select",
      flex: 0.5,
    },
    {
      title: "材料型号",
      dataIndex: "material",
      key: "material",
      flex: 1,
    },
    {
      title: "材料价格",
      dataIndex: "price",
      key: "price",
      flex: 1,
      render: (price: string) => <div className="text-red-500">{price}</div>,
    },
    {
      title: "材料特性",
      dataIndex: "attributes",
      key: "attributes",
      flex: 1,
    },

    {
      title: "材料颜色",
      dataIndex: "color",
      key: "color",
      flex: 1,
    },
  ]

  const toggleType = (type: string) => {
    setCurrentMaterialType(type)
    setSelectedMaterial(null) // 切换类型时重置选择
  }

  const onCheckChange = (item: MaterialItem) => {
    console.log("选择的材料:", item)
    setSelectedMaterial(item)
  }

  // useEffect已完善，根据类型变化获取对应材料列表
  useEffect(() => {
    // 实际应用中，这里可以调用API获取材料列表
    console.log("材料类型变更为:", currentMaterialType)
    // 可以添加获取材料列表的API调用
  }, [currentMaterialType])

  return (
    <>
      <div className="flex gap-[10px] w-full">
        <div className="basis-3/5">
          <TagXzz title="选择材料" />
          <div className="flex gap-[10px] my-[10px]">
            {materialTypes.map((item) => {
              return (
                <Button
                  color={item.type == currentMaterialType ? "primary" : "default"}
                  key={item.id}
                  onClick={() => toggleType(item.type)}
                  style={{ height: "36px" }}
                  variant="outlined"
                >
                  {item.type}
                </Button>
              )
            })}
          </div>
          <div className="my-[20px]">
            <TableXzz columns={columns} dataList={currentList} onCheckChange={onCheckChange} showCheckBox={true} />
          </div>
        </div>
        <div className="basis-2/5">
          <div>材料: {selectedMaterial ? selectedMaterial.material : "未选择"}</div>
          {selectedMaterial && (
            <div className="mt-3">
              <div>
                价格: <span className="text-red-500">{selectedMaterial.price}</span>
              </div>
              <div>特性: {selectedMaterial.attributes}</div>
              <div>颜色: {selectedMaterial.color}</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
