import { Button, Form, Input, message, Select } from "antd"
import { useState } from "react"

import ModalLqh2 from "@/components/ModalLqh2"
import useCountdown from "@/hooks/useCountdown"
import { ChangePhoneApi } from "@/network/api/user"
import { useUserStore } from "@/store/user"
import { validatePhoneNumber, validateVerificationCode } from "@/utils/validators"
const PhoneOperation = () => {
  const { setUserInfo, userInfo } = useUserStore((state) => state)
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()
  const { remainingTime, startCountdown } = useCountdown(60, "countdownAuthorize")

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const confirm = () => {
    console.log("确认")
  }

  // 更换手机号
  const onFinish = async (formdata: any) => {
    console.log(formdata, "formdata")
    const res = await ChangePhoneApi({ ...formdata, id: userInfo.id })
    if (res.code === 200) {
      message.success("更换手机号成功")
      setUserInfo({ ...userInfo, phone: formdata.phone })
      setIsOpen(false)
    } else {
      message.error("更换手机号失败")
    }
  }

  // 更改手机号中国大陆+86
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
        <Select.Option value="中国大陆+86">中国大陆+86</Select.Option>
        <Select.Option value="中国大陆+87">中国大陆+87</Select.Option>
      </Select>
    </Form.Item>
  )

  // 点击获取验证码
  const handleGetCaptcha = async () => {
    console.log("获取验证码")
    try {
      // 校验手机号输入框--成功的状态
      const values = await form.validateFields(["phone"])
      //  保存手机号
      //   setPhoneNumyan(values.phone)
      //   console.log(phoneNumyan) //把这个变量传给获取验证码接口

      // 发送验证码逻辑
      // setLoading(true);
      setTimeout(() => {
        message.success("验证码已发送至手机号：" + values.phone)
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

    // fetchCaptcha()
    // startCountdown() // 开始倒计时
  }

  return (
    <>
      <div className="flex items-center gap-[50px] p-[20px]">
        <div className="flex-[1] text-right">
          <div className="text-[18px] text-[#666666]">
            <span>手机号</span>
          </div>
        </div>
        <div className="flex justify-between items-center flex-[8]">
          <div className="text-[18px] text-[#222222]">
            <span>{userInfo?.phone}</span>
          </div>
          <div>
            <Button onClick={() => setIsOpen(true)} className="w-[160px] h-[56px] text-[18px]" type="primary">
              更换手机号
            </Button>
          </div>
        </div>
      </div>
      <ModalLqh2
        width="920px 2xl:w-[100vw] xl:w-[72vw] lg:w-[72vw] md:w-[90vw] sm:w-[93vw]"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={confirm}
        title="更换手机号"
        classname="custom-modal-grenzx"
        closable={false} //不显示右上角关闭按钮 />
        content={
          <div className="w-[100%] max-w-[920px] h-[100%] pt-[30px] pb-[30px] flex flex-col 2xl:w-[100vw] xl:w-[72vw] lg:w-[72vw] md:w-[90vw] sm:w-[93vw]">
            <div>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 4 }}
                form={form}
                initialValues={{
                  prefix: "中国大陆+86",
                }}
                // style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
              >
                <Form.Item
                  label={
                    <span className="text-[#666666] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[13px]">
                      新的手机号
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
                    addonBefore={prefixSelector}
                    className="w-[660px] max-w-[660px] 2xl:w-[100%] xl:w-[95%]  lg:w-[85%] md:w-[80%] sm:w-[90%]"
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
                  name="code"
                  required
                  rules={[
                    {
                      validator: (_, value) => validateVerificationCode(value),
                    },
                  ]}
                >
                  <Input
                    className="w-[660px] h-[56px] text-[18px] max-w-[660px] 2xl:w-[100%] xl:w-[95%]  lg:w-[85%] md:w-[80%] sm:w-[90%]"
                    placeholder="请输入验证码"
                    onChange={(e) => form.setFieldValue("code", e.target.value.replaceAll(" ", ""))}
                    maxLength={6}
                    size="large"
                    suffix={
                      <Button
                        onClick={handleGetCaptcha}
                        disabled={remainingTime > 0}
                        type="link"
                        className="text-[18px]"
                      >
                        {remainingTime || "获取验证码"}
                      </Button>
                    }
                  />
                </Form.Item>

                <Form.Item className="mb-[0px]">
                  <div className="flex justify-center mt-[100px]">
                    <Button
                      onClick={() => setIsOpen(false)}
                      htmlType="button"
                      className="sm:w-[24%] md:w-[160px] lg:w-[160px] xl:w-[160px] 2xl:w-[160px] h-[56px] text-[18px] mr-[20px]"
                    >
                      取消
                    </Button>

                    <Button
                      className="sm:w-[24%] md:w-[160px] lg:w-[160px] xl:w-[160px] 2xl:w-[160px] h-[56px] text-[18px]"
                      type="primary"
                      htmlType="submit"
                    >
                      确认更改
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        }
      />
    </>
  )
}

export default PhoneOperation
