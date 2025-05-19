import TableXzz from "../TableXzz"
import TagXzz from "../XzzTag"

function DeliveryInfo() {
  const { columns } = useDeliveryStore((state) => state)

  interface DataListType {
    id: number
    delivery: string
    timeliness: string
    freight: string | React.ReactNode
  }
  const dataList: DataListType[] = [
    {
      id: 1,
      delivery: "EMS邮政快递",
      freight: "10",
      timeliness: "时效:2~3天左右",
    },
    {
      id: 2,
      delivery: "京东快递",
      freight: "10.98",
      timeliness: "时效:2~3天左右",
    },
    {
      id: 2,
      delivery: "德邦物流快递",
      freight: "10.98",
      timeliness: "时效:1~3天左右",
    },
    {
      id: 2,
      delivery: "顺丰快递",
      freight: "10.98",
      timeliness: "时效:1~2天左右",
    },
  ]

  const [hasAddress] = useState(!false)

  const onCheckChange = (record: any) => {
    console.log("TCL: onCheckChange -> record", record)
  }

  const gengrateDataList = () => {
    return dataList.map((item) => {
      item.freight = (
        <div color="blue">
          <span>运费: </span> <span style={{ color: "#F01342" }}> {"￥" + item.freight}</span>
        </div>
      )
      return item
    })
  }

  return (
    <>
      <div className="title w-[260px] text-[20px] flex items-center justify-between mb-[20px]">
        <TagXzz title="选择快递" /> <span>(估重100.20g)</span>
      </div>
      {hasAddress ? (
        <TableXzz columns={columns} dataList={gengrateDataList()} showCheckBox={true} onCheckChange={onCheckChange} />
      ) : (
        <div>请先添加收货地址</div>
      )}
    </>
  )
}

export default DeliveryInfo
