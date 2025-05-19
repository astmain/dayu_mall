import { Button, Form, Input } from "antd"
import { message } from "antd"

import useCountdown from "@/hooks/useCountdown"
// 引入邮箱找回--验证码接口 MobileEmailRetrievalData
import { MobileEmailRetrievalData, MobileEmailRetrievalUpdateData } from "@/network/api/login"
import { GetEmailNumRetrievalData } from "@/network/api/login/api-params-moudle"
import { emailNumberChange, validatePassword, validateVerificationCode } from "@/utils/validators"
// 用邮箱找回页面

function ChangePasswordCom() {
  const { setCurrentComponent } = useLoginStore((state) => {
    return state
  })

  // 倒计时方法
  const { remainingTime, startCountdown } = useCountdown(60, "EmailBack")

  // const { Option } = Select
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log("Finish:", values)

    // 传更改密码表单参数给后端--接口是成功状态关闭弹窗

    const data = {
      email: values.email,
      EmailRetrievalCode: values.verificationCode,

      newpassword: values.passwordNum,
    }

    try {
      const res = await MobileEmailRetrievalUpdateData(data)
      console.log(res, "res请求成功情况提示用户修改成功")
    } catch (err) {
      console.log(err, "err请求失败情况")
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 更改密码验证码 hangchangeVerificationChangePwd

  // 点击获取验证码
  const handleGetCaptcha = async () => {
    try {
      // 校验邮箱号输入框--成功的状态
      const emailValue = form.getFieldValue(["email"])
      await emailNumberChange(emailValue)

      setTimeout(() => {
        message.success("验证码已发送至邮箱：" + emailValue)
      }, 1000)

      const data: GetEmailNumRetrievalData = {
        email: emailValue,
        sms_type: "reset_password",
        sms_conf_id: 0,
      }
      console.log(data)
      try {
        const res = await MobileEmailRetrievalData(data)
        console.log(res, "获取验证码成功")
      } catch (err) {
        console.log(err, "获取验证码失败")
      }

      // 开始倒计时
      startCountdown()
    } catch (errorInfo) {
      // 失败的状态
      console.log("校验失败:", errorInfo)
      // 不需要手动处理错误提示，Form.Item 会自动显示
    }
  }

  return (
    <div className="flex flex-col justify-center">
      {/* 忘记密码--用邮箱找回组件 */}
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          prefix: "86",
        }}
        form={form}
      >
        <Form.Item
          name="email"
          className="text-left"
          rules={[
            {
              validator: (_, value) => emailNumberChange(value),
            },
          ]}
        >
          <Input
            className="w-[430px] h-[66px] leading-[66px] text-[18px]"
            prefix={<i className={"iconfont icon-youxiang text-[#1366F0] w-[23px]"}></i>}
            placeholder="请输入邮箱"
            maxLength={255}
            onChange={(e) => form.setFieldValue("email", e.target.value.replaceAll(" ", ""))}
          />
        </Form.Item>
        <Form.Item
          name="verificationCode"
          className="text-left"
          rules={[
            {
              validator: (_, value) => validateVerificationCode(value),
            },
          ]}
        >
          <Input
            prefix={<i className={"iconfont icon-yanzhengma w-[20px] text-[#1366F0]"}></i>}
            className="w-[430px] h-[66px] text-[18px] text-[#999999] leading-[66px]"
            placeholder="请输入验证码"
            onChange={(e) => form.setFieldValue("verificationCode", e.target.value.replaceAll(" ", ""))}
            maxLength={6}
            suffix={
              <Button onClick={handleGetCaptcha} disabled={remainingTime > 0} type="link" className="text-[18px]">
                {remainingTime || "获取验证码"}
              </Button>
            }
          />
        </Form.Item>

        <Form.Item
          name="passwordNum"
          className="text-left"
          rules={[
            {
              validator: (_, value) => validatePassword(value),
            },
          ]}
        >
          <Input.Password
            className="w-[430px] h-[66px] leading-[66px] text-[18px] text-[#999999]"
            placeholder="请输入新密码"
            onChange={(e) => form.setFieldValue("passwordNum", e.target.value.replaceAll(" ", ""))}
            maxLength={12}
            autoComplete="off" //关闭自动填充,用户每次都需要手动输入内容。
            prefix={<i className={"iconfont icon-mima text-[#1366F0] w-[20px]"}></i>}
          />
        </Form.Item>

        <Form.Item>
          <div className="w-[430px] h-[66px] text-[22px]">
            <Button htmlType="submit" className="w-[430px] text-[22px] h-[66px]" type="primary">
              确认修改
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <div className="w-[430px] text-center">
            <span className="text-[16px] inline-block mr-[8px]">不更改,</span>
            <span className="text-[16px] text-[#1366F0] cursor-pointer" onClick={() => setCurrentComponent("login")}>
              返回登录
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePasswordCom
