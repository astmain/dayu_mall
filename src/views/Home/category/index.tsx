import { Button, Checkbox, GetProp } from "antd"

import ModelList from "@/components/modelList"
import SearchMain from "@/components/searchBar/index"

import { CategoryParams } from "./select"
import SelectCategory from "./select"
function Home() {
  const [searchParams, setSearchParams] = useState<{ sortType: string; filterType: string[] }>({
    sortType: "default",
    filterType: [],
  })
  const sortType = [
    {
      label: "综合排序",
      value: "default",
    },
    {
      label: "最新上传",
      value: "new",
    },
    {
      label: "最多下载",
      value: "hot",
    },
  ]
  const [currentSortType, setCurrentSortType] = useState("default")
  const updateSortType = (value: string) => {
    setCurrentSortType(value)
    setSearchParams({ ...searchParams, sortType: value })
  }
  const filterType = [
    {
      label: "可商用",
      value: "commerical",
    },
    {
      label: "免费",
      value: "free",
    },
    {
      label: "有贴图",
      value: "has_texture",
    },
    {
      label: "有绑定",
      value: "has_binding",
    },
    {
      label: "有动画",
      value: "has_animation",
    },
  ]
  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (checkedValues) => {
    console.log("checked = ", checkedValues)
    setSearchParams({ ...searchParams, filterType: checkedValues as string[] })
  }
  const updateSelectData = (data: CategoryParams) => {
    setSearchParams({ ...searchParams, ...data })
  }
  return (
    <div className="w-full h-full">
      <SearchMain showBack={true} />
      <SelectCategory updateSelectData={updateSelectData} />
      <div className="w-full h-[70px] flex justify-between items-center border-b border-t border-solid border-gray-100 m-[30px_0]">
        <div className="leftbox flex h-full justify-center items-center gap-[10px]">
          {sortType.map((item) => (
            <Button
              key={item.label}
              color={currentSortType == item.value ? "primary" : "default"}
              onClick={() => updateSortType(item.value)}
              variant="link"
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="rightbox flex items-center gap-[10px]">
          <Checkbox.Group options={filterType} defaultValue={[]} onChange={onChange} />
        </div>
      </div>
      <ModelList searchParams={searchParams} />
    </div>
  )
}

export default Home
