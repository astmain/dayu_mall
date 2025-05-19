import { Divider, Space, Table, Typography } from "antd"

const dataSource = [
  {
    key: "1",
    name: "陈先生",
    age: 1111111111,
    address: "福建省泉州市鲤城区北峰街道300号大宇科技有限公司...",
  },
]

const columnsXd = [
  {
    title: "下单联系人",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "联系电话",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "技术联系人",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "联系电话",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        {/* <a href="#" style={{ textDecoration: "underline", color: "#1366F0" }}>
          更换
        </a> */}
        <span className="underline text-[#1366F0] cursor-pointer">更换</span>
      </Space>
    ),
  },
]
function OrderContactLqh() {
  const { Title } = Typography
  return (
    <div>
      <div className="flex justify-between">
        <div style={{ marginLeft: "15px" }}>
          <Title level={5} style={{ marginTop: "15px", fontSize: "20px", fontWeight: 400 }}>
            <Divider
              type="vertical"
              style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
            />
            下单联系人
          </Title>
        </div>
        <div className="mt-[16px] mr-[15px]">
          <span className="text-[#1366f0] text-[16px] cursor-pointer">+添加新的联系人</span>
        </div>
      </div>

      <div className="w-[1200px] mx-auto pl-[30px] pr-[30px] pb-[30px] border-b border-b-dashed border-b-[#dcdcdc]">
        <Table dataSource={dataSource} columns={columnsXd} pagination={false} bordered />
      </div>
    </div>
  )
}

export default OrderContactLqh
