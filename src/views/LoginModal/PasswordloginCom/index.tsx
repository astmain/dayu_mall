import { Button, Form, Input } from "antd"

import LoginAgree from "@/components/LoginAgree"

import loginModal from "./index.module.scss"

function passwordloginComLqh() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [form] = Form.useForm()
  const imgBaseUrl = "http://yun3d.com/frontend/public/test/"
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setCurrentComponent } = useLoginStore((state) => {
    return state
  })
  const onFinish = (values: any) => {
    console.log("Finish:", values)

    // 传参数给后端--调用登录接口
    const params = {
      accountnumber: values.accountnumber,
      password: values.password,
    }
    console.log(params, "params参数")
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className={loginModal.loginhead}>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item
          name="accountnumber"
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
          ]}
        >
          <Input
            style={{ width: "430px", height: "66px", lineHeight: "66px", fontSize: "18px" }}
            prefix={<i className={"iconfont icon-zhanghao"} style={{ color: "#1366F0", width: "20px" }}></i>}
            placeholder="请输入账号"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}
        >
          <Input.Password
            style={{ width: "430px", marginBottom: "0px", height: "66px", lineHeight: "66px", fontSize: "18px" }}
            prefix={<i className={"iconfont icon-mima"} style={{ color: "#1366F0", width: "20px" }}></i>}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item>
          <div className={loginModal.forgotpasswordTitle}>
            <div className={loginModal.forgotpassword}>
              <div onClick={() => setCurrentComponent("resetpwd")}>
                <a href="#">忘记密码?</a>
              </div>
            </div>
            <div className={loginModal.rightPassword}>
              <span>没有账号?</span>
              <a onClick={() => setCurrentComponent("bindPhoneNum")} href="#">
                立即注册
              </a>
            </div>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: "430px", height: "66px", lineHeight: "66px", fontSize: "22px" }}
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>

        <Form.Item>
          <div className={loginModal.otherlogins}>
            <span>其他登录方式</span>
          </div>
        </Form.Item>

        <Form.Item>
          <div className={loginModal.otherTitle}>
            <div onClick={() => setCurrentComponent("wechatLogin")} className={loginModal.otherloginswechat}>
              <img src={imgBaseUrl + "wechat2.png"} alt="" />
            </div>
            {/* <div className={loginModal.otherloginswechat}>
              <img src={imgBaseUrl + 'wechat2.png'} alt="" />
            </div> */}
          </div>
        </Form.Item>

        <Form.Item>
          {/* <div className={loginModal.loginAgree}>
                <span>登录即同意</span>
                <a href="#">《大宇3D用户注册协议和隐私政策》</a>
              </div> */}
          <LoginAgree />
        </Form.Item>
      </Form>
    </div>
  )
}

export default passwordloginComLqh
