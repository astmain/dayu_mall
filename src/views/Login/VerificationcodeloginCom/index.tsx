import { Button, Form, Input, message, Select } from "antd"

import LoginAgree from "@/components/LoginAgree"
import useCountdown from "@/hooks/useCountdown"
import { useTryApi } from "@/hooks/useTryApi"
// 引入验证码登录接口和获取验证码接口-VerificationCodeLoginData
import { VerificationCodeLoginData, VerificationCodeNum } from "@/network/api/login"
import { GetVerificationCodeData } from "@/network/api/login/api-params-moudle"
import { VerificationCodeLoginRes } from "@/network/api/login/api-res-model"
import { validatePhoneNumber, validateVerificationCode } from "@/utils/validators"

function VerificationcodeloginComLqh() {
  const { Option } = Select
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const imgBaseUrl = "http://yun3d.com/frontend/public/test/"

  const { remainingTime, startCountdown } = useCountdown(60, "Verificationcodelogin")

  const { setCurrentComponent, setTipTitleLqh } = useLoginStore((state) => {
    return state
  })

  const { setToken, setUserInfo } = useUserStore((state) => state)

  // 验证码登录
  const { request } = useTryApi<VerificationCodeLoginRes>({
    title: "登录成功,即将进入首页!",
    apiFunction: VerificationCodeLoginData,

    handler: (data: VerificationCodeLoginRes) => {
      const { token, ...rest } = data
      setToken(token)
      setUserInfo(rest)
      // //执行登录逻辑（假设已登录// 如果没有来源路径则重定向到首页
      const from = location?.state?.from?.pathname || "/"
      navigate(from, { replace: true })
    },
    onError: (error: any) => {
      console.error("登录失败:", error)
    },
  })

  // 验证码登录--手机号和验证码
  const onFinish = async (values: { phone: string; code: string }) => {
    setTipTitleLqh("登录中...")
    // 发送请求
    request(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const prefixSelectorVerificationCode = (
    <Select
      defaultValue="+86"
      className="w-[114px] h-[66px] leading-[66px] text-[18px]"
      labelRender={(props: any) => {
        return (
          <div className="text-[18px]">
            <i className={"iconfont icon-shouji text-[#1366F0]"}></i>
            {props.value}
          </div>
        )
      }}
    >
      <Option value="86">中国大陆+86</Option>
      <Option value="87">中国大陆+87</Option>
    </Select>
  )

  // 点击获取验证码
  const handleGetCaptcha = async () => {
    try {
      //传手机号
      const phoneValue = form.getFieldValue("phone")
      await validatePhoneNumber(phoneValue)

      setTimeout(() => {
        message.success("验证码已发送至手机号：" + phoneValue)
      }, 1000)
      const data: GetVerificationCodeData = {
        phone: phoneValue,

        sms_type: "login", //明确指定类型--登录
      }

      try {
        const res = await VerificationCodeNum(data)
        console.log(res, "调用成功的情况")
      } catch (error) {
        console.log(error, "调用失败的情况")
      }
      startCountdown()
    } catch (errorInfo) {
      //捕获外层错误 失败的状态
      console.log("校验失败:", errorInfo)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" form={form}>
        <Form.Item
          name="phone"
          className="text-left"
          required
          rules={[
            {
              validator: (_, value) => validatePhoneNumber(value),
            },
          ]}
        >
          <Input
            addonBefore={prefixSelectorVerificationCode}
            placeholder="请输入手机号"
            className="VerificationcodeloginCom-phone-num"
            maxLength={11}
            onChange={(e) => form.setFieldValue("phone", e.target.value.replaceAll(" ", ""))}
          />
        </Form.Item>

        <Form.Item
          name="code"
          className="text-left"
          rules={[
            {
              validator: (_, value) => validateVerificationCode(value),
            },
          ]}
        >
          <Input
            prefix={<i className={"iconfont icon-yanzhengma w-[20px] text-[#1366F0]"}></i>}
            className="w-[430px] h-[66px] leading-[66px] text-[18px]"
            maxLength={6}
            placeholder="请输入验证码"
            onChange={(e) => form.setFieldValue("code", e.target.value.replaceAll(" ", ""))}
            suffix={
              <Button onClick={handleGetCaptcha} disabled={remainingTime > 0} type="link" className="text-[18px]">
                {remainingTime || "获取验证码"}
              </Button>
            }
          />
        </Form.Item>

        {/* 验证码登录占位符,解决密码登录和验证码登录页面互相切换抖动问题style={{ marginBottom: "10px" }} */}
        <Form.Item className="mb-[10px]">
          <div className="flex w-[430px] justify-between pt-[16px]">
            <div className="mt-[-30px]">
              <div>
                <a className="text-[#1366f0] text-[14px]" href="#"></a>
              </div>
            </div>

            <div className="mt-[-30px]">
              <span className="text-[14px] text-[#222222] inline-block mr-[4px]"></span>
              <a className="text-[#1366f0]" href="#"></a>
            </div>
          </div>
        </Form.Item>

        <Form.Item>
          <Button className="w-[430px] h-[66px] leading-[66px] text-[22px]" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          <div className="text-[16px] text-[#999] text-center">
            <span>其他登录方式</span>
          </div>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center gap-[10px]">
            <div onClick={() => setCurrentComponent("wechatLogin")} className="text-center cursor-pointer">
              <img className="w-[60px] inline-block" src={imgBaseUrl + "wechat2.png"} alt="" />
            </div>
          </div>
        </Form.Item>

        <Form.Item className="mb-[0]">
          <LoginAgree />
        </Form.Item>
      </Form>
    </div>
  )
}

export default VerificationcodeloginComLqh
