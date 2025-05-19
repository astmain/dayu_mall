import { categoryData } from "./categoryData"

export interface CategoryParams {
  category: string
  format: string
  sides: string
  wiring: string
}
const SelectCategory = ({ updateSelectData }: { updateSelectData: (data: CategoryParams) => void }) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryParams>({
    category: "",
    format: "",
    sides: "",
    wiring: "",
  })

  const categoryDataType: { label: string; value: string }[] = [
    { label: "类别", value: "category" },
    { label: "格式", value: "format" },
    { label: "面数", value: "sides" },
    { label: "布线", value: "wiring" },
  ]
  const handleCategoryChange = (key: keyof CategoryParams, value: string) => {
    setCurrentCategory({ ...currentCategory, [key]: value })
    updateSelectData({ ...currentCategory, [key]: value })
  }
  return (
    <>
      <div className="w-full">
        {categoryDataType.map((item: { label: string; value: string }) => (
          <div key={item.value} className="flex text-[18px] mb-[30px]">
            <div className="font-bold w-[60px] text-left flex-shrink-0">{item.label}</div>
            <div className="flex items-center gap-[20px] flex-wrap">
              {(categoryData as any)[item.value].map((iten: { label: string; value: string }) => (
                <div
                  key={iten.value}
                  className="cursor-pointer"
                  style={{
                    color: currentCategory[item.value as keyof CategoryParams] == iten.value ? "#1366F0" : "#000",
                  }}
                  onClick={() => handleCategoryChange(item.value as keyof CategoryParams, iten.value)}
                >
                  {iten.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SelectCategory
