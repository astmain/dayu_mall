import "./bindphonenumber.css"

import { Button, Form, Input, Select } from "antd"

import LoginAgree from "@/components/LoginAgree"

import loginModal from "./index.module.scss"

function BindphonenumberLqh() {
  const { Option } = Select

  const { setCurrentComponent } = useLoginStore((state) => {
    return state
  })

  const onFinish = (values: any) => {
    console.log("Finish:", values)

    // 传绑定手机号表单参数给后端--然后接口状态为成功状态关闭弹窗
    const params = {
      Accountname: values.Accountname,
      phonenumber: values.phonenumber,
      verificationCode: values.verificationCode,
      newpassword: values.newpassword,
      prefix: values.prefix,
    }
    console.log(params)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  const [form] = Form.useForm()
  const handleChange = (e: any) => {
    console.log(e.target.value, "e")

    // // 去除空格
    // 这边相同的方法第一种方法:可以把空格替换掉，去除空格，有提示错误
    form.setFieldValue("phonenumber", e.target.value.replaceAll(" ", ""))

    // 而第二种方法,一样的代码，但是就是在按下空格的时候，没有提示错误
    // 这个函数的调用，会跳过表单的校验
    // form.setFieldsValue({ phonenumber: e.target.value.replaceAll(" ", "") })
  }

  // hangchangeVerificationBind--绑定手机号验证码
  const hangchangeVerificationBind = (e: any) => {
    console.log(e.target.value, "e")

    // // 去除空格
    // 这边相同的方法第一种方法:可以把空格替换掉，去除空格，有提示错误
    form.setFieldValue("verificationCode", e.target.value.replaceAll(" ", ""))

    // 而第二种方法,一样的代码，但是就是在按下空格的时候，没有提示错误
    // 这个函数的调用，会跳过表单的校验
    // form.setFieldsValue({ verificationCode: e.target.value.replaceAll(" ", "") })
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 114,
          height: "66px",
          lineHeight: "66px",
          fontSize: "18px",
        }}
        labelRender={(props: any) => {
          // eslint-disable-next-line react/prop-types
          // return '+' + props.value
          return (
            <div style={{ fontSize: "18px" }}>
              <i className={"iconfont icon-shouji"} style={{ color: "#1366F0", width: "36px", height: "50px" }}></i>
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

  const [countdown, setCountdown] = useState(0) // 倒计时数字

  const [isButtonDisabled, setIsButtonDisabled] = useState(false) // 倒计时是否开始

  // 模拟获取验证码的函数
  const fetchCaptcha = () => {
    console.log("获取验证码...")
    // 这里可以调用后端接口获取验证码
  }

  // 开始倒计时
  const startCountdown = () => {
    setCountdown(60) // 初始化倒计时为 60 秒
    setIsButtonDisabled(true) // 禁用按钮

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer) // 倒计时结束时清除计时器
          setIsButtonDisabled(false) // 启用按钮
          return 0
        }
        return prev - 1 // 每秒减少 1
      })
    }, 1000)
  }

  // 点击获取验证码
  const handleGetCaptcha = () => {
    fetchCaptcha()
    startCountdown() // 开始倒计时
  }
  return (
    <div className={loginModal.updateHead}>
      <div className={loginModal.updatePassword}>
        <span>绑定手机号</span>
      </div>
      <div>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            prefix: "86",
          }}
          form={form}
        >
          <Form.Item
            name="Accountname"
            rules={[
              {
                required: true,
                message: "请设置账户名（例如：DAYU-3D）!",
              },
            ]}
          >
            <Input
              prefix={<i className={"iconfont icon-zhanghao"} style={{ width: "20px", color: "#1366F0" }}></i>}
              style={{
                width: "430px",
                height: "66px",
                lineHeight: "66px",
                fontSize: "18px",
              }}
              placeholder="请设置账户名（例如：DAYU-3D）"
            />
          </Form.Item>

          <Form.Item
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "请输入手机号!",
              },
              {
                validator: (_, value) => {
                  console.log(value, "value手机号")

                  const is11 = value.replaceAll(" ", "") // 去除空格
                  if (!/^1[3456789]\d{9}$/.test(is11)) {
                    return Promise.reject(new Error("电话号码无效"))
                  }
                  return Promise.resolve()
                },
              },
              // {
              //   pattern: /^[0-9]{11}$/, // 验证手机号必须是11位数字
              //   message: "手机号必须是11位数字",
              // },
              // {
              //   validator(_, value) {
              //     // 去除空格
              //     const trimmedValue = value?.trim()
              //     if (value !== trimmedValue) {
              //       return Promise.reject("手机号不能包含空格")
              //     }
              //     return Promise.resolve()
              //   },
              // },
              // {
              //   validator(_, value) {
              //     // 验证是否包含中文字符
              //     if (/[\u4e00-\u9fa5]/.test(value)) {
              //       return Promise.reject("手机号不能包含中文字符")
              //     }
              //     return Promise.resolve()
              //   },
              // },
              // {
              //   validator(_, value) {
              //     // 验证手机号格式
              //     const phonePattern = /^1[3-9]\d{9}$/ // 只允许以 1 开头，且总长度为 11 位
              //     if (value && !phonePattern.test(value)) {
              //       return Promise.reject("请输入有效的手机号")
              //     }
              //     return Promise.resolve()
              //   },
              // },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "430px",
                height: "66px",
              }}
              placeholder="请输入手机号"
              className="bind-phone-number"
              maxLength={11}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="verificationCode"
            rules={[
              {
                required: true,
                message: "请输入验证码!",
              },
              {
                validator(_, value) {
                  // 去除空格
                  const trimmedValue = value.replaceAll(" ", "") //去除空格
                  if (!/^[0-9]{6}$/.test(trimmedValue)) {
                    return Promise.reject("验证码必须是6位数字")
                  }
                  return Promise.resolve()
                },
              },
              // {
              //   pattern: /^[0-9]{6}$/, // 验证输入必须是6位数字
              //   message: "验证码必须是6位数字",
              // },
              // {
              //   validator(_, value) {
              //     // 去除空格
              //     const trimmedValue = value?.trim()
              //     if (value !== trimmedValue) {
              //       return Promise.reject("验证码不能包含空格")
              //     }
              //     return Promise.resolve()
              //   },
              // },
              // {
              //   validator(_, value) {
              //     // 验证是否包含中文字符
              //     if (/[\u4e00-\u9fa5]/.test(value)) {
              //       return Promise.reject("验证码不能包含中文字符")
              //     }
              //     return Promise.resolve()
              //   },
              // },
            ]}
          >
            <Input
              prefix={<i className={"iconfont icon-yanzhengma"} style={{ width: "20px", color: "#1366F0" }}></i>}
              style={{
                width: "430px",
                height: "66px",
                lineHeight: "66px",
                fontSize: "18px",
              }}
              maxLength={6}
              placeholder="请输入验证码"
              onChange={hangchangeVerificationBind}
              size="large"
              suffix={
                <Button onClick={handleGetCaptcha} disabled={isButtonDisabled} type="link" style={{ fontSize: "18px" }}>
                  {isButtonDisabled ? `重新获取 (${countdown}s)` : "获取验证码"}
                </Button>
              }
            />
          </Form.Item>

          <Form.Item
            name="newpassword"
            rules={[
              {
                required: true,
                message: "请输入新密码!",
              },
            ]}
          >
            <Input.Password
              style={{ width: "430px", height: "66px", lineHeight: "66px", fontSize: "18px" }}
              placeholder="请输入新密码"
              prefix={<i className={"iconfont icon-mima"} style={{ width: "20px", color: "#1366F0" }}></i>}
            />
          </Form.Item>

          <Form.Item>
            <div className={loginModal.confirmmodification}>
              <Button htmlType="submit" style={{ width: "430px", fontSize: "22px", height: "66px" }} type="primary">
                绑定并登录
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <div className={loginModal.backLogin}>
              <span className={loginModal.bugenggai}>已有账号?</span>
              <a href="#" onClick={() => setCurrentComponent("login")}>
                点此登录
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <div className={loginModal.loginAgree}>
              <LoginAgree />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default BindphonenumberLqh
