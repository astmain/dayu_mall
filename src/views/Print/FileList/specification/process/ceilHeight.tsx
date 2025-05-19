import { Radio } from "antd"

import type { NutsOptionType } from "@/store/printProcess"
import { usePrintProcessStore } from "@/store/printProcess"
export default function CeilHeight() {
  const { ceilHeightOption } = usePrintProcessStore()
  const [ceilHeight, setCeilHeight] = useState(ceilHeightOption[1])

  const toggleCeilHeight = (item: NutsOptionType) => {
    setCeilHeight(item)
  }

  return (
    <>
      <div>
        <div className="flex  gap-[10px]">
          <div className="">
            <span className="text-[#FF0000]">*</span> 选择层高:
          </div>
          <div className="w-[70%] flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              {/* {ceilHeightOption.map((item) => {
              return (
                <XzzBtn
                  key={item.value}
                  type={item.value == ceilHeight.value ? "primary" : "default"}
                  style={{ height: "36px", fontSize: "14px" }}
                  onClick={() => toggleCeilHeight(item)}
                >
                  {item.label}
                </XzzBtn>
              )
            })} */}
              <Radio.Group
                value={ceilHeight.value}
                options={ceilHeightOption.map((item) => ({ value: item.value, label: item.label }))}
                onChange={(e) => toggleCeilHeight(ceilHeightOption.find((item) => item.value === e.target.value)!)}
              />
            </div>
          </div>
        </div>
        <div className="text-sss text-[#999]">
          抽壳标准: 0-50MM 50-100MM 100-180MM 180-500MM 500-1000MM 1000-2000MM 1MM 1.2MM 1. 5MM 1.8MM 2.0MM 2.2-2.5MM
        </div>
      </div>
    </>
  )
}
