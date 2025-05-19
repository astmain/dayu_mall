// 导入校验表单的方法
import { Button, Form, Input, message, Select } from "antd"

import useCountdown from "@/hooks/useCountdown"
import {
  validateAuthorizedAccountNum,
  validatePassword,
  validatePhoneNumber,
  validateVerificationCode,
} from "@/utils/validators"

const { Option } = Select

interface ChildPros {
  cancelBtn: (message: string) => void
  confirmAuthorizationBtn: () => void
}

const AddnewaccountLqh: React.FC<ChildPros> = ({ cancelBtn, confirmAuthorizationBtn }) => {
  const [form] = Form.useForm()

  // 倒计时方法startCountdown 给授权账号用
  const { remainingTime, startCountdown } = useCountdown(60, "countdownAuthorize")
  const Mobileverificationphone = useCountdown(60, "countdownPhone")

  // 保存授权账号setAuthorizedAccount
  const [AuthorizedAccountNum, setAuthorizedAccountNum] = useState("")

  const [phoneNumyan, setPhoneNumyan] = useState("") // 保存手机号

  // 确认授权--调用新增接口--调用父组件列表接口方法刷新列表数据--然后调用关闭弹框方法
  const onFinish = (values: any) => {
    console.log("Success:", values)
    confirmAuthorizationBtn()
    // 传给后端参数
    const params = {
      authorizedAccount: values.authorizedAccount,
      verificationCode: values.verificationCode,
      setpassword: values.setpassword,
      Mobileverification: values.Mobileverification,
      verificationCodeTwo: values.verificationCodeTwo,
      selectLabel: values.selectLabel,
      prefix: values.prefix,
    }

    // 调用成功状态--关闭弹窗代码--成功状态调用加载成功组件
    console.log(params, "params传给后端参数")
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 点击获取验证码  // 模拟获取验证码的函数--授权账号验证码
  const handleGetCaptcha = async () => {
    try {
      // 校验手机号输入框--成功的状态
      const values = await form.validateFields(["authorizedAccount"])
      //  保存手机号
      setAuthorizedAccountNum(values.authorizedAccount)
      console.log(AuthorizedAccountNum) //把这个变量传给获取验证码接口

      // 发送验证码逻辑
      // setLoading(true);
      setTimeout(() => {
        message.success("验证码已发送至手机号：" + values.authorizedAccount)
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

  // 点击获取验证码1
  const handleGetCaptchaSecond = async () => {
    try {
      // 校验手机号输入框--成功的状态
      const values = await form.validateFields(["Mobileverification"])
      //  保存手机号
      setPhoneNumyan(values.Mobileverification)
      console.log(phoneNumyan) //把这个变量传给获取验证码接口

      // 发送验证码逻辑
      // setLoading(true);
      setTimeout(() => {
        message.success("验证码已发送至手机号：" + values.Mobileverification)
        // setLoading(false);
      }, 1000)
      //   console.log(phoneNumyan) //调用获取验证码接口,把手机号传给获取验证码接口
      // 这里可以调用后端接口获取验证码和调用倒计时方法startCountdown() // 开始倒计时
      Mobileverificationphone.startCountdown() // 开始倒计时
    } catch (errorInfo) {
      // 失败的状态
      console.log("校验失败:", errorInfo)
      // 不需要手动处理错误提示，Form.Item 会自动显示
    }
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

  //  选择标签方法
  const onGenderChange = (value: any) => {
    console.log(value)
  }

  //  写一个清空表单字段方法给父组件的新增账号用

  return (
    <div className="w-[920px] bg-[#ffffff] h-[68.172vh] rounded-[10px] p-[30px] flex flex-col max-w-[920px] 2xl:w-[920px] xl:w-[90vw] lg:w-[85vw] md:w-[80vw] sm:w-[75vw]">
      <div>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 4 }}
          initialValues={{
            prefix: "中国大陆+86",
          }}
          form={form}
        >
          <Form.Item
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                授权子账号
              </span>
            }
            name="authorizedAccount"
            className="leading-[56px]"
            required
            rules={[
              {
                validator: (_, value) => validateAuthorizedAccountNum(value),
              },
            ]}
          >
            <Input
              className="w-[660px] h-[56px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%]  lg:w-[85%] md:w-[80%] sm:w-[75%]"
              placeholder="请输入要授权子账号的手机号（账号）"
              maxLength={11}
              onChange={(e) => form.setFieldValue("authorizedAccount", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                验证码
              </span>
            }
            className="leading-[56px]"
            name="verificationCode"
            required
            rules={[
              {
                validator: (_, value) => validateVerificationCode(value),
              },
            ]}
          >
            <Input
              className="w-[660px] h-[56px] leading-[56px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%]  lg:w-[85%] md:w-[80%] sm:w-[75%]"
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

          <Form.Item
            label={
              <span className="text-[#666666] leading-[56px] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                设置密码
              </span>
            }
            name="setpassword"
            className="leading-[56px]"
            required
            rules={[
              {
                validator: (_, value) => validatePassword(value),
              },
            ]}
          >
            <Input.Password
              className="w-[660px] h-[56px] leading-[56px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%]  lg:w-[85%] md:w-[80%] sm:w-[75%]"
              placeholder="请设置该账号的登录密码"
              maxLength={12}
              onChange={(e) => form.setFieldValue("setpassword", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                管理员验证
              </span>
            }
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
              className="w-[660px] max-w-[660px] 2xl:w-[100%] xl:w-[95%]  lg:w-[85%] md:w-[80%] sm:w-[75%]"
              classNames={{ input: "h-[56px] text-[18px]" }}
              placeholder="请输入手机号"
              maxLength={11}
              onChange={(e) => form.setFieldValue("Mobileverification", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                验证码
              </span>
            }
            className="leading-[56px] "
            name="verificationCodeTwo"
            required
            rules={[
              {
                validator: (_, value) => validateVerificationCode(value),
              },
            ]}
          >
            <Input
              className="w-[660px] h-[56px] leading-[56px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%]  lg:w-[85%] md:w-[80%] sm:w-[75%]"
              placeholder="请输入验证码"
              onChange={(e) => form.setFieldValue("verificationCodeTwo", e.target.value.replaceAll(" ", ""))}
              maxLength={6}
              size="large"
              suffix={
                <Button
                  onClick={handleGetCaptchaSecond}
                  disabled={Mobileverificationphone.remainingTime > 0}
                  type="link"
                  className="text-[18px]"
                >
                  {Mobileverificationphone.remainingTime || "获取验证码"}
                </Button>
              }
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                选择标签
              </span>
            }
            className="leading-[56px]"
            name="selectLabel"
            rules={[
              {
                required: true,
                message: "请选择标签分类!",
              },
            ]}
          >
            <Select
              placeholder="请选择标签分类"
              onChange={onGenderChange}
              allowClear
              className="custom-select w-[660px] h-[56px] text-[18px]"
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-[0]">
            <div className="mt-auto flex justify-center pb-[30px]">
              <Button
                htmlType="button"
                onClick={() => cancelBtn("关闭弹框")}
                className="w-[160px] h-[56px] text-[18px] mr-[20px]"
              >
                取消
              </Button>

              <Button htmlType="submit" type="primary" className="w-[160px] h-[56px] text-[18px] mr-[20px]">
                确认授权
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default AddnewaccountLqh
