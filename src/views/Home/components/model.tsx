import { Button } from "antd"

import ModelList from "@/components/modelList"

type ModelListProps = {
  label: string
  type: string
}
const ModelMain = () => {
  const typeList: ModelListProps[] = [
    {
      label: "推荐",
      type: "recommand",
    },
    {
      label: "爆款",
      type: "hot",
    },
    {
      label: "关注",
      type: "follow",
    },
  ]
  const [activeItem, setActiveItem] = useState<ModelListProps>(typeList[0])
  const handleTypeChange = (item: ModelListProps) => {
    setActiveItem(item)
    console.log("activeItem", item)
  }

  const activeStyle = {
    borderBottom: "3px solid #1366F0",
  }
  const navigate = useNavigate()
  return (
    <>
      <div className="w-full  relative">
        <div className="w-full flex justify-center items-center">
          <div className="w-[300px] flex justify-center items-center text-[24px] text-[#666] gap-[60px] cursor-pointer">
            {typeList.map((item) => (
              <div
                key={item.type}
                style={activeItem.label == item.label ? activeStyle : {}}
                onClick={() => handleTypeChange(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center gap-[20px] absolute bottom-0 right-0">
          <Button size="large" onClick={() => navigate("/home/category")}>
            {"更多模型>>"}
          </Button>
        </div>
      </div>
      <div className="divider  bg-[#F5F5F5] h-[1px] m-[20px_0]"></div>
      <ModelList searchParams={{ type: activeItem.type }} />
    </>
  )
}
export default ModelMain
