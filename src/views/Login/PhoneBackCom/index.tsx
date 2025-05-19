import { Button, Form, Input, Select } from "antd"
import { message } from "antd"

import useCountdown from "@/hooks/useCountdown"
import { useTryApi } from "@/hooks/useTryApi"
// 引入忘记密码--用手机找回--获取验证码接口-MobilePhoneRetrievalUpdate和忘记密码--确认修改接口
import { MobilePhoneRetrieval, MobilePhoneRetrievalUpdateData } from "@/network/api/login"
import { GetMobilePhoneRetrieval } from "@/network/api/login/api-params-moudle"
import { RetrievePhonePasswordRes } from "@/network/api/login/api-res-model"
import { validatePassword, validatePhoneNumber, validateVerificationCode } from "@/utils/validators"

// 用手机找回页面
function ChangePasswordComLqh() {
  const { setCurrentComponent, setTipTitleLqh } = useLoginStore((state) => {
    return state
  })

  const { remainingTime, startCountdown } = useCountdown(60, "PhoneBack")

  const { Option } = Select
  const [form] = Form.useForm()

  // 用手机找回接口优化代码
  const { request } = useTryApi<RetrievePhonePasswordRes>({
    title: "修改成功,正在返回登录",
    apiFunction: MobilePhoneRetrievalUpdateData,
    handler: (data: RetrievePhonePasswordRes) => {
      // 修改成功状态跳转到登录页面
      if (data.code) {
        setCurrentComponent("login")
      }
    },
    onError: (error: any) => {
      console.error("修改失败:", error)
    },
  })

  // 确认修改按钮
  const onFinish = async (values: { phone: string; code: string; password: string }) => {
    setTipTitleLqh("修改中...")
    // 发送请求
    request(values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const prefixSelector = (
    <Form.Item noStyle>
      <Select
        defaultValue="86"
        className="w-[114px] h-[66px] leading-[66px] text-[18px]"
        labelRender={(props: any) => {
          return (
            <div className="text-[18px]">
              <i className={"iconfont icon-shouji text-[#1366F0]"}></i>
              {"+"} {props.value}
            </div>
          )
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  )

  // 点击获取验证码
  const handleGetCaptcha = async () => {
    try {
      // 校验手机号输入框--成功的状态
      const phoneValue = form.getFieldValue(["phonenumber"])
      await validatePhoneNumber(phoneValue)

      // 发送验证码逻辑

      setTimeout(() => {
        message.success("验证码已发送至手机号：" + phoneValue)
      }, 1000)
      // MobilePhoneRetrieval

      const data: GetMobilePhoneRetrieval = {
        phone: phoneValue,

        sms_type: "reset_password",
      }

      try {
        // // 调用获取验证码接口
        const res = MobilePhoneRetrieval(data)
        console.log(res, "res调用成功的情况")
      } catch (error) {
        console.log(error, "error调用失败的情况")
      }

      startCountdown() // 开始倒计时
    } catch (errorInfo) {
      // 失败的状态
      console.log("校验失败:", errorInfo)
      // 不需要手动处理错误提示，Form.Item 会自动显示
    }
  }

  return (
    <div className="flex flex-col justify-center">
      {/* 忘记密码 */}

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
          name="phonenumber"
          className="text-left"
          rules={[
            {
              validator: (_, value) => validatePhoneNumber(value),
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="请输入手机号"
            className="changepassword-phone-num"
            maxLength={11}
            onChange={(e) => form.setFieldValue("phonenumber", e.target.value.replaceAll(" ", ""))}
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
            className="w-[430px] h-[66px] text-[18px] text-[#999999] leading-[66px]"
            placeholder="请输入验证码"
            onChange={(e) => form.setFieldValue("code", e.target.value.replaceAll(" ", ""))}
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
            className="w-[430px] h-[66px] leading-[66px] text-[18px] text-[#999999]"
            placeholder="请输入新密码"
            maxLength={12}
            onChange={(e) => form.setFieldValue("password", e.target.value.replaceAll(" ", ""))}
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

export default ChangePasswordComLqh
