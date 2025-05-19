import { Button, Form, Input, Select } from "antd"
import { message } from "antd"

// 新改的弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"
import useCountdown from "@/hooks/useCountdown"
// 验证表单的各方法
import {
  validateAccountnumber,
  validatePassword,
  validatePhoneNumber,
  validateRealname,
  validateVerificationCode,
} from "@/utils/validators"

import Setpaymentpassword from "./Setpaymentpassword"

const { Option } = Select

function Withdrawallqh() {
  const [form] = Form.useForm()
  // 倒计时方法startCountdown
  const { remainingTime, startCountdown } = useCountdown(60, "Withdrawal")
  const onFinish = (values: any) => {
    // 把参数传给后端
    const params = {
      withdrawalMethod: values.withdrawalMethod,
      realName: values.realName,
      accountNumber: values.accountNumber,
      AccountConfirmation: values.AccountConfirmation,
      TransactionPassword: values.TransactionPassword,
      mobileVerification: values.mobileVerification,
      verificationCode: values.verificationCode,
      prefix: values.prefix,
    }

    // 调用后端接口--传参数并且成功的状态关闭弹框,失败状态不关闭弹框
    console.log(params, "传参数给后端")
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 请选择提现方式
  const onGenderChange = (value: any) => {
    console.log(value)
  }
  // 设置支付密码弹框
  const [issetZfpwd, setIssetZfpwd] = useState(false)
  // 设置支付密码
  const setPaymentPassword = () => {
    setIssetZfpwd(true)
  }
  const handleCancel = () => {
    setIssetZfpwd(false)
  }

  const handleOk = () => {
    setIssetZfpwd(false)
  }

  //  关闭设置支付密码弹框
  // 处理自定义事件
  const handleCustomEvent = () => {
    setIssetZfpwd(false)
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
      // 校验手机号输入框
      const values = await form.getFieldValue(["mobileVerification"])
      //  保存手机号
      setPhoneNumyan(values.mobileVerification)
      console.log(phoneNumyan) //把这个变量传给获取验证码接口

      // 发送验证码逻辑
      // setLoading(true);
      setTimeout(() => {
        message.success("验证码已发送至手机号：" + values.mobileVerification)
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
  return (
    <div className="w-[100vw] max-w-[820px] rounded-[20px] h-[77.748vh]">
      <div className="flex justify-start items-center pt-[30px] pl-[29px] pb-[30px]">
        <Form
          initialValues={{
            prefix: "中国大陆+86",
          }}
          labelCol={{ span: 3 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="withdrawalMethod"
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                提现方式
              </span>
            }
            rules={[{ required: true, message: "请选择提现方式" }]}
            className="model-entry-custom-select leading-[56px]"
          >
            <div className="sm:w-48 md:w-64 lg:w-96 xl:w-128 2xl:w-[230px]">
              <Select
                placeholder="请选择提现方式"
                onChange={onGenderChange}
                allowClear
                className="text-[18px] h-[56px]"
              >
                <Option value="1">提现方式1</Option>
                <Option value="2">提现方式2</Option>
                <Option value="3">提现方式3</Option>
              </Select>
            </div>
          </Form.Item>
          <Form.Item
            name="realName"
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                真实姓名
              </span>
            }
            className="leading-[56px]"
            required
            rules={[{ validator: (_, value) => validateRealname(value) }]}
          >
            <Input
              className="w-[570px] max-w-[570px] h-[56px] text-[18px] 2xl:w-[570px] xl:w-[84%] lg:w-[83%] md:w-[80%] sm:w-[78%]"
              placeholder="请输入与您认证的真实姓名一致"
              maxLength={4}
              onChange={(e) => form.setFieldValue("realName", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>
          <Form.Item
            name="accountNumber"
            required
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                收款账号
              </span>
            }
            className="leading-[56px]"
            rules={[
              {
                validator: (_, value) => validateAccountnumber(value),
              },
            ]}
          >
            <Input
              className="w-[570px]  h-[56px] text-[18px] 2xl:w-[570px] xl:w-[84%] lg:w-[83%] md:w-[80%] sm:w-[78%]"
              placeholder="请输入微信或支付宝的账号（即该账号的手机号）"
              maxLength={11}
              onChange={(e) => form.setFieldValue("accountNumber", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>
          <Form.Item
            name="AccountConfirmation"
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                账号确认
              </span>
            }
            className="leading-[56px]"
            dependencies={["accountNumber"]}
            rules={[
              { required: true, message: "请再次输入收款账号" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // 这里做两次密码是否一致的校验
                  if (!value || getFieldValue("accountNumber") === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject("两次输入的账号不一致")
                },
              }),
            ]}
          >
            <Input
              className="w-[570px] max-w-[570px]  h-[56px] text-[18px] 2xl:w-[570px] xl:w-[84%] lg:w-[83%] md:w-[80%] sm:w-[78%]"
              maxLength={11}
              placeholder="请再次输入收款账号"
              onChange={(e) => form.setFieldValue("AccountConfirmation", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

          <Form.Item
            name="TransactionPassword"
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                交易密码
              </span>
            }
            className="leading-[56px]"
            required
            rules={[
              {
                validator: (_, value) => validatePassword(value),
              },
            ]}
          >
            <Input
              className="w-[570px] max-w-[570px]  h-[56px] text-[18px] 2xl:w-[570px] xl:w-[84%] lg:w-[83%] md:w-[80%] sm:w-[78%]"
              maxLength={11}
              placeholder="请输入您的交易密码"
              onChange={(e) => form.setFieldValue("TransactionPassword", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

          <Form.Item className="mb-[-8px] w-[572px] relative top-[-14px]" colon={false}>
            <div className="text-right 2xl:w-[572px] xl:w-[572px] lg:w-[572px] md:w-[572px] sm:w-[537px]">
              <span className="text-[14px] text-[#999999] inline-block">
                还未设置支付密码的，请使用默认密码支付 (登录密码)，
              </span>

              <span className="text-[14px] text-[#999999] inline-block">或前往</span>

              <span className="text-[#1366F0] cursor-pointer" onClick={setPaymentPassword}>
                设置支付密码
              </span>
            </div>
          </Form.Item>

          <Form.Item
            name="mobileVerification"
            required
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
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
              addonBefore={prefixSelector}
              className="w-[570px] max-w-[570px] 2xl:w-[570px] xl:w-[84%] lg:w-[83%] md:w-[80%] sm:w-[78%]"
              classNames={{ input: "h-[56px] text-[18px]" }}
              placeholder="请输入您的手机号码"
              maxLength={11}
              onChange={(e) => form.setFieldValue("mobileVerification", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>
          <Form.Item
            name="verificationCode"
            required
            label={
              <span className="text-[#666666]   2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                验证码
              </span>
            }
            className="leading-[56px]"
            rules={[{ validator: (_, value) => validateVerificationCode(value) }]}
          >
            <Input
              className="w-[570px] max-w-[570px]  h-[56px] text-[18px] 2xl:w-[570px] xl:w-[84%] lg:w-[83%] md:w-[80%] sm:w-[78%]"
              placeholder="请输入验证码"
              onChange={(e) => form.setFieldValue("verificationCode", e.target.value.replaceAll(" ", ""))}
              maxLength={6}
              size="large"
              suffix={
                <Button onClick={handleGetCaptcha} disabled={remainingTime > 0} type="link" className="text-[18px]">
                  {remainingTime || "获取验证码"}
                </Button>
              }
            />
          </Form.Item>

          <Form.Item className="text-center w-[766px] mb-[0] leading-[56px]">
            <div className="w-[766px] xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%] flex justify-center">
              <Button
                htmlType="submit"
                className="w-[220px] h-[56px] text-[20px] text-center rounded-[10px]"
                type="primary"
              >
                确认提现
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      {/* 设置支付密码组件 */}
      <ModalLqh2
        width="w-[830px] rounded-[20px]"
        open={issetZfpwd}
        onCancel={handleCancel}
        onOk={handleOk}
        closable={true} //显示右上角关闭按钮 />
        classname="custom-modal-qbsetzfpwd"
        content={<Setpaymentpassword onCustomEvent={handleCustomEvent} />}
        title="设置支付密码"
      ></ModalLqh2>
    </div>
  )
}

export default Withdrawallqh
