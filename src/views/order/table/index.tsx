import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, message, Radio, Space, Timeline, Upload } from "antd"
import { UploadProps } from "antd/es/upload/interface"
import React from "react"

import EmptyLqh from "@/components/Emptylqh"
// 引入新的弹框样式
import ModalLqh2 from "@/components/ModalLqh2"

// 旧的弹框
import { FORMHEADER, mockData } from "./common"

const OrderTable: React.FC = () => {
  // console.log("TCL: dataList", dataList)
  // const [isModalOpenTk, setIsModalOpenTk] = useState(false)
  const { isModalOpenTk, setIsModalOpenTk } = useUserOrderStore((state) => state)
  const [isModalOpenSuccess, setisModalOpenSuccess] = useState(false)

  // 查看物流
  const { isViewLogistics, setIsViewLogistics } = useUserOrderStore((state) => state)
  const arr = [
    { id: 1, title: "【泉州市】 泉州市集散中心 已发出", time: "2024-09-13 12:28:00" },
    { id: 2, title: "【泉州市】 快件已到达泉州市", time: "2024-09-13 12:28:00" },
    { id: 3, title: "【泉州市】 【泉州市】 快件已到达晋江磁灶", time: "2024-09-13 12:28:00" },
    { id: 4, title: "【泉州市】 快件已揽收", time: "2024-09-13 12:28:00" },
  ]
  const arrItem = arr.map((item, index) => {
    return {
      color: index === 0 ? "#1366F0" : "#999999",
      children: (
        <>
          <p className={"text-[18px] " + "text-" + (index === 0 ? "[#1366F0]" : "[#999999]")}>{item.title}</p>
          <p className={"text-[14px] " + "text-" + (index === 0 ? "[#1366F0]" : "[#999999]")}>{item.time}</p>
        </>
      ),
    }
  })
  const { expendedNodes, toggleExpand } = useUserOrderStore((state) => state)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  // 文件列表模拟已有图片链接数组
  const [fileList, setFileList] = useState<UploadFile[]>([])

  // 处理文件上传的变化
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList, "newFileList")

    setFileList(newFileList as UploadFile[]) // 类型断言为 UploadFile[]
    // console.log(newFileList, "newFileList新图片数据") //thumbUrl
    // setuploadImg(newFileList)
  }

  // 查看物流
  const ViewLogisticsbtn = () => {
    setIsViewLogistics(true)
    // 调用接口,获取查看物流信息数据
  }

  interface UploadFile {
    uid: string
    name: string
    // status?: UploadFileStatus // 注意：这是严格的类型
    url?: string
    // 其他字段省略
    thumbUrl?: string
  }
  const { TextArea } = Input
  const onFinish = (values: any) => {
    console.log("Success:", values)
    const fileListArr: (string | undefined)[] = []
    fileList.map((item) => {
      fileListArr.push(item.thumbUrl)
    })

    // 传参给后端 --fileList
    const params = {
      Reasonforrefund: values.Reasonforrefund,
      ApplicationDescription: values.ApplicationDescription,
      // 将上传的图片链接添加到一个数组里面,然后传给后端
      uploadpic: fileListArr,
    }
    // 判断校验 没选择退款原因 申请说明 上传图片,不让弹框，提示用户选择退款原因，申请说明，上传图片
    if (params.Reasonforrefund === undefined || params.Reasonforrefund === "") {
      // 退款原因为空的时候,不弹出申请退款成功弹框页面
      setisModalOpenSuccess(false)
      // 提示用户选择退款原因
      return messageApi.open({
        type: "error",
        content: "请选择退款原因",
      })
    }
    // 申请说明为空的时候,不弹出申请退款成功弹框页面
    // if (params.ApplicationDescription === undefined || params.ApplicationDescription === "") {
    //   setisModalOpenSuccess(false)
    //   // 提示用户请输入申请说明
    //   return messageApi.open({
    //     type: "error",
    //     content: "请输入申请说明",
    //   })
    // }

    // 上传图片为空的时候,不弹出申请退款成功弹框页面
    // if (params.uploadpic.length === 0) {
    //   setisModalOpenSuccess(false)
    //   // 提示用户请上传图片
    //   return messageApi.open({
    //     type: "error",
    //     content: "请上传图片",
    //   })
    // }

    // 有选择数据的情况下,弹出申请成功退款,然后关闭申请退款弹框
    if (params.Reasonforrefund !== undefined || params.Reasonforrefund !== "") {
      // 关闭申请退款弹框
      setIsModalOpenTk(false)
      // 判断弹出申请成功退款弹框，清空表单数据
      // console.log(isModalOpenSuccess, "isModalOpenSuccess")
      // 弹出申请成功退款
      setisModalOpenSuccess(true)
      // 弹出申请成功退款的弹框,
      if (isModalOpenSuccess === false) {
        // 清空表单数据
        form.resetFields()
      }
    }
    if (params.ApplicationDescription !== undefined || params.ApplicationDescription !== "") {
      // 关闭申请退款弹框
      setIsModalOpenTk(false)
      // 弹出申请成功退款
      setisModalOpenSuccess(true)
      // 弹出申请成功退款的弹框,
      if (isModalOpenSuccess === false) {
        // 清空表单数据
        form.resetFields()
      }
    }
    // 这边接申请退款接口
    console.log(params, "params传给后端参数")
    // 上传图片判断，可上传可不传, 这是判断强制上传的代码,先注释
    // 上传图片的长度不等于0,代表有上传图片,就关闭申请退款弹框, 弹出申请成功退款
    // if (params.uploadpic.length !== 0) {
    //   // 关闭申请退款弹框
    //   setIsModalOpenTk(false)
    //   // 弹出申请成功退款
    //   setisModalOpenSuccess(true)
    //   if (isModalOpenSuccess === false) {
    //     // 清空上传图片数据
    //     // fileListArr = []
    //     alert("清空上传图片数据")
    //   }
    // }

    //  清空上传图片数据
    if (isModalOpenSuccess === false) {
      // 清空上传图片数据

      setFileList([]) // 将 fileList 设为空数组
    }
  }

  const onChangeText = (e: any) => {
    console.log(e)
  }

  // 联系客服
  const customerService = () => {}

  // 申请退款成功弹框 RequestarefundBtnTk
  const RequestarefundBtnTk = () => {
    // // 清空表单数据
    // form.resetFields()
    // // 点击关闭申请退款弹框
    // setIsModalOpenTk(false)
    // setisModalOpenSuccess(true)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 联系客服
  const customerServiceBtn = () => {}

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        className="mt-[8px]"
        // style={{
        //   marginTop: 8,
        // }}
      >
        上传图片
      </div>
    </button>
  )

  const [valueRadio, setValueRadio] = useState(1)
  const onChange = (e: any) => {
    setValueRadio(e.target.value)
  }
  const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL
  const emptyDom = (
    <div className="text-center flex justify-center text-[#999]" style={{ height: "600px", alignItems: "center" }}>
      <div>
        <EmptyLqh description={<span style={{ color: "#666666" }}>暂无待付款订单</span>} />
      </div>
    </div>
  )

  const listDom = () => {
    return mockData.map((item, index) => {
      return (
        <div className="content " key={index}>
          <div
            className="titlebox flex items-center justify-between px-[30px]"
            style={{ border: "1px solid #DCDCDC", height: "46px", background: "#F5F5F5" }}
          >
            <div className="left">
              <span>下单时间：</span>
              <span> 2024-09-12 16:33:30</span>
              <span>订单编号: </span>
              <span>2047367575342</span>
              <span>标准交期: </span>
              <span>48小时</span>
              <span>预计交期: </span>
              <span>2024-09-13 16:33:30 前</span>
            </div>
            <div className="right">联系客服</div>
          </div>
          {/* <DataList orderItem={item} /> */}
          <div className="list flex">
            <div
              className="left flex-[2]"
              style={{ overflow: "hidden", height: expendedNodes[index] ? " auto" : "110px" }}
            >
              <DataList itemList={item.orders} />
            </div>
            <div className="right flex-1 flex justify-around text-center items-center h-[110px]">
              <div className="status flex-1">
                <div className="text-[#F05113] text-[16px]">{"已完成"}</div>
                <div className="f mt-[15px] underline-xzz">订单详情</div>

                <div onClick={ViewLogisticsbtn} className="f mt-[15px] underline-xzz">
                  查看物流
                </div>
              </div>
              <div className="flex-1 total text-[#F05113] text-[18px]"> ￥ {item.total} </div>
              <div className="flex-1 operation">
                <OperateNode currentData={item} />
              </div>
            </div>
          </div>
          {item.orders.length > 1 && (
            <div className="open flex items-center justify-center">
              <div className="tip">已折叠{item.orders.length}个零件</div>
              <div className="operate cursor-pointer" onClick={() => toggleExpand(index + "")}>
                {expendedNodes[index] ? <div className="icon">收起</div> : <div className="icon">展开</div>}
              </div>
            </div>
          )}
        </div>
      )
    })
  }
  return (
    <div className=" rounded-[16px] overflow-hidden my-[20px] " style={{ border: "1px solid #DCDCDC" }}>
      <div
        className="header   flex justify-around text-center  items-center  h-[55px]"
        style={{ borderBottom: "1px solid #DCDCDC" }}
      >
        {FORMHEADER.map((item, index) => {
          return (
            <div className="text-[#222]" style={{ flex: item.flex, fontSize: "16px" }} key={index}>
              {item.title}
            </div>
          )
        })}
      </div>
      <div style={{ maxHeight: "1000px", minHeight: "600px", overflowY: "scroll" }}>
        {mockData.length === 0 ? emptyDom : listDom()}
      </div>

      <ModalLqh2
        width="820px"
        open={isModalOpenTk}
        onCancel={() => setIsModalOpenTk(false)}
        onOk={() => setIsModalOpenTk(false)}
        title="申请退款"
        classname="custom-modal-sqtktk"
        closable={true}
        content={
          <div className="w-[100%] max-w-[810px] h-[86.02vh] pt-[23px] pl-[30px]">
            <div className="flex justify-start items-center mb-[45px]">
              <div className="mr-[6px]">
                <img className="w-[22px]" src={imgUrl + "gantanhao.png"} alt="" />
              </div>

              <div className="text-[16px] text-[#222222]">
                <span>请先联系客服或致电13669863000协商沟通达成一致后再申请退款以节约您的时间成本！</span>
              </div>
            </div>

            <div className="flex justify-start items-center">
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 6,
                }}
                initialValues={{
                  remember: true,

                  Reasonforrefund: valueRadio,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item name="Reasonforrefund">
                  <Radio.Group onChange={onChange} value={valueRadio}>
                    <Space direction="vertical">
                      <Radio className="mb-[18px] text-[16px] text-[#222222]" value={1}>
                        与商家沟通达成一致
                      </Radio>
                      <Radio className="mb-[18px] text-[16px] text-[#222222]" value={2}>
                        产品破损
                      </Radio>
                      <Radio className="mb-[18px] text-[16px] text-[#222222]" value={3}>
                        未收到货/货物不一致
                      </Radio>
                      <Radio className="mb-[18px] text-[16px] text-[#222222]" value={4}>
                        质量问题
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Form.Item style={{ marginBottom: "16px" }}>
                  <div className="text-[18px]">
                    <span>申请说明</span>
                  </div>
                </Form.Item>

                <Form.Item name="ApplicationDescription">
                  <TextArea
                    className="w-[760px] h-[193px] text-[16px]"
                    placeholder="请输入申请退款的具体描述..."
                    allowClear
                    onChange={onChangeText}
                  />
                </Form.Item>

                <Form.Item label="" name="uploadpic">
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                </Form.Item>

                <Form.Item className="mb-[0]">
                  <div className="flex justify-center pb-[30px]">
                    <Button
                      onClick={customerService}
                      className="mr-[20px] w-[160px] h-[56px] text-[18px] text-[#1366F0] font-[400]"
                    >
                      <img className="w-[22px]" src={imgUrl + "servicetwo.png"}></img>
                      联系客服
                    </Button>
                    <>
                      {contextHolder}
                      <Space>
                        <Button
                          onClick={RequestarefundBtnTk}
                          type="primary"
                          htmlType="submit"
                          className="mr-[20px] w-[160px] h-[56px] text-[18px] text-[#ffffff] font-[400]"
                        >
                          申请退款
                        </Button>
                      </Space>
                    </>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        }
      />

      <ModalLqh2
        width="820px"
        open={isModalOpenSuccess}
        onCancel={() => setisModalOpenSuccess(false)}
        onOk={() => setisModalOpenSuccess(false)}
        title="申请退款"
        classname="custom-modal-sqtktk"
        closable={true} //申请退款需要显示右上角关闭按钮 />
        content={
          <div className="w-[100%] max-w-[820px] h-[508px] pt-[39px]">
            <div className="flex justify-center items-center mb-[30px]">
              <img className="w-[42px]" src={imgUrl + "dagou.png"} alt="" />
            </div>

            <div className="text-center text-[26px] text-[#222222] mb-[39px]">
              <span>申请成功</span>
            </div>

            <div className="w-[100%] max-w-[652px] h-[156px] font-[400] text-[16px] mx-auto text-[#222222]">
              <div className="mb-[39px]">
                <span>
                  退款说明：申请退款后系统将在72小时内审核您的申请，或联系客服协商沟通达成一致系统
                  将在第一时间处理您的退款申请。
                </span>
              </div>

              <div className="mb-[39px]">
                <span>退款金额：预估金额</span>
                <span>￥93.00,</span>
                <span>实际金额请以最终审核或联系客服沟通金额为准。</span>
              </div>

              <div className="mb-[60px]">
                <span>审核时间：周一至周六 上午9:00~12:00 下午14:00~19:00。</span>
              </div>

              <div className="text-center">
                <Button onClick={customerServiceBtn} className="w-[160px] h-[56px] text-[18px] text-[#1366F0]">
                  <img className="w-[22px]" src={imgUrl + "servicetwo.png"}></img>
                  联系客服
                </Button>
              </div>
            </div>
          </div>
        }
      />

      <ModalLqh2
        width="820px"
        open={isViewLogistics}
        onCancel={() => setIsViewLogistics(false)}
        onOk={() => setIsViewLogistics(false)}
        title="查看物流"
        classname="custom-modal-ckwl"
        closable={true} //查看需要显示右上角关闭按钮 />
        content={
          <div className="w-[820px]  p-[30px] pb-[0px]">
            <div className="flex text-[18px] text-[#222222] mb-[30px]">
              <div className="mr-[20px]">
                <span>EMS 邮政快递</span>
              </div>
              <div>
                <span>单号: YZ9589446545747</span>
              </div>
            </div>
            <div>
              <Timeline items={arrItem} />
            </div>
          </div>
        }
      />
    </div>
  )
}
//   {/* 物流进度条 arr =  [{id: 1 title: 【泉州市】 泉州市集散中心 已发出  time: 2024-09-13 12:28:00}] */}

