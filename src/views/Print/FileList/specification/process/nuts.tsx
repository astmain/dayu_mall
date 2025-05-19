import { Radio } from "antd"

import type { NutsOptionType } from "@/store/printProcess"
import { usePrintProcessStore } from "@/store/printProcess"

import NutsPicker from "./nutsPicker"
export default function Nuts() {
  const { nutsOption } = usePrintProcessStore()
  const [nuts, setNuts] = useState(nutsOption[1])

  const toggleNuts = (item: NutsOptionType) => {
    setNuts(item)
  }

  return (
    <>
      <div className="flex  gap-[10px]">
        <div className="mt-[5px]">
          <span className="text-[#FF0000]">*</span> 镶嵌螺母:
        </div>
        <div className="w-[70%] flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            {/* {nutsOption.map((item) => {
              return (
                <XzzBtn
                  key={item.value}
                  type={item.value == nuts.value ? "primary" : "default"}
                  style={{ height: "36px", fontSize: "14px" }}
                  onClick={() => toggleNuts(item)}
                >
                  {item.label}
                </XzzBtn>
              )
            })} */}
            <Radio.Group
              value={nuts.value}
              options={nutsOption.map((item) => ({ value: item.value, label: item.label }))}
              onChange={(e) => toggleNuts(nutsOption.find((item) => item.value === e.target.value)!)}
            />
          </div>
          {nuts.value != "no" && <NutsPicker />}
        </div>
      </div>
    </>
  )
}
