import { Button, Form, Input, message, Select } from "antd"

import useCountdown from "@/hooks/useCountdown"
import { validatePhoneNumber, validatetransactionSetPaymentPwd, validateVerificationCode } from "@/utils/validators"

const { Option } = Select
function Setpaymentpasswordlqh({ onCustomEvent }: { onCustomEvent: () => void }) {
  // 倒计时方法startCountdown
  const { remainingTime, startCountdown } = useCountdown(60, "setpwdmonthlypaymentcard")
  const cancelBtn = () => {
    // 触发自定义事件，传递参数给父组件
    onCustomEvent()
    // setIssetZfpwd(false)
  }

  const onFinish = (values: any) => {
    // params接收数据
    const params = {
      prefixPwd: values.prefixPwd,
      zfpwd: values.zfpwd,
      againzfpwd: values.againzfpwd,
      phonenumber: values.phonenumber,
      captcha: values.captcha,
    }
    console.log(params, "params设置支付密码参数传给后端")
    // 设置支付密码参数传给后端--并且接口调用成功状态关闭弹框
    // // 触发自定义事件，传递参数给父组件
    // onCustomEvent()
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  const [form] = Form.useForm()

  const prefixSelectorPhone = (
    <Form.Item name="prefixPwd" noStyle>
      <Select
        className="w-[148px] h-[56px] leading-[56px] text-[18px]"
        labelRender={(props: any) => {
          return (
            <div className="text-[18px]">
              {/* style={{ color: "#1366F0", width: "36px", height: "50px" }} */}
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

  // 我的钱包--月付卡--设置支付密码获取验证码
  const handleGetCaptchaPayment = async () => {
    try {
      // 校验手机号输入框--成功的状态
      const values = await form.validateFields(["phonenumber"])
      //  保存手机号
      setPhoneNumyan(values.phonenumber)
      console.log(phoneNumyan) //把这个变量传给获取验证码接口

      // 发送验证码逻辑
      // setLoading(true);
      setTimeout(() => {
        message.success("验证码已发送至手机号：" + values.phonenumber)
        // setLoading(false);
      }, 1000)
      //   console.log(phoneNumyan) //调用获取验证码接口,把手机号传给获取验证码接口
      // 这里可以调用后端接口获取验证码和调用倒计时方法startCountdown() // 开始倒计时
      startCountdown() // 开始倒计时
    } catch (errorInfo) {
      // 失败的状态
      console.log("校验失败:", errorInfo)
      // 不需要手动处理错误提示，Form.Item 会自动显示
    }
  }

  // 验证新密码

  return (
    <div className="w-[100%] h-[51vh] max-w-[830px] pb-[30px] rounded-[20px] pt-[30px] pl-[29px] 2xl:w-[830px] xl:w-[80vw] lg:w-[79vw] md:w-[92vw] sm:w-[91vw]">
      <div className="flex justify-start flex-col">
        <Form
          initialValues={{
            prefixPwd: "中国大陆+86",
          }}
          style={{
            maxWidth: 830,
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20, offset: "20px" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="zfpwd"
            label={
              <span className="text-[18px] text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[12px]">
                设置新密码
              </span>
            }
            className="leading-[56px]"
            required
            rules={[
              {
                validator: (_, value) => validatetransactionSetPaymentPwd(value),
              },
            ]}
          >
            <Input.Password
              className="h-[56px] leading-[56px] text-[18px] w-[630px] max-w-[630px] 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[96%] sm:w-[92%]"
              placeholder="请设置8-12位数字支付密码"
              maxLength={12}
              onChange={(e) => form.setFieldValue("zfpwd", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

          <Form.Item
            name="againzfpwd"
            label={
              <span className="text-[18px] text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[12px]">
                再次输入密码
              </span>
            }
            className="leading-[56px]"
            dependencies={["zfpwd"]}
            rules={[
              { required: true, message: "请再次输入密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // 这里做两次密码是否一致的校验
                  if (!value || getFieldValue("zfpwd") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject("两次输入的支付密码不一致")
                },
              }),
            ]}
          >
            <Input.Password
              className="h-[56px] leading-[56px] text-[18px] w-[630px] max-w-[630px] 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[96%] sm:w-[92%]"
              placeholder="请再次输入新密码"
              onChange={(e) => form.setFieldValue("againzfpwd", e.target.value.replaceAll(" ", ""))}
              maxLength={12}
            />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            required
            label={
              <span className="text-[18px] text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[12px]">
                手机验证
              </span>
            }
            className="leading-[56px]"
            rules={[
              {
                validator: (_, value) => validatePhoneNumber(value),
              },
            ]}
          >
            <Input
              addonBefore={prefixSelectorPhone}
              className="w-[630px] max-w-[630px] 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[96%] sm:w-[92%]"
              classNames={{ input: "h-[56px] text-[18px]" }}
              placeholder="请输入您的手机号码"
              maxLength={11}
              onChange={(e) => form.setFieldValue("phonenumber", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

          <Form.Item
            name="captcha"
            label={
              <span className="text-[18px] text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[12px]">
                验证码
              </span>
            }
            className="leading-[56px]"
            required
            rules={[{ validator: (_, value) => validateVerificationCode(value) }]}
          >
            <Input
              className="w-[630px] h-[56px] leading-[56px] text-[18px] max-w-[630px] 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[96%] sm:w-[92%]"
              placeholder="请输入验证码"
              onChange={(e) => form.setFieldValue("captcha", e.target.value.replaceAll(" ", ""))}
              size="large"
              maxLength={6}
              suffix={
                <Button
                  onClick={handleGetCaptchaPayment}
                  disabled={remainingTime > 0}
                  type="link"
                  className="text-[18px]"
                >
                  {remainingTime || "获取验证码"}
                </Button>
              }
            />
          </Form.Item>
          <Form.Item label={null}>
            <div className="flex justify-center w-[800px]">
              <Button className="w-[130px] h-[56px] text-[20px] rounded-[10px] mr-[20px]" onClick={cancelBtn}>
                取消
              </Button>
              <Button className="w-[130px] h-[56px] text-[20px] rounded-[10px]" type="primary" htmlType="submit">
                确定修改
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Setpaymentpasswordlqh
