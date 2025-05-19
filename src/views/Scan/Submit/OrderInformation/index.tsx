import { Divider, Space, Table, Typography } from "antd"

const imgUrl = "http://yun3d.com/frontend/public/test/"

const columnsOrder: any = [
  {
    title: "序号",
    dataIndex: "key",
    rowScope: "row",
    align: "center",
  },
  {
    title: "图纸",
    dataIndex: "imgz",
    key: "imgz",
    render: () => (
      <Space size="middle">
        <div className="flex">
          <div className="mr-[20px] text-left">
            <img className="w-[90px]" src={imgUrl + "car.png"} alt="" />
          </div>
          <div className="text-[#666666] text-[14px] relative">
            <p>长：500.68mm </p>
            <p>宽：300.60mm</p>
            <p>高：360.00mm</p>
            <p className="absolute left-[-4px]">文件名：越野车.png</p>
          </div>
        </div>
      </Space>
    ),
    align: "center",
  },
  {
    title: "规格",
    dataIndex: "Specifications",
    key: "Specifications",
    render: () => (
      <Space size="middle">
        <div className="flex">
          <div className="mr-[20px] text-left">
            <p className="text-[#666666]">扫描类型：人像</p>
            <p className="text-[#666666]">扫描方式：手持激光</p>
            <p className="text-[#666666]">能否喷显像剂：不能</p>
            <p>
              <span className="text-[#1366F0] underline cursor-pointer">查看更多</span>
            </p>
          </div>
        </div>
      </Space>
    ),
    align: "center",
  },
  {
    title: "数量",
    dataIndex: "number",
    key: "number",
    render: () => (
      <Space size="middle">
        <div className="text-[18px] text-[#222222]">
          <span>20</span>
        </div>
      </Space>
    ),
    align: "center",
  },
  {
    title: "预计发货日期",
    dataIndex: "expectedDeliverydate",
    key: "expectedDeliverydate",
    align: "center",
  },
  {
    title: "金额",
    dataIndex: "money",
    key: "money",

    align: "center",
    render: () => (
      <Space size="middle">
        <div className="text-[#f05113] text-[18px]">
          <span>人工报价</span>
        </div>
      </Space>
    ),
  },
]
const dataOrder = [
  {
    key: "1",
    age: 32,
    imgz: "西湖区湖底公园1号",
    Specifications: "1",
    number: 20,
    expectedDeliverydate: "2024-09-13 20:00:00",
    money: "人工报价",
  },
  {
    key: "2",
    age: 42,
    imgz: "西湖区湖底公园1号",
    Specifications: "1",
    number: 20,
    expectedDeliverydate: "2024-09-13 20:00:00",
    money: "人工报价",
  },
]
function OrderInformationLqh() {
  const { Title } = Typography
  return (
    <div>
      <div className="flex justify-between">
        <div className="ml-[15px]">
          <Title level={5} style={{ marginTop: "15px", fontSize: "20px", fontWeight: 400 }}>
            <Divider
              type="vertical"
              style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
            />
            订单信息
          </Title>
        </div>
      </div>

      <div className="w-[1200px] mx-auto pl-[30px] pr-[30px] pb-[30px] border-b border-b-dashed border-b-[#dcdcdc]">
        <Table columns={columnsOrder} dataSource={dataOrder} pagination={false} bordered />
      </div>
    </div>
  )
}

export default OrderInformationLqh
