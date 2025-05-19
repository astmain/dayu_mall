import { Button, Divider, Input, Space, Table, Typography } from "antd"

import ModalLqh2 from "@/components/ModalLqh2"

const { TextArea } = Input

const imgUrl = "http://yun3d.com/frontend/public/test/"

const dataSource = [
  {
    key: "1",
    name: "陈先生",
    age: 1111111111,
    address: "福建省泉州市鲤城区北峰街道300号大宇科技有限公司...",
  },
]

const columns = [
  {
    title: "联系人",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "联系电话",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "详细地址",
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
        <span className="text-[#1366F0] cursor-pointer">更换</span>
      </Space>
    ),
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
        <span className="text-[#1366F0] cursor-pointer">更换</span>
      </Space>
    ),
  },
]

const columnsRadio = [
  {
    title: "快递",
    dataIndex: "name",
    render: (text: any) => <a style={{ color: "#222222", fontSize: "16px" }}>{text}</a>,
  },
  {
    title: "运费 (估)",
    dataIndex: "age",
    render: (props: any) => {
      console.log(props, "props")
      const aa = props.split(":")

      const [title, price] = aa
      return (
        <div style={{ fontSize: "16px" }}>
          {title} <span style={{ color: "#F01342" }}> {price}</span>
        </div>
      )
    },
  },
  {
    title: "时效 (估)",
    dataIndex: "address",
    render: (text: any) => <span style={{ fontSize: "16px" }}>{text}</span>,
  },
]

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

const ScanTypes = ["纸质收据/送货单", "电子收据/送货单"]

const deliverList = ["不同交货期一起发货", "分开发货"]

