import { Radio } from "antd"

import { PaintOptionType } from "@/store/printProcess"

import ColorPicker from "./colorPicker"
export default function Paint() {
  const { paintOption } = usePrintProcessStore()

  const [paint, setPaint] = useState(paintOption[1])
  const togglePaint = (item: PaintOptionType) => {
    setPaint(item)
  }

  return (
    <>
      <div className="flex  gap-[10px]">
        <div className="">
          <span className="text-[#FF0000]">*</span> 喷漆:
        </div>
        <div className="w-[70%] flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <Radio.Group
              value={paint.value}
              options={paintOption.map((item) => ({ value: item.value, label: item.label }))}
              onChange={(e) => togglePaint(paintOption.find((item) => item.value === e.target.value)!)}
            />
          </div>
          {paint.value == "qi" && (
            <>
              <ColorPicker type={1} />
              <ColorPicker type={0} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
