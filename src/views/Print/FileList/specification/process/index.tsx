import { Button } from "antd"

import TagXzz from "@/components/XzzTag"
import type { GrindingOptionType } from "@/store/printProcess"
import { usePrintProcessStore } from "@/store/printProcess"

import CeilHeight from "./ceilHeight"
import Paint from "./color"
import Nuts from "./nuts"
export default function Process() {
  const { grindingOption } = usePrintProcessStore()
  const [grinding, setGrinding] = useState(grindingOption[0])

  const toggleGrinding = (item: GrindingOptionType) => {
    setGrinding(item)
  }

  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <TagXzz title="表面处理" />
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <div>
              <span className="text-[#FF0000]">*</span> 打磨:
            </div>
            <div className="flex items-center gap-[10px]">
              {grindingOption.map((item) => {
                return (
                  <Button
                    key={item.value}
                    color={item.value == grinding.value ? "primary" : "default"}
                    onClick={() => toggleGrinding(item)}
                    variant="outlined"
                  >
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>
          <Paint />
          <Nuts />
          <CeilHeight />
        </div>
      </div>
    </>
  )
}
