import { PlusOutlined } from "@ant-design/icons"
import { Button, Card, Checkbox, Divider, Form, Input, InputNumber, Radio, Row, Typography } from "antd"

//Col

const ScanOrderForm = () => {
  const { Title } = Typography

  // const ScanMethods = [
  //   {
  //     image: "/public/scan/手持激光扫描.png",
  //     text: "手持激光扫描",
  //   },
  //   {
  //     image: "/public/scan/固定式扫描.jpg",
  //     text: "固定式扫描",
  //   },
  //   {
  //     image: "/public/scan/手持白光扫描.png",
  //     text: "手持白光扫描",
  //   },
  // ]

  const ScanTypes = ["人像", "模具", "工艺品", "木雕", "石雕", "泥雕", "陶瓷", "零配件", "琉璃", "其他"]

  const DeliveryOptions = [
    { value: "economy", label: "加急：4个工作日（收费高）" },
    { value: "standard", label: "标准：7个工作日（收费低）" },
    { value: "urgent", label: "经济：12个工作日（不收费）" },
  ]

  const ScanPrecisionOptions = [
    { value: "low", label: "0.02mm~0.2mm（默认值）" },
    { value: "medium", label: "0.01mm~0.1mm" },
    { value: "high", label: "0.005mm~0.05mm" },
  ]

  // const ReportOptions = [
  //   { value: 'no', label: '否' },
  //   { value: 'yes', label: '是' },
  // ]

  // const ScanQuantityOptions = [
  //   { value: "1", label: "1" },
  //   { value: "2", label: "2" },
  //   { value: "3", label: "3" },
  //   // Add more options as needed
  // ]

  const OutputFormatOptions = [
    { value: "IGS", label: "igs" },
    { value: "STL", label: "stl" },
  ]

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo)
  // }
  // const options = [
  //   { label: '是', value: '是' },
  //   { label: '否', value: '否' },
  // ];
  const [form] = Form.useForm()

  // const handleFinish = (values) => {
  //   console.log('Received values of form: ', values)
  //   onFinish(values)
  // }
  const SurfaceTreatmentOptions = [
    { value: "no", label: "不能" },
    { value: "yes", label: "能" },
  ]

  const submitConfirm = () => {}

  const onChangeAgree = (e: any) => {
    console.log(e, "e")
  }

  const [valuePxxj, setValuePxxj] = useState("no")
  const onChangeRadio = (e: any) => {
    setValuePxxj(e.target.value)
  }

  const [indexType, setIndexType] = useState(0)

  // form.setFieldsValue(indexType)

  return (
    <Form
      form={form}
      initialValues={{
        Sizerange: "mysite", // 在 initialValues 中设置初始值
        reportNeeded: 1,
        saomiaoshuliang: 5,
      }}
    >
      <Card
        bordered={true}
        className="mt-[31px] rounded-[10px] mb-[21px] 2xl:w-[1200px] xl:w-[100%] lg:w-[100%] md:w-[94vw] sm:w-[92vw]"
      >
        <div className="text-left w-[90%] ml-[5%]">
          {/* 扫描案例 1.6 先注释 */}
          {/* <Title level={5}>
            <Divider
              type="vertical"
              style={{ borderWidth: "6px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
            />
            扫描案例
          </Title> */}
          {/* <Row gutter={[16, 16]}>
            {ScanMethods.map((_method, index) => (
              <Col span={8} key={index}> */}
          {/*<Card
              hoverable
              style={{width:'200px',textAlign: 'center', boxShadow: 'darkgrey 10px 10px 30px 5px'}}
              cover={<img src={method.image} alt={method.text}  />}
            >
              <Text strong >{method.text}</Text>
            </Card>*/}
          {/* <video src="your-video-url.mp4" controls width={340} height={230} autoPlay muted />
              </Col>
            ))}
          </Row> */}

          <Title level={5} style={{ marginTop: "15px" }}>
            <Divider
              type="vertical"
              style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
            />
            扫描类型
          </Title>
          <Form.Item>
            {/* <Card bordered={true} style={{ borderRadius: "10px" }}> */}
            {/* <Space direction="vertical" wrap size={12}> */}
            {/* <Row> */}

            <div className="bg-[#ffffff] rounded-[20px] border border-[#DCDCDC] flex justify-center items-center flex-wrap pt-[28px] 2xl:w-[880px] xl:w-[77%] lg:w-[95%] md:w-[90%] sm:w-[100%]">
              {ScanTypes.map((type, index) => (
                <div className="w-[148px] h-[56px] mb-[30px] mr-[20px]" key={index}>
                  <Button
                    className="w-[148px] h-[56px] mb-[30px] mr-[20px]"
                    color={ScanTypes[indexType] == type ? "primary" : undefined}
                    key={index}
                    block
                    // style={{ width: "148px" }}
                    variant="outlined"
                    onClick={() => setIndexType(index)}
                  >
                    {type}
                  </Button>
                </div>
              ))}
            </div>
            {/* </Row> */}
            {/* <Row>
              {ScanTypes2.map((type, index) => (
                <Button key={index} style={{ marginLeft: "10px" }} size="large">
                  {type}
                </Button>
              ))}
            </Row> */}
            {/* </Space> */}
            {/* </Card> */}
          </Form.Item>

          <Title level={5} style={{ marginTop: "15px" }}>
            <Divider
              type="vertical"
              style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
            />
            交货日期
          </Title>
          <Form.Item>
            <div className="flex">
              {DeliveryOptions.map((option, index) => (
                <div
                  className="h-[46px] bg-[#ffffff] rounded-[8px] mr-[20px] text-[14px]   2xl:w-[260px] mb-[0px]  xl:w-[16.5vw] lg:w-[19vw] text-[14px] md:w-[25vw] sm:w-[25vw] text-[0.5rem]"
                  key={index}
                >
                  <Button
                    className="h-[46px] bg-[#ffffff] rounded-[8px] mr-[20px] text-[14px]   ml-[10px] 2xl:w-[260px] text-[14px] xl:w-[16.5vw] text-[14px] lg:w-[19vw] text-[14px] md:w-[25vw] text-[14px] sm:w-[25vw] text-[0.88rem]"
                    key={index}
                    value={option.value}
                  >
                    {option.label}
                  </Button>
                </div>
              ))}
            </div>
            {/* </Radio.Group> */}
          </Form.Item>

          <Title level={5}>
            <Divider
              type="vertical"
              style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
            />
            产品零件
          </Title>

          <Form.Item
            label="尺寸范围"
            name="Sizerange"
            className="text-left"
            rules={[
              {
                required: true,
                message: "请输入长",
              },
            ]}
          >
            <div className="flex">
              <Input className="w-[20%] mr-[20px]" addonBefore="长" />

              <Input className="w-[20%] mr-[20px]" addonBefore="宽" />

              <Input className="w-[20%] mr-[20px]" addonBefore="高" />

              <span className="inline-block mt-[4px]">（单位：cm）</span>
            </div>
          </Form.Item>

          <Form.Item label="能否喷显影剂:" rules={[{ required: true }]}>
            <Radio.Group onChange={onChangeRadio} value={valuePxxj}>
              {SurfaceTreatmentOptions.map((option) => {
                return (
                  <Radio key={option.value} value={option.value} style={{ marginLeft: "10px" }}>
                    {option.label}
                  </Radio>
                )
              })}
            </Radio.Group>
          </Form.Item>

          <Form.Item label="扫描精度:" rules={[{ required: true }]}>
            {ScanPrecisionOptions.map((option, index) => (
              <Button
                key={index}
                value={option.value}
                className="ml-[10px] mb-[0px] 2xl:mb-[0px] xl:mb-[0px] lg:mb-[0px] md:mb-[0px] sm:mb-[20px]"
              >
                {option.label}
              </Button>
            ))}
          </Form.Item>

          <Form.Item label="是否需要检测报告:" name="jianecbaogao" rules={[{ required: true }]}>
            <Radio.Group name="radiogroup">
              <Radio value={1}>否</Radio>
              <Radio value={2}>是</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="扫描数量:" required>
            {/* <Radio.Group buttonStyle="solid">
              {ScanQuantityOptions.map((option, index) => (
                <Button key={index} value={option.value} style={{ marginLeft: "10px" }} size="large">
                  {option.label}
                </Button>
              ))}
            </Radio.Group> */}
            {/* style={{ width: "15%" }} */}
            <InputNumber
              className="2xl:w-[20%] xl:w-[15%] lg:w-[15%] md:w-[20%] sm:w-[29%]"
              addonBefore="-"
              addonAfter="+"
              defaultValue={5}
            />
          </Form.Item>

          <Form.Item label="出图格式:" rules={[{ required: true }]}>
            <Radio.Group buttonStyle="solid">
              {OutputFormatOptions.map((option, index) => (
                <Button key={index} value={option.value} className="ml-[10px]" size="large">
                  {option.label}
                </Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item label="上传图纸">
            <Row>
              <button className="w-[112px] h-[112px] bg-[none] border-[1px] border-[#DCDCDC]" type="button">
                <PlusOutlined className="text-[#dcdcdc]" />

                <div className="mt-[8] text-[#dcdcdc]">Upload</div>
              </button>
            </Row>
            <Row>
              <span>格式：png、jpg、jpeg</span>
            </Row>
          </Form.Item>

          <Form.Item label="备注:" name="note">
            <Input.TextArea placeholder="请输入备注信息" rows={10} />
          </Form.Item>
        </div>

        <Form.Item>
          <div className="w-[100%] flex justify-between ">
            <div className="flex justify-between">
              <Checkbox className="mr-[4px]" onChange={onChangeAgree}></Checkbox>

              <div className="text-[16px] mt-[15px] ">
                <div>
                  <span className="text-[16px] text-[#222222]">我已阅读并同意</span>
                  <span className="text-[#1366F0] cursor-pointer">《保密协议》</span>
                  <span className="text-[#1366F0] cursor-pointer">《3D扫描下单必看》</span>
                  <span className="text-[#1366F0] cursor-pointer">《售后说明》</span>
                </div>
              </div>
            </div>

            <div className="2xl:w-[462.8px] xl:w-[44%] lg:w-[45%] md:w-[89%] sm:w-[100vw]">
              <span className="text-[#222222] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[19px] sm:text-[14px]">
                金额:
              </span>

              <span className="text-[#F05113] inline-block mr-[30px] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[19px] sm:text-[14px]">
                人工报价
              </span>

              <Button
                type="primary"
                className="mr-[15px] h-[56px] rounded-[8px]  2xl:w-[130px] xl:w-[25%]  lg:w-[23%] text-[16px] md:w-[25%] sm:w-[25%] "
                htmlType="submit"
                onClick={submitConfirm}
              >
                加入购物车
              </Button>
              <Button
                type="primary"
                className="mr-[15px] h-[56px] rounded-[8px] text-[18px] 2xl:w-[130px] text-[18px] xl:w-[25%] text-[18px] lg:w-[23%] text-[16px] md:w-[23%] sm:w-[23%]"
                htmlType="submit"
                onClick={submitConfirm}
              >
                提交订单
              </Button>
            </div>
          </div>
        </Form.Item>
      </Card>
    </Form>
  )
}

export default ScanOrderForm
