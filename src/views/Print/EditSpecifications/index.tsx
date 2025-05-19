import { Radio } from "antd"

import ModalXzz2 from "@/components/ModalXzz2"
import NumberInputXzz from "@/components/NumberInput"
import TableXzz from "@/components/TableXzz"
import XzzBtn from "@/components/XzzBtn"
import TagXzz from "@/components/XzzTag"

import DisassemblyXzz from "./Disassembly"
import PunchHoleXzz from "./PunchHole"

const IMG_BASE_URL = import.meta.env.VITE_API_IMG_BASE_URL
const EditXzz: React.FC = () => {
  const {
    isEditModalOpen,
    closeEditModal,
    currentMaterialType,
    setCurrentMaterialType,
    currentList,
    setCurrentList,
    currentGrinding,
    setCurrentGrinding,
  } = usePrintStore((state) => state)
  const materialTypes = [
    { type: "光敏树脂", id: 1 },
    { type: "高分子粉末", id: 2 },
    { type: "金属粉末", id: 3 },
    { type: "线材", id: 4 },
    { type: "陶瓷材料", id: 5 },
  ]
  const toggleType = (type: string) => {
    setCurrentMaterialType(type)
  }

  const columns = [
    {
      title: "材料",
      dataIndex: "material",
      key: "material",
      flex: 1,
    },
    {
      title: "单价",
      dataIndex: "price",
      key: "price",
      flex: 1,
    },
    {
      title: "材料特性",
      dataIndex: "attributes",
      key: "attributes",
      flex: 1,
    },
    {
      title: "材料颜色",
      dataIndex: "color",
      key: "color",
      flex: 1,
    },
  ]

  const grindingArr = [
    {
      label: "不需要",
      rate: 1,
    },
    {
      label: "粗磨",
      rate: 1.2,
    },
    {
      label: "精磨",
      rate: 1.4,
    },
  ]
  useEffect(() => {
    setCurrentList()
  }, [currentMaterialType, setCurrentList])

  const onNumberChange = (value: number) => {
    console.log("TCL: onNumberChange -> value", value)
    // setCurrentGrinding({ label: value })
  }

  return (
    <>
      <ModalXzz2 title="修改规格" isOpen={isEditModalOpen} onClose={closeEditModal}>
        <div className="px-[30px] py-[20px]">
          <TagXzz title="选择材料" />
          <div className="flex gap-[20px]">
            <div className="leftbox">
              <div className="mt-[20px] flex gap-[20px]">
                {materialTypes.map((item) => {
                  return (
                    <XzzBtn
                      type={item.type == currentMaterialType ? "primary" : "default"}
                      variant="outlined"
                      key={item.id}
                      onClick={() => toggleType(item.type)}
                      style={{ heigt: "50px" }}
                    >
                      {item.type}
                    </XzzBtn>
                  )
                })}
              </div>
              <div className="my-[30px]">
                <TableXzz columns={columns} dataList={currentList} />
              </div>
            </div>
            <div className="rightbox">
              <img src={IMG_BASE_URL + "material555.png"} alt="" style={{ width: "240px", height: "145px" }} />
              <div className="text-[#222] text-[18px]">材料: 9600</div>
              <div className="text-[#999] text-[14px] w-[240px]">
                {/* 适用范围: 适用于管道，卡扣，电子产 品外壳，汽车壳体，仪表盘组件等。 优点: 颜色更白，样件纹路佳，表面光
                滑，韧性、耐用性强，机械性能好。 缺点: 不适宜放置高温及强太阳光环境。 成型工艺: SLA立体光固化 材料精度:
                ±0.2mm或0.3%以内 颜色: 哑光白 热变形温度: 59°C */}
                <div>
                  <span>适用范围: </span> <span>适用于管道，卡扣，电子产 品外壳，汽车壳体，仪表盘组件等。</span>
                </div>
                <div>
                  <span>优点: </span> <span>颜色更白，样件��路��，表面光滑，��性、��用性强，机��性能好。</span>
                </div>
                <div>
                  <span>缺点: </span> <span>不适��放置高��及强太阳光环境。</span>
                </div>
                <div>
                  <span>成型工艺: </span> <span>SLA立体光固化</span>
                </div>
                <div>
                  <span>材料精度: </span> <span>��0.2mm或0.3%以内</span>
                </div>
                <div>
                  <span>颜色: </span> <span>��光白</span>
                </div>
                <div>
                  <span>热变形��度: </span> <span>59°C</span>
                </div>
              </div>
            </div>
          </div>
          <TagXzz title="表面处理" />
          <div className="my-[30px] flex flex-col gap-[30px] ">
            <div className=" flex items-center">
              <div className="tt">打磨：</div>
              <div className="btns flex gap-[20px]">
                {grindingArr.map((item) => {
                  return (
                    <XzzBtn
                      type={item.label == currentGrinding.label ? "primary" : "default"}
                      variant="outlined"
                      key={item.rate}
                      onClick={() => setCurrentGrinding(item)}
                      style={{ height: "50px" }}
                    >
                      {item.label}
                    </XzzBtn>
                  )
                })}
              </div>
            </div>
            <div className=" flex items-center">
              <div className="tt">喷漆：</div>
              <div className="btns flex gap-[20px]">
                <Radio>不需要</Radio>
                <Radio>需要</Radio>
              </div>
            </div>
            <div className=" flex items-center">
              <div className="tt">镶嵌螺母：</div>
              <div className="btns flex gap-[20px]">
                <Radio>不需要</Radio>
                <Radio>需要</Radio>
              </div>
            </div>
            <div>
              <div className=" flex items-center">
                <div className="tt">选择层高：</div>
                <div className="btns flex gap-[20px]">
                  <Radio>0.05mm</Radio>
                  <Radio>0.1mm</Radio>
                </div>
              </div>
              <div className="text-[#999] text-[12px]">
                抽壳标准:0-50MM 50-100MM 100-180MM 180-500MM 500-1000MM 1000-2000MM
              </div>
            </div>

            <div className=" flex items-center">
              <div className="tt">打孔位置：</div>
              <div className="btns ">
                <PunchHoleXzz />
              </div>
            </div>

            <div className=" flex items-center">
              <div className="tt">拆件示意图：</div>
              <div className="btns ">
                <DisassemblyXzz />
              </div>
            </div>
          </div>
        </div>
        <div
          className="rt"
          style={{
            borderTop: "1px solid #DCDCDC",
            height: "80px",
            padding: "20px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="leftbox flex items-center">
            <div className="title">数量: </div>
            <NumberInputXzz defaultValue={2} onChange={onNumberChange} />
          </div>
          <div className="rightbox flex items-center space-between gap-[30px]">
            <div className="price">
              预估金额: <span className="text-[#F05113]">￥ 50.00</span>
            </div>
            <XzzBtn type="primary" style={{ height: "46px", width: "110px" }}>
              确认
            </XzzBtn>
          </div>
        </div>
      </ModalXzz2>
    </>
  )
}

export default EditXzz