function SubmitOrder() {
  const [indexType, setIndexType] = useState(0)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [deliverIndexType, setdeliverIndex] = useState(0)
  const { Title } = Typography

  const dataOrder = [
    {
      key: "1",
      age: 32,
      imgz: "西湖区湖底公园1号",
      Specifications: "1",
      number: 20,
      // 2024-09-13 20:00:00
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

  const columnsOrder: any = [
    {
      title: "附件/图纸",
      dataIndex: "imgz",
      key: "imgz",
      render: () => (
        <Space size="middle">
          <div className="flex">
            <div className="mr-[20px]">
              <img className="w-[90px]" src={imgUrl + "car.png"} alt="" />
            </div>
          </div>
        </Space>
      ),
      align: "center",
    },
    {
      title: "建模类型",
      dataIndex: "jmtype",
      key: "jmtype",
      render: () => (
        <Space size="middle">
          <div className="text-[14px] text-[#666666]">
            <span>人像建模</span>
          </div>
        </Space>
      ),
      align: "center",
    },
    {
      title: "材料类型",
      dataIndex: "cltype",
      key: "jmtype",
      render: () => (
        <Space size="middle">
          <div className="text-[14px] text-[#666666]">
            <span>铝合金</span>
          </div>
        </Space>
      ),
      align: "center",
    },
    {
      title: "产品尺寸",
      dataIndex: "Specifications",
      key: "Specifications",
      render: () => (
        <Space size="middle">
          <div className="flex">
            <div className="mr-[20px]">
              <p className="text-[#666666]">长：50.00mm</p>
              <p className="text-[#666666]">宽：65.00mm</p>
              <p className="text-[#666666]">高：86.32mm</p>
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
            <span>2</span>
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
          <div className="text-[18px]">
            <a className="text-[#1366F0]" onClick={moreInformation}>
              更多信息
            </a>
          </div>
        </Space>
      ),
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState(false)

  const moreInformation = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="w-[1200px]">
      <div className="text-left text-[20px] mt-[31px] mb-[29px] text-[#222222]">
        <span>提交订单</span>
      </div>

      <div className="w-[1200px] border border-[#dcdcdc] rounded-[20px] mb-[30px]">
        <div className="flex justify-between">
          <div className="ml-[15px]">
            <Title level={5} style={{ marginTop: "15px", fontSize: "20px", fontWeight: 400 }}>
              <Divider
                type="vertical"
                style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
              />
              收货人信息
            </Title>
          </div>

          <div className="mt-[16px] mr-[15px]">
            <span className="text-[#1366f0] text-[16px]">+添加新的地址</span>
          </div>
        </div>

        {/* 表格 */}

        <div className="w-[1200px] mx-[auto] pl-[30px] pr-[30px] pb-[30px] border-b border-[#dcdcdc]">
          <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
        </div>

        <div className="flex justify-between">
          <div className="ml-[15px]">
            <Title level={5} style={{ marginTop: "15px", fontSize: "20px", fontWeight: 400 }}>
              <Divider
                type="vertical"
                style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
              />
              下单联系人
            </Title>
          </div>

          <div className="mt-[16px] mr-[15px]">
            <span className="text-[#1366f0] text-[16px]"></span>
          </div>
        </div>

        {/* 表格 */}

        <div className="w-[1200px] mx-[auto] pl-[30px] pr-[30px] pb-[30px] border-b border-[#dcdcdc]">
          <Table dataSource={dataSource} columns={columnsXd} pagination={false} bordered />
        </div>

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

        <div className="w-[1200px] mx-[auto] pl-[30px] pr-[30px] pb-[30px] border-b border-[#dcdcdc]">
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

        <div className="w-[1200px] mx-[auto] pl-[30px] pr-[30px] pb-[30px] border-b border-[#dcdcdc]">
          <Table columns={columnsOrder} dataSource={dataOrder} pagination={false} bordered />
        </div>

        <div className="flex justify-between">
          <div className="ml-[15px]">
            <Title level={5} style={{ marginTop: "15px", fontSize: "20px", fontWeight: 400, marginBottom: "25px" }}>
              <Divider
                type="vertical"
                style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
              />
              其他信息
            </Title>
          </div>
        </div>

        <div className="flex mb-[20px]">
          <div className="flex justify-center items-center mr-[74px]">
            <div className="text-left mr-[2px] ml-[30px] text-[18px]">
              <span>发货方式</span>
            </div>
            <div>
              <img className="w-[20px] h-[20px]" src={imgUrl + "kaipiaoxinxi2.png"} alt="" />
            </div>
          </div>

          <div className="flex justify-center items-center relative">
            {deliverList.map((item, index) => {
              return (
                <Button
                  className="mr-[20px] h-[46px] text-[18px]"
                  key={index}
                  color={deliverList[deliverIndexType] == item ? "primary" : undefined}
                  variant="outlined"
                  onClick={() => setdeliverIndex(index)}
                >
                  {item}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="w-[1100px] flex justify-start items-center ml-[30px] mb-[20px]">
          <div className="flex justify-start self-baseline items-center">
            <div className="text-left text-[#222222] text-[18px] mr-[2px]">
              <span>开票信息</span>
            </div>
            <div>
              <img className="w-[20px] h-[20px]" src={imgUrl + "kaipiaoxinxi2.png"} alt="" />
            </div>
          </div>

          <div className="ml-[74px]">
            <div className="flex flex-start">
              <div className="w-[60px] h-[26px] leading-[26px] bg-[#dcdcdc] flex justify-center rounded-[16px] mr-[20px]">
                <span className="text-[#1366f0] text-[16px]">企业</span>
              </div>

              <div className="text-[18px] mt-[1px] mr-[40px]">
                <span>泉州大宇科技有限公司 91350503156494748X</span>
              </div>

              <div className="flex justify-center items-center">
                <div className="mr-[2px]">
                  <img className="w-[16px] h-[17px]" src={imgUrl + "bianji2.png"} alt="" />
                </div>

                <div className="text-[18px]">
                  <span className="underline text-[#1366f0]">修改</span>
                </div>
              </div>
            </div>

            <div className="mt-[20px] text-[#f05113] text-[18px]">
              <div>
                个人无法开专票，请谨慎选择发票类型，我司将发票发送到您的邮箱，未填写邮箱的请前往
                <span className="underline">个人中心</span>填写）
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-[17px]">
          <div className="flex justify-center items-center">
            <div className="text-left mr-[2px] ml-[30px] text-[18px]">
              <span>收据/送货单</span>
            </div>
            <div>
              <img className="w-[20px] h-[20px]" src={imgUrl + "kaipiaoxinxi2.png"} alt="" />
            </div>
          </div>

          <div className="flex ml-[39px]">
            {ScanTypes.map((item, index) => {
              return (
                <Button
                  className="mr-[20px] w-[170px] h-[46px] text-[18px]"
                  key={index}
                  color={ScanTypes[indexType] == item ? "primary" : undefined}
                  variant="outlined"
                  onClick={() => setIndexType(index)}
                >
                  {item}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="flex mb-[17px]">
          <div className="ml-[30px] text-[18px] text-[#222222] mr-[121px]">
            <span>备注</span>
          </div>

          <div className="w-[668px] bg-[#ffffff] rounded-[8px]">
            <TextArea rows={4} placeholder="有其他特殊要求请在此说明..." />
          </div>
        </div>
      </div>

      <div className="w-[1200px] rounded-[20px]  border border-[#dcdcdc] mb-[50px] pb-[30px]">
        <div className="flex">
          <div className="mt-[33px] ml-[30px]">
            <div className="text-left text-[16px] text-[#222222]">
              <p className="mb-[4px]">建模数量：2件</p>
              <p className="mb-[4px]">运费： ￥5 </p>
              <p className="mb-[4px]">预计发货日期： 2024-09-13 20:00:00</p>
            </div>
          </div>

          <div className="text-left flex mt-[29px]">
            <p className="text-[16px] text-[#222222]">应付总额(含税)：</p>

            <p className="text-[22px] text-[#f05113] mt-[-6px]">人工报价</p>
          </div>
        </div>

        <div className="flex justify-end mr-[30px]">
          <div className="w-[150px] h-[50px] leading-[50px] bg-[#f5f5f5] rounded-[8px] mr-[8px] text-[18px] text-[#999999]">
            <button>返回上一步</button>
          </div>

          <div className="w-[150px] h-[50px] leading-[50px] bg-[#1366f0] rounded-[8px] text-[#ffffff] text-[18px]">
            <button>提交订单</button>
          </div>
        </div>
      </div>

      {/* <ModalXzz title="更多信息" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showClose={true}>
        <div className="m-[30px] w-[752px] h-[185px] font-normal text-[16px] text-[#666666]">
          <p className="mb-[7px]">建模类型：人像建模</p>
          <p className="mb-[7px]">材料类型：铝合金 </p>
          <p className="mb-[7px]">产品尺寸：长50.32*宽62.32*高83.00（mm）</p>
          <p className="mb-[7px]">数量：2</p>
          <p className="mb-[7px]">
            建模描述：描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案
          </p>
        </div>
      </ModalXzz> */}
      <ModalLqh2
        title="更多信息"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        width="820px"
        classname="custom-modal-moreinformation"
        closable={true}
        content={
          <div className="m-[30px] w-[752px] h-[185px] font-normal text-[16px] text-[#666666]">
            <p className="mb-[7px]">建模类型：人像建模</p>
            <p className="mb-[7px]">材料类型：铝合金 </p>
            <p className="mb-[7px]">产品尺寸：长50.32*宽62.32*高83.00（mm）</p>
            <p className="mb-[7px]">数量：2</p>
            <p className="mb-[7px]">
              建模描述：描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案描述文案
            </p>
          </div>
        }
      ></ModalLqh2>
    </div>
  )
}

export default SubmitOrder
