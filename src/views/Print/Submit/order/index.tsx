import ModalXzz2 from "@/components/ModalXzz2"
import TableXzz from "@/components/TableXzz"
import TagXzz from "@/components/XzzTag"

function OrderInfo() {
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      flex: 1,
    },
    {
      title: "图纸",
      dataIndex: "image",
      key: "image",
      flex: 2,
    },
    {
      title: "规格",
      dataIndex: "sprcification",
      key: "sprcification",
      flex: 4,
    },
    {
      title: "数量",
      dataIndex: "count",
      key: "count",
      flex: 1,
    },
    {
      title: "预计发货日期",
      dataIndex: "timeliness",
      key: "timeliness",
      flex: 2,
    },
    {
      title: "金额",
      dataIndex: "price",
      key: "price",
      flex: 1,
    },
  ]
  interface DataListType {
    image: string
    count: string
    timeliness: string
    price: string
    index: number
  }
  const dataList: Partial<DataListType>[] = [
    {
      image: "ii",
      count: "2",
      timeliness: "2024-09-13 20:00:00",
      price: "88.00",
    },
  ]

  // const generatedList = () => {
  //   return dataList.map((item, index) => {

  //   return item
  // }))
  // }
  const info = {
    size: "15*15*23",
    volume: 11.46,
    surface: 114.045,
    weight: 23.98,
    material: "9600",
    color: "白色",
    operater: "粗磨",
    nuts: "M1*3个",
    braces: "M1*3个", //
  }

  return (
    <>
      <div className="title mb-[20px]">
        <TagXzz title="订单信息" />
      </div>
      <TableXzz columns={columns} dataList={dataList} />
      <Specifications info={info} />
    </>
  )
}

interface InfoProps {
  size: string
  volume: number
  surface: number
  weight: number
  material: string
  color: string
  operater: string
  nuts: string
  braces: string //
}
interface SpecificationsProps {
  info: InfoProps // 物料信息
}
const Specifications: React.FC<SpecificationsProps> = ({ info }) => {
  const { specificationsModalVisible, setSpecificationsModalVisible } = usePrintStore((state) => state.submit)

  return (
    <ModalXzz2
      isOpen={specificationsModalVisible}
      onClose={() => setSpecificationsModalVisible(false)}
      showClose={true}
      title="规格信息"
    >
      <div className="container flex justify-between  w-[100%] p-[30px] min-w-[600px] gap-[60px]">
        <div className="leftbox flex flex-col items-left flex-3">
          {/* 尺寸：15.00cm*15.00cm 体积：11.46cm³ 表面积：114.00cm² 重量56.02g 材料：9600 */}

          <div className="each">
            <span>尺寸: </span> <span>{info.size + "cm"}</span>
          </div>
          <div className="each">
            <span>体积: </span> <span>{info.volume.toFixed(2) + "cm³"}</span>
          </div>
          <div className="each">
            <span>表面积: </span> <span>{info.surface.toFixed(2) + "cm²"}</span>
          </div>
          <div className="each">
            <span>重量: </span> <span>{info.weight.toFixed(2) + "g"}</span>
          </div>
          <div className="each">
            <span>材料: </span> <span>{info.material}</span>
          </div>
        </div>
        <div className="rightbox flex flex-col items-left flex-1">
          {/* 颜色：哑光白 表面处理：打磨-粗磨-亮光-2090C、150C、311C、101C； 哑光-2090C、150C、311C、1 */}
          <div className="each">
            <span>颜色: </span> <span>{info.color}</span>
          </div>
          <div className="each">
            <span>表面处理: </span>
            <span>{info.operater} </span>
          </div>
          <div className="each">
            <span>螺母: </span>
            <span>{info.nuts}</span>
          </div>
          <div className="each">
            <span>牙套: </span>
            <span>{info.braces}</span>
          </div>
        </div>
      </div>
    </ModalXzz2>
  )
}

export default OrderInfo
