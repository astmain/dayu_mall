import { Button, Form, Input, Select } from "antd"
import { useState } from "react"

import ModalLqh2 from "@/components/ModalLqh2"
import useCountdown from "@/hooks/useCountdown"
import { ChangePasswordApi, ChangePayPasswordApi } from "@/network/api/user"
import { useUserStore } from "@/store/user"
import {
  validatePassword,
  validatePhoneNumber,
  validatetransactionSetPaymentPwd,
  validateVerificationCode,
} from "@/utils/validators"

interface PasswordChangeFormData {
  phone: string
  code: string
  password: string
  prefix: string
  ConfirmLoginPassword: string
}

interface PasswordOperationProps {
  isPay?: boolean
}

const PasswordOperation = ({ isPay = false }: PasswordOperationProps) => {
  const userInfo = useUserStore((state) => state.userInfo)
  const [form] = Form.useForm<PasswordChangeFormData>()
  const [isOpen, setIsOpen] = useState(false)
  const { remainingTime, startCountdown } = useCountdown(60, "countdownAuthorize")

  const onFinish = async (formData: PasswordChangeFormData) => {
    const { phone, code, password } = formData
    const api = isPay ? ChangePayPasswordApi : ChangePasswordApi
    try {
      const res = await api({
        phone,
        code,
        password,
        id: userInfo.id,
      })

      // TODO: Add proper success handling (e.g., toast notification)
      console.log(res, "Password change successful")
      setIsOpen(false)
    } catch (error) {
      // TODO: Add proper error handling (e.g., error toast)
      console.error("Password change failed:", error)
    }
  }

  const handleGetCaptchaPwd = async () => {
    const phoneValue = form.getFieldValue("phone")
    try {
      // Validate phone number before starting countdown
      await validatePhoneNumber(phoneValue)
      startCountdown()
    } catch (error) {
      // TODO: Show validation error to user
      console.error("Captcha validation failed:", error)
    }
  }

  // Prefix selector for phone number
  const prefixSelectorChangePwd = (
    <Form.Item name="prefix" noStyle>
      <Select
        className="w-[148px] h-[56px] leading-[56px] text-[18px]"
        labelRender={(props: any) => (
          <div className="text-[18px]">
            <i className="text-[#1366F0] w-[36px] h-[50px]"></i>
            {props.value}
          </div>
        )}
      >
        <Select.Option value="中国大陆+86">中国大陆+86</Select.Option>
        <Select.Option value="中国大陆+87">中国大陆+87</Select.Option>
      </Select>
    </Form.Item>
  )

  return (
    <>
      <div className="flex items-center gap-[50px] p-[20px]">
        <div className="flex-[1] text-right">
          <div className="text-[18px] text-[#666666]">
            <span>{isPay ? "支付密码" : "登录密码"}</span>
          </div>
        </div>
        <div className="flex justify-between items-center flex-[8]">
          <div className="text-[18px] text-[#222222]">
            <span>建议您经常修改密码，以保证账号更加安全。</span>
          </div>
          <div>
            <Button
              onClick={() => setIsOpen(true)}
              // style={{ width: "160px", height: "56px", fontSize: "18px" }}
              className="w-[160px] h-[56px] text-[18px]"
              type="primary"
            >
              {isPay ? "更改支付密码" : "更改登录密码"}
            </Button>
          </div>
        </div>
      </div>
      <ModalLqh2
        width="920px 2xl:w-[920px] xl:w-[95vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw]"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => form.submit()}
        title={isPay ? "更改支付密码" : "更改登录密码"}
        classname="custom-modal-grenzx"
        closable={false}
        content={
          <div className="w-[920px] h-[100%] pt-[30px] pb-[30px] flex flex-col max-w-[920px] 2xl:w-[920px] xl:w-[95vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw]">
            <Form
              onFinish={onFinish}
              labelCol={{ span: 4 }}
              initialValues={{
                prefix: "中国大陆+86",
              }}
              form={form}
              // className="flex flex-col justify-end"
            >
              <Form.Item
                label={
                  <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                    设置新密码
                  </span>
                }
                name="password"
                className="leading-[56px]"
                required
                rules={[
                  {
                    validator: (_, value) =>
                      isPay ? validatetransactionSetPaymentPwd(value) : validatePassword(value),
                  },
                ]}
              >
                <Input.Password
                  className="w-[100%] h-[56px] leading-[43px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%] lg:w-[90%] md:w-[85%] sm:w-[80%]"
                  placeholder="请输入新密码"
                  maxLength={12}
                  onChange={(e) => form.setFieldValue("password", e.target.value.replaceAll(" ", ""))}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                    再次输入密码
                  </span>
                }
                name="ConfirmLoginPassword"
                className="leading-[56px]"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "请再次输入密码",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject("两次输入的登录密码不一致")
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="w-[100%] h-[56px] leading-[43px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%] lg:w-[90%] md:w-[85%] sm:w-[80%]"
                  placeholder="请再次输入密码"
                  maxLength={12}
                  onChange={(e) => form.setFieldValue("ConfirmLoginPassword", e.target.value.replaceAll(" ", ""))}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                    手机验证
                  </span>
                }
                name="phone"
                className="leading-[56px]"
                required
                rules={[
                  {
                    validator: (_, value) => validatePhoneNumber(value),
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelectorChangePwd}
                  className="w-[100%] leading-[43px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%] lg:w-[90%] md:w-[85%] sm:w-[80%]"
                  classNames={{ input: "h-[56px] text-[18px]" }}
                  placeholder="请输入新的手机号"
                  onChange={(e) => form.setFieldValue("phone", e.target.value.replaceAll(" ", ""))}
                  maxLength={11}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                    验证码
                  </span>
                }
                className="leading-[56px]"
                required
                name="code"
                rules={[
                  {
                    validator: (_, value) => validateVerificationCode(value),
                  },
                ]}
              >
                <Input
                  className="w-[100%] h-[56px] leading-[43px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%] lg:w-[90%] md:w-[85%] sm:w-[80%]"
                  placeholder="请输入验证码"
                  onChange={(e) => form.setFieldValue("code", e.target.value.replaceAll(" ", ""))}
                  maxLength={6}
                  size="large"
                  suffix={
                    <Button
                      onClick={handleGetCaptchaPwd}
                      disabled={remainingTime > 0}
                      type="link"
                      style={{ fontSize: "18px" }}
                    >
                      {remainingTime || "获取验证码"}
                    </Button>
                  }
                />
              </Form.Item>

              <Form.Item className="mb-[0]">
                <div className="flex justify-center mt-[100px]">
                  <Button
                    onClick={() => setIsOpen(false)}
                    htmlType="button"
                    className="w-[160px] h-[56px] text-[18px] mr-[20px]"
                    // style={{ width: "160px", height: "56px", fontSize: "18px", marginRight: "20px", outline: "none" }}
                  >
                    取消
                  </Button>
                  <Button className="w-[160px] h-[56px] text-[18px] mr-[20px]" type="primary" htmlType="submit">
                    确认更改
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        }
      />
    </>
  )
}

export default PasswordOperation