interface DataListProps {
  itemList: any[]
}

const DataList: React.FC<DataListProps> = ({ itemList }) => {
  {
    return itemList.map((iten, indey) => {
      return (
        <div
          className="flex justify-around text-center items-center h-[110px] relative table-xzz"
          key={indey}
          // style={{ borderBottom: "1px solid #DCDCDC", borderRight: "1px solid #DCDCDC" }}
        >
          <div className="text-[#222] text-hidden flex-1">{iten[FORMHEADER[0]["key"]]}</div>
          <div className="specification flex-[3]">{iten[FORMHEADER[1]["key"]]}</div>
          <div className="price flex-1">{iten[FORMHEADER[2]["key"]]}</div>
          <div className="quantity flex-1">{iten[FORMHEADER[3]["key"]]}</div>
        </div>
      )
    })
  }
}

// const DataList00: React.FC<DataListProps> = ({ orderItem }) => {
//   return orderItem.orders.map((item, index) => {
//     return (
//       <div className="flex justify-around text-center items-center h-[110px] relative table-xzz" key={index}>
//         {FORMHEADER.map((headerItem, headerIndex) => {
//           const lineData = item[headerItem["key"]]
//           return (
//             <div className="text-[#222] text-hidden" style={{ flex: headerItem.flex }} key={headerIndex}>
//               {lineData}
//             </div>
//           )
//         })}
//       </div>
//     )
//   })
// }

