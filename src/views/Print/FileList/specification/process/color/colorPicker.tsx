import type { ColorPickerProps, GetProp, SelectProps } from "antd"
import { Button, ColorPicker as ColorPickerAntd, Select, Tag, Tooltip } from "antd"

import { changeFontSize, changeLineHeight, findClosestPantones, getHighContrastColor } from "./calculateColor"
import { ColorType, defaultColors } from "./defaultColor"
import pantoneC from "./pantoneC.json"
import pantoneU from "./pantoneU.json"
import Search from "./search"

// type TagRender = SelectProps["tagRender"]
// type MyTagRender = ((props: CustomTagProps & { deleteItem: () => void }) => React.ReactElement)
type Color = Extract<GetProp<ColorPickerProps, "value">, string | { cleared: any }>

export default function ColorPicker({ type }: { type: number }) {
  console.log("✨ 🍰 ✨ xzz2021: ColorPicker -> type", type)
  const { currentItem, setCurrentItem } = usePrintCartStore()

  const options: SelectProps["options"] = []

  const [color, setColor] = useState<Color>("#12e627")

  const [closestPantones, setClosestPantones] = useState<any[]>(defaultColors[type == 0 ? "pantoneC" : "pantoneU"])

  const selectedColor = useMemo<{ value: string; label: string }[]>(() => {
    const paint = currentItem?.paint?.[type == 0 ? "c" : "u"] || []
    return paint.map((item: { pantone: string; hex: string }) => ({ value: item.hex, label: item.pantone }))
  }, [currentItem])

  // const hexString = useMemo<string>(() => (typeof color === "string" ? color : color?.toHexString()), [color])

  const updateColor = (value: Color | string) => {
    const hex = typeof value === "string" ? value : value?.toHexString()
    setColor(value)
    const closestPantones = findClosestPantones(hex, type == 0 ? pantoneC : pantoneU)
    setClosestPantones(closestPantones)
  }

  const deleteItem = (item: { pantone: string; hex: string }) => {
    const newItem = JSON.parse(JSON.stringify(currentItem))
    const newPaint = newItem.paint[type == 0 ? "c" : "u"] || []
    newPaint.splice(
      newPaint.findIndex((i: { pantone: string }) => i.pantone === item.pantone),
      1,
    )
    setCurrentItem(newItem)
  }

  const addItem = (item: { pantone: string; hex: string }) => {
    const newItem = JSON.parse(JSON.stringify(currentItem))
    const newPaint = newItem.paint[type == 0 ? "c" : "u"] || []
    const isExist = newPaint.find((i: { pantone: string }) => i.pantone === item.pantone)
    if (!isExist) {
      newPaint.push(item)
      setCurrentItem(newItem)
    }
  }

  return (
    <div className="flex items-center gap-[10px]">
      <div>{type == 0 ? "亮光: " : "哑光: "}</div>
      <ColorPickerAntd
        value={color}
        onChange={updateColor}
        disabledAlpha={true}
        panelRender={(panel) => CustomPanel(panel, type, updateColor, closestPantones, addItem, deleteItem)}
        disabledFormat={true}
      >
        <Select
          mode="multiple"
          tagRender={(props) => {
            const newProps = { ...props, deleteItem }
            return tagRender(newProps)
          }}
          defaultValue={selectedColor}
          value={selectedColor}
          style={{ width: "80%" }}
          options={options}
          onFocus={() => {
            console.log("focus")
          }}
          open={false}
          maxTagCount={5}
        />
      </ColorPickerAntd>
    </div>
  )
}

const tagRender: any = (props: any) => {
  const { label, value, closable, deleteItem } = props
  // const { currentItem, setCurrentItem } = usePrintCartStore()
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
    deleteItem({ pantone: label, hex: value })
  }
  return (
    <Tag color={value} onMouseDown={onPreventMouseDown} closable={closable} style={{ marginInlineEnd: 2 }}>
      {label}
    </Tag>
  )
}

const CustomPanel = (
  panel: React.ReactNode,
  type: number,
  updateColor: (value: Color) => void,
  closestPantones: any[],
  addItem: (item: { pantone: string; hex: string }) => void,
  deleteItem: (item: { pantone: string; hex: string }) => void,
) => {
  return (
    <>
      <div className="flex">
        {panel}
        <div className="mx-[5px] flex flex-col items-center gap-[10px]">
          <Search updateColor={updateColor} type={type} />
          <div className="flex items-center w-[360px]  flex gap-[5px] justify-between flex-wrap items-center text-center">
            {closestPantones.map((item: ColorType) => {
              return (
                <div
                  key={item.pantone}
                  className="w-[60px] h-[40px] cursor-pointer  flex  items-center justify-center box-content border-[1px] border-solid border-[#03a9f3]"
                  style={{
                    backgroundColor: item.hex,
                  }}
                  onClick={() => {
                    addItem(item)
                  }}
                >
                  <div
                    className=""
                    style={{
                      color: getHighContrastColor(item.hex),
                      fontSize: changeFontSize(item.pantone),
                      lineHeight: changeLineHeight(item.pantone),
                    }}
                  >
                    {item.pantone}
                  </div>
                </div>
              )
            })}
          </div>
          <SelectedColor deleteItem={deleteItem} type={type} />
        </div>
        {/* <div className="flex items-center gap-[10px]">
          <Button>确定</Button>
        </div> */}
        {/* <div className="custom-panel">
            {panel}
            <Button>确定</Button>
          </div> */}
      </div>
    </>
  )
}

const SelectedColor = ({
  deleteItem,
  type,
}: {
  deleteItem: (item: { pantone: string; hex: string }) => void
  type: number
}) => {
  const { currentItem } = usePrintCartStore()
  const selectedColor = useMemo<{ pantone: string; hex: string }[]>(
    () => currentItem?.paint?.[type == 0 ? "c" : "u"] || [],
    [currentItem],
  )

  return (
    <div className="flex  my-[10px] w-[360px]">
      <Button type="primary" style={{ marginRight: "10px", height: "28px" }}>
        {type == 0 ? "亮光 C" : "哑光 U"}
      </Button>
      {selectedColor.length === 0 ? (
        <div className="flex flex-wrap gap-[5px] ">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className=" flex ">
              <div
                style={{
                  border: "1px solid #ccc",
                  width: "28px",
                  height: "28px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap   gap-[5px] ">
          {selectedColor.map((item) => (
            <Tooltip key={item.pantone} title={item.pantone}>
              <div
                className="group  w-[30px] h-[30px] flex-shrink-0 flex items-center justify-center text-center  rounded-[4px] relative box-content   relative "
                style={{ backgroundColor: item.hex }}
              >
                <i
                  onClick={() => deleteItem(item)}
                  className="hidden iconfont group-hover:block cursor-pointer icon-guanbi absolute top-[-5px] right-[-4px] text-center  text-white bg-[#4e64758a] color-[#fff] rounded-[7px] w-[14px] h-[14px] "
                  style={{ fontSize: "10px" }}
                ></i>
              </div>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )
}
