import { Button, Form, Input, message, Select, Space, Tooltip } from "antd"

import useCountdown from "@/hooks/useCountdown"
import { GetCompanyApi, UpdateCompanyApi } from "@/network/api/company"
import { useUserStore } from "@/store/user"
import { openingbankaccountNumberChange, validatePhoneNumber, validateVerificationCode } from "@/utils/validators"

const { Option } = Select

function CompanyInformationLqh() {
  const [messageApi, contextHolder] = message.useMessage()
  // 倒计时方法startCountdown
  const { remainingTime, startCountdown } = useCountdown(60, "countdown")
  const userStore = useUserStore()
  const onFinish = async (values: any) => {
    console.log("✨ 🍰 ✨ xzz2021: onFinish -> values", values)
    // return
    //  泉州大宇科技  34564566547  6786597890976567  福建省泉州市丰泽区北峰街道
    // 传给后端参数
    const params = {
      id: userStore.userInfo.id,
      tax_no: values.taxid,
      bank_no: values.Accountopeningbankaccount,
      bank_name: "招商银行",
      address: values.address,
      company_name: values.enterpriseName,
      phone: values.Mobileverification,
      code: values.Verificationcode,
    }
    console.log(params, "传表单给后端参数")
    const res = await UpdateCompanyApi(params)
    console.log("✨ 🍰 ✨ xzz2021: res", res)
  }

  const getInfo = async () => {
    const res = await GetCompanyApi({ id: userStore.userInfo.id })
    const data = res.data
    form.setFieldsValue({
      taxid: data.tax_no,
      Accountopeningbankaccount: data.bank_no,
      Accountopeningbankaccounthead: data.bank_name,
      address: data.address,
      enterpriseName: data.company_name,
    })
  }

  useEffect(() => {
    getInfo()
  }, [])

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  const [form] = Form.useForm()

  // 校验开户行账号 changBankNum
  const changBankNum = (e: any) => {
    // // 去除空格
    // 这边相同的方法第一种方法:可以把空格替换掉，去除空格，有提示错误
    form.setFieldValue("Accountopeningbankaccount", e.target.value.replaceAll(" ", ""))
    form.setFieldValue("Accountopeningbankaccounthead", e.target.value.replaceAll(" ", ""))
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        className="w-[148px] h-[56px] leading-[56px] text-[18px]"
        labelRender={(props: any) => {
          return (
            <div className="text-[18px]">
              <i className="text-[#1366F0] w-[36px] h-[50px]"></i>
              {props.value}
            </div>
          )
        }}
      >
        <Option value="中国大陆+86">中国大陆+86</Option>
        <Option value="中国大陆+87">中国大陆+87</Option>
      </Select>
    </Form.Item>
  )

  const [phoneNumyan, setPhoneNumyan] = useState("") // 保存手机号

  // 点击获取验证码
  const handleGetCaptcha = async () => {
    try {
      // 校验手机号输入框--成功的状态
      const values = await form.validateFields(["Mobileverification"])
      //  保存手机号
      setPhoneNumyan(values.Mobileverification)
      console.log(phoneNumyan) //把这个变量传给获取验证码接口

      // 发送验证码逻辑
      // setLoading(true);
      setTimeout(() => {
        messageApi.success("验证码已发送至手机号：" + values.Mobileverification)
        // setLoading(false);
      }, 1000)
      //   console.log(phoneNumyan) //调用获取验证码接口,把手机号传给获取验证码接口
      //   //   // 这里可以调用后端接口获取验证码和调用倒计时方法startCountdown() // 开始倒计时
      startCountdown() // 开始倒计时
    } catch (errorInfo) {
      // 失败的状态
      console.log("校验失败:", errorInfo)
      // 不需要手动处理错误提示，Form.Item 会自动显示
    }
  }

  return (
    <div className="w-[920px] h-[677px] bg-[#ffffff] rounded-[10px] border border-[#dcdcdc] p-[30px] flex flex-col max-w-[920px] 2xl:w-[100vw] xl:w-[98%] lg:w-[86%] md:w-[88%] sm:w-[88%]">
      {contextHolder}

      <div className="text-left text-[20px] text-[#222222] mb-[30px]">
        <span>公司信息</span>
      </div>

      <div className="flex text-left">
        <Form
          // name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 3 }}
          form={form}
          initialValues={{
            prefix: "中国大陆+86",
          }}
        >
          <Form.Item
            label={<span className="text-[18px] text-[#666666]">企业名称</span>}
            name="enterpriseName"
            className="leading-[56px]"
            rules={[
              {
                required: true,
                message: "请输入企业名称",
              },
            ]}
          >
            <Input
              className="2xl:w-[660px] xl:w-[35vw] lg:w-[34vw] md:w-[32vw] sm:w-[30vw] h-[56px] text-[18px]"
              placeholder="请输入企业名称"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[18px] text-[#666666]">税号</span>}
            name="taxid"
            className="leading-[56px]"
            rules={[
              {
                required: true,
                message: "请输入税号",
              },
            ]}
          >
            <Input
              className="2xl:w-[660px] xl:w-[35vw] lg:w-[34vw] md:w-[32vw] sm:w-[30vw] h-[56px] text-[18px]"
              placeholder="请输入税号"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[18px] text-[#666666]">开户行账号</span>}
            className="leading-[56px] mr-[5px]"
            required
            name="Accountopeningbankaccounthead"
          >
            <Space>
              <Form.Item
                name="Accountopeningbankaccount"
                rules={[
                  {
                    validator: (_, value) => openingbankaccountNumberChange(value),
                  },
                ]}
                noStyle
              >
                <Input
                  maxLength={19}
                  className="2xl:w-[380px] xl:w-[28vw] lg:w-[24vw] md:w-[20vw] sm:w-[18vw] h-[56px] text-[18px]"
                  onChange={changBankNum}
                  placeholder="请输入开户行账号"
                />
              </Form.Item>

              <Tooltip title="开户行名称">
                <div>招商银行</div>
              </Tooltip>
            </Space>
          </Form.Item>

          <Form.Item
            // style={{ fontSize: "18px", color: "#666666" }}
            label={<span className="text-[18px] text-[#666666]">地址</span>}
            name="address"
            className="leading-[56px]"
          >
            <Input
              className="2xl:w-[660px] xl:w-[35vw] lg:w-[34vw] md:w-[32vw] sm:w-[30vw] text-[18px] h-[56px]"
              placeholder="请输入地址"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[18px] text-[#666666]">手机验证</span>}
            name="Mobileverification"
            className="leading-[56px]"
            required
            rules={[
              {
                validator: (_, value) => validatePhoneNumber(value),
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              classNames={{ input: "h-[56px] text-[18px]" }}
              className="2xl:w-[660px] xl:w-[35vw] lg:w-[34vw] md:w-[32vw] sm:w-[30vw]"
              placeholder="请输入手机验证"
              maxLength={11}
              onChange={(e) => form.setFieldValue("Mobileverification", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-[18px] text-[#666666]">验证码</span>}
            className="leading-[56px]"
            name="Verificationcode"
            required
            rules={[
              {
                validator: (_, value) => validateVerificationCode(value),
              },
            ]}
          >
            <Input
              placeholder="请输入验证码"
              onChange={(e) => form.setFieldValue("Verificationcode", e.target.value.replaceAll(" ", ""))}
              maxLength={6}
              className="2xl:w-[660px] xl:w-[35vw] lg:w-[34vw] md:w-[32vw] sm:w-[30vw] h-[56px] leading-[56px] text-[18px]"
              size="large"
              suffix={
                <Button onClick={handleGetCaptcha} disabled={remainingTime > 0} type="link" className="text-[18px]">
                  {remainingTime || "获取验证码"}
                </Button>
              }
            />
          </Form.Item>

          <Form.Item>
            <div className="w-[920px] flex justify-center 2xl:w-[920px]  xl:w-[60.2vw] lg:w-[60.7vw] md:w-[60vw] sm:w-[76.5vw]">
              <Button className="w-[160px] h-[56px] text-[18px]" type="primary" htmlType="submit">
                保存
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default CompanyInformationLqh