const OperateNode = (props: any) => {
  // "all" | "pending" | "processing" | "shipped" | "completed" | "cancelled" | "refund"

  // const [isModalOpenTk, setIsModalOpenTk] = useState(false)
  const { isModalOpenTk, setIsModalOpenTk } = useUserOrderStore((state) => state)

  // 申请退款
  const RequestArefundBtn = () => {
    console.log(isModalOpenTk)

    setIsModalOpenTk(true)
  }

  const currentData = props.currentData
  switch (currentData.status) {
    case "pending":
      return (
        <div className="status ">
          <div className="s underline-xzz text-[#1366F0] text-[20px] ">立即付款</div>
          <div className="s underline-xzz text-[#999] text-[16px] mt-[20px]">取消订单</div>
        </div>
      )
    case "processing":
      return (
        <div onClick={RequestArefundBtn} className="s underline-xzz text-[#999] text-[16px]">
          申请退款
        </div>
      )
    case "shipped":
      return (
        <div className="status ">
          <div className="s underline-xzz text-[#1366F0] text-[20px] ">确认收货</div>
          <div className="s underline-xzz text-[#999] text-[16px] mt-[20px]">申请退款</div>
        </div>
      )
    case "completed":
      return <div className="status">已完成</div>
    case "cancelled":
      return <div className="s underline-xzz text-[#1366F0] text-[20px]">取消退款</div>
    case "deleted":
      return <div className="s underline-xzz text-[#999] text-[16px]">删除订单</div>

    default:
      return <div className="s underline-xzz text-[#999] text-[16px]">删除订单</div>
  }
}
export default OrderTable
