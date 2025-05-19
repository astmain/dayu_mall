import type { GetRef } from "antd"
import { InputNumber, Modal, Select, Table } from "antd"
import { useRef, useState } from "react"

type BaseSelectRef = GetRef<typeof Select>
export default function NutsPicker() {
  const selectedNuts: any[] = []
  const tagRender = (props: any) => {
    console.log("✨ 🍰 ✨ xzz2021: tagRender -> props", props)
    return <div>Hello</div>
  }

  const list = [
    {
      default_code: "M1",
      num: 1,
    },
    {
      default_code: "M2",
      num: 1,
    },
  ]
  const nutsType = [
    {
      type: "M1",
      length: 1,
      diameter: 1,
      outerDiameter: 1,
    },
    {
      type: "M2",
      length: 1,
      diameter: 1,
      outerDiameter: 1,
    },
  ]
  const [open, setOpen] = useState(false)
  const confirm = () => {}
  const SelectRef = useRef<BaseSelectRef>(null)
  return (
    <div className="flex items-center gap-[10px]">
      <Select
        ref={SelectRef}
        mode="multiple"
        tagRender={tagRender}
        defaultValue={selectedNuts}
        value={selectedNuts}
        maxTagCount={5}
        open={false}
        onFocus={() => {
          SelectRef?.current?.blur()
          setOpen(true)
        }}
        style={{ width: "80%" }}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        centered={true}
        onOk={confirm}
        style={{ padding: 10 }}
      >
        <PickerPanel list={list} nutsType={nutsType} />
      </Modal>
    </div>
  )
}

type NutItem = {
  default_code: string
  num: number
}

type NutTypeItem = {
  type: string
  length: number
  diameter: number
  outerDiameter: number
}

interface Props {
  list: NutItem[]
  nutsType: NutTypeItem[]
  //   onCancel: () => void
  //   onConfirm: (data: NutItem[]) => void
}

const PickerPanel: React.FC<Props> = ({ list, nutsType }: Props) => {
  const [items, setItems] = useState<NutItem[]>(list)

  const handleNumChange = (value: number | null, index: number) => {
    const newItems = [...items]
    newItems[index].num = value ?? 0
    setItems(newItems)
  }

  const columns = [
    { title: "型号", dataIndex: "type", key: "type", width: 120 },
    { title: "长度", dataIndex: "length", key: "length", width: 100 },
    { title: "底孔直径", dataIndex: "diameter", key: "diameter", width: 100 },
    { title: "工件外径", dataIndex: "outerDiameter", key: "outerDiameter", width: 90 },
  ]

  return (
    <div className="flex flex-col gap-6 w-[720px]">
      {/* 内容区域 */}
      <div className="flex justify-between">
        {/* 左侧选择区 */}
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <div key={item.default_code} className="flex justify-around items-center w-[270px]">
              <div>{item.default_code}</div>
              <div className="flex items-center gap-2">
                <span>个数:</span>
                <InputNumber
                  min={0}
                  max={10}
                  size="small"
                  value={item.num}
                  onChange={(value) => handleNumChange(value, index)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 右侧表格与说明 */}
        <div className="w-[440px]">
          <p className="font-semibold mb-2">铜螺母型号说明(单位:mm)</p>
          <Table dataSource={nutsType} columns={columns} pagination={false} size="small" rowKey="type" bordered />
          <div className="text-xs text-gray-700 mt-2 leading-relaxed">
            <p>说明:</p>
            <ul className="list-disc pl-5">
              <li>铜螺母小于 M6 壁厚需要 ≧ 1.5mm;</li>
              <li>铜螺母大于 M6 壁厚需要 ≧ 2mm;</li>
              <li>如有特殊要求请提前联系工装师傅。</li>
            </ul>
            <p className="mt-1">注: 铜螺母底孔壁厚不低于 1.5mm,根据规格适当增加; 底孔深度需超过铜螺母长度 1.5mm。</p>
          </div>
        </div>
      </div>

      {/* 价格说明 */}
      <div className="text-sm text-gray-700 leading-relaxed">
        <p className="font-semibold mb-1">说明</p>
        <p>
          关于价格:按铜螺母和牙套总计数量计算价格, 10颗及以内每颗￥8;10到200颗每颗￥3.5; 超过200颗每颗￥2.5。
          例如:30颗铜螺母 + 20件牙套 = 50颗, 总价为 10x8 + 40x3.5 = ￥220。
        </p>
        <p className="mt-2">
          关于交期:
          <br />
          树脂材质:总数 ≤ 20,不加交期,每满 500 颗 +1 天;
          <br />
          尼龙材质:总数 ≤ 300,加 1 天,每满 300 再 +1 天。
        </p>
      </div>

      {/* 操作按钮 */}
      {/* <div className="flex justify-end gap-2">
        <Button size="small" onClick={onCancel}>
          取消
        </Button>
        <Button type="primary" size="small" onClick={() => onConfirm(items)}>
          确定
        </Button>
      </div> */}
    </div>
  )
}
