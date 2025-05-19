// import { ColorPickerProps, GetProp, Select } from "antd"
import { Select } from "antd"

import pantoneC from "./pantoneC.json"
import pantoneU from "./pantoneU.json"
// const pantoneList = { ...pantoneC, ...pantoneU }

// type Color = Extract<GetProp<ColorPickerProps, "value">, string | { cleared: any }>

export default function Search({ updateColor, type }: { updateColor: (value: string) => void; type: number }) {
  const [defaultValue, setDefaultValue] = useState<string>("")
  const options = useMemo(() => {
    return Object.entries(type == 0 ? pantoneC : pantoneU).map(([key, value]) => ({
      value,
      label: key,
    }))
  }, [])
  const onChange = (value: string, option: any) => {
    value && updateColor(value)
    option?.label && setDefaultValue(option?.label)
  }

  return (
    <div className="w-[360px] flex items-center justify-between">
      <div className="w-[80px]">潘通色号: </div>
      <Select
        style={{ width: "270px" }}
        showSearch
        placeholder="输入或选择颜色"
        optionFilterProp="label"
        onChange={onChange}
        options={options}
        allowClear={true}
        defaultValue={defaultValue}
      />
    </div>
  )
}
