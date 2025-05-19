// import { useUserStore } from "@store/user"
// import "./bindphonenumber.css"

import { Button, Form, Input } from "antd"
import { message } from "antd"

import LoginAgree from "@/components/LoginAgree"
import useCountdown from "@/hooks/useCountdown"
// 引入获取邮箱验证码接口
import { RegisterEmailData, VerificationEmail } from "@/network/api/login"
import { GetVerificationEmaliData } from "@/network/api/login/api-params-moudle"
// import { LoginData } from "@/network/api/login"
// 解构使用各验证方法
import { emailNumberChange, validatePassword, validateVerificationCode } from "@/utils/validators"

function EmailregistrationpageLqh() {
  const { setCurrentComponent } = useLoginStore((state) => {
    return state
  })

  // 倒计时方法
  const { remainingTime, startCountdown } = useCountdown(60, "emailRegister")

  // 登录页--邮箱注册接口--完成注册接口
  const onFinish = async (values: any) => {
    console.log("Finish:", values)

    // 传参数给后端--调用邮箱注册接口
    const params = {
      name: values.accountnumber,
      dayu_phone_email: values.emailRegister,
      login: values.verificationCode,
      registerPassword: values.password,
    }

    // 接口代码
    try {
      const res = await RegisterEmailData(params)
      if (res) {
        console.log("成功的情况")
      }
    } catch {
      console.log("错误情况")
    }
    // 跳回登录页才对
    //  输入登录参数--登录成功--跳转页面
    // setToken("8756670000000")
    // // 执行登录逻辑（假设已登录
    // const from = location?.state?.from?.pathname || "/" // 如果没有来源路径则重定向到首页

    // navigate(from, { replace: true })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const [form] = Form.useForm()

  // 点击获取邮箱注册验证码接口
  const handleGetCaptcha = async () => {
    try {
      // 校验手机号输入框--成功的状态
      const EmailValues = form.getFieldValue(["emailRegister"])
      await emailNumberChange(EmailValues)
      setTimeout(() => {
        message.success("验证码已发送至邮箱：" + EmailValues)
      }, 1000)

      const data: GetVerificationEmaliData = {
        email: EmailValues, //传默认邮箱号给获取验证码接口
        sms_conf_id: 0,
        sms_type: "register", //明确指定类型
      }

      try {
        // 调用邮箱注册验证码接口
        const res = VerificationEmail(data)
        console.log(res, "res调用邮箱注册成功的情况")
      } catch (error) {
        console.log(error, "调用邮箱注册失败的情况")
      }

      startCountdown() // 开始倒计时
    } catch (errorInfo) {
      // 失败的状态
      console.log("校验失败:", errorInfo)
      // 不需要手动处理错误提示，Form.Item 会自动显示
    }
  }

  return (
    <div className="flex h-[100%] flex-col justify-center items-center">
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
          name="accountnumber"
          className="text-left"
          rules={[
            {
              required: true,
              message: "请设置账户名（例如：DAYU-3D）",
            },
          ]}
        >
          <Input
            className="w-[430px] h-[66px] leading-[66px] text-[18px]"
            prefix={<i className={"iconfont icon-zhanghao text-[#1366F0] w-[23px]"}></i>}
            placeholder="请设置账户名（例如：DAYU-3D）"
            onChange={(e) => form.setFieldValue("accountnumber", e.target.value.replaceAll(" ", ""))}
          />
        </Form.Item>

        <Form.Item
          name="emailRegister"
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
            onChange={(e) => form.setFieldValue("emailRegister", e.target.value.replaceAll(" ", ""))}
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
            className="w-[430px] h-[66px] leading-[66px] text-[18px] text-[#999999]"
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
          name="password"
          className="text-left"
          rules={[
            {
              validator: (_, value) => validatePassword(value),
            },
          ]}
        >
          <Input.Password
            className="w-[430px] mb-[0px] h-[66px] leading-[66px] text-[18px]"
            prefix={<i className={"iconfont icon-mima text-[#1366F0] w-[20px]"}></i>}
            type="password"
            maxLength={12}
            placeholder="请输入密码"
            autoComplete="off" //关闭自动填充,用户每次都需要手动输入内容。
            onChange={(e) => form.setFieldValue("password", e.target.value.replaceAll(" ", ""))}
          />
        </Form.Item>

        <Form.Item>
          <Button className="w-[430px] h-[66px] leading-[66px] text-[22px]" type="primary" htmlType="submit">
            完成注册
          </Button>
        </Form.Item>

        <Form.Item>
          <div className="w-[430px] text-center">
            <span className="text-[16px] inline-block mr-[8px]">已有账号?</span>
            <span className="text-[16px] text-[#1366F0] cursor-pointer" onClick={() => setCurrentComponent("login")}>
              点此登录
            </span>
          </div>
        </Form.Item>

        <Form.Item className="mb-[0]">
          <LoginAgree />
        </Form.Item>
      </Form>
    </div>
  )
}

export default EmailregistrationpageLqh
