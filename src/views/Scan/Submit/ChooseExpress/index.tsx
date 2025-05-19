import { Divider, Table, Typography } from "antd"

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows)
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
}

const dataRadio = [
  {
    key: "1",
    name: "EMS邮政快递",
    age: "运费: " + "￥" + 5,
    address: "时效：2~3天左右",
  },
  {
    key: "2",
    name: "京东快递",
    age: "运费: " + "￥" + 42,
    address: "时效：2~3天左右",
  },
  {
    key: "3",
    name: "德邦物流快递",
    age: "运费: " + "￥" + 32,
    address: "时效：1~3天左右",
  },
  {
    key: "4",
    name: "顺丰快递",
    age: "运费: " + "￥" + 99,
    address: "时效：1~2天左右",
  },
]

const columnsRadio = [
  {
    title: "快递",
    dataIndex: "name",
    render: (text: any) => <a className="text-[#222222] text-[16px]">{text}</a>,
  },
  {
    title: "运费 (估)",
    dataIndex: "age",
    render: (props: any) => {
      console.log(props, "props")
      const aa = props.split(":")

      const [title, price] = aa
      return (
        <div className="text-[16px]">
          {/* #F01342 */}
          {title} <span className="text-[#F01342]"> {price}</span>
        </div>
      )
    },
  },
  {
    title: "时效 (估)",
    dataIndex: "address",
    render: (text: any) => <span className="text-[16px]">{text}</span>,
  },
]

function ChooseExpressLqh() {
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
            选择快递（估重0.52kg）
          </Title>
        </div>
      </div>

      <div className="w-[1200px] mx-auto pl-[30px] pr-[30px] pb-[30px] border-b border-b-dashed border-b-[#dcdcdc]">
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          columns={columnsRadio}
          dataSource={dataRadio}
          pagination={false}
          bordered
        />
      </div>
    </div>
  )
}

export default ChooseExpressLqh
