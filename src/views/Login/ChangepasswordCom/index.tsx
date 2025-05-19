import "./changepassword.css"

import { Button, Form, Input, Select } from "antd"

import loginModal from "./index.module.scss"

function ChangePasswordCom() {
  const { setCurrentComponent } = useLoginStore((state) => {
    return state
  })

  //   const imgBaseUrl = 'http://yun3d.com/frontend/public/test/'

  const { Option } = Select
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log("Finish:", values)

    // 传更改密码表单参数给后端--接口是成功状态关闭弹窗

    const params = {
      phonenumber: values.phonenumber,
      verificationCode: values.verificationCode,
      prefix: values.prefix,
      passwordNum: values.passwordNum,
    }
    console.log(params, "传更改密码表单参数给后端")
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const handleChange = (e: any) => {
    console.log(e.target.value, "e")

    // // 去除空格
    // 这边相同的方法第一种方法:可以把空格替换掉，去除空格，有提示错误
    form.setFieldValue("phonenumber", e.target.value.replaceAll(" ", ""))

    // 而第二种方法,一样的代码，但是就是在按下空格的时候，没有提示错误
    // 这个函数的调用，会跳过表单的校验
    // form.setFieldsValue({ phonenumber: e.target.value.replaceAll(" ", "") })
  }

  // 更改密码验证码 hangchangeVerificationChangePwd

  const hangchangeVerificationChangePwd = (e: any) => {
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
          return (
            <div style={{ fontSize: "18px" }}>
              <i className={"iconfont icon-shouji"} style={{ color: "#1366F0", width: "36px", height: "50px" }}></i>
              {"+"} {props.value}
            </div>
          )
          // eslint-disable-next-line react/prop-types
          // return '+' + props.value
          // <i className={'iconfont icon-zhanghao'} style={{ color: '#1366F0', width: '20px' }}></i>
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
    <div className={loginModal.updatepasswordhead}>
      <div className={loginModal.updatePassword}>
        <span>更改密码</span>
      </div>

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
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: "请输入手机号!",
            },
            {
              validator: (_, value) => {
                console.log(value, "value手机号")

                const is11 = value.replaceAll(" ", "") // 校验11位手机号
                if (!/^1[3456789]\d{9}$/.test(is11)) {
                  return Promise.reject(new Error("电话号码无效"))
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <Input
            style={{
              width: "430px",
              height: "66px",
              lineHeight: "66px",
            }}
            addonBefore={prefixSelector}
            placeholder="请输入手机号"
            className="changepassword-phone-num"
            maxLength={11}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          name="verificationCode"
          style={{ textAlign: "left" }}
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
              color: "#999999",
            }}
            placeholder="请输入验证码"
            onChange={hangchangeVerificationChangePwd}
            maxLength={6}
            suffix={
              <Button onClick={handleGetCaptcha} disabled={isButtonDisabled} type="link" style={{ fontSize: "18px" }}>
                {isButtonDisabled ? `重新获取 (${countdown}s)` : "获取验证码"}
              </Button>
            }
          />
        </Form.Item>

        <Form.Item
          name="passwordNum"
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: "请输入新密码!",
            },
          ]}
        >
          <Input.Password
            style={{ width: "430px", height: "66px", lineHeight: "66px", fontSize: "18px", color: "#999999" }}
            placeholder="请输入新密码"
            prefix={<i className={"iconfont icon-mima"} style={{ color: "#1366F0", width: "20px" }}></i>}
          />
        </Form.Item>

        <Form.Item>
          <div className={loginModal.confirmmodification}>
            <Button htmlType="submit" style={{ width: "430px", fontSize: "22px", height: "66px" }} type="primary">
              确认修改
            </Button>
          </div>
        </Form.Item>
        <Form.Item>
          <div className={loginModal.backLogin}>
            <span className={loginModal.bugenggai}>不更改,</span>
            <span
              style={{ fontSize: "16px", color: "#1366F0", cursor: "pointer" }}
              onClick={() => setCurrentComponent("login")}
            >
              返回登录
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePasswordCom
