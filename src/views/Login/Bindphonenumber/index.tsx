import { Button, Form, Input, Select } from "antd"
import { message } from "antd"

// 引入自定义封装的loading组件
// import Loadinglqh from "@/components/loadinglqh"
import LoginAgree from "@/components/LoginAgree"
import useCountdown from "@/hooks/useCountdown"
import { useTryApi } from "@/hooks/useTryApi"
// 引入绑定手机号获取验证码接口--还有绑定手机号成功后登录接口 BindLoginPhoneNumData
import { BindPhoneNumData, VerificationBindPhoneNumData } from "@/network/api/login"
import { GetVerificationCodeBindPhoneNumber } from "@/network/api/login/api-params-moudle"
import { GetBindPhoneNumberDataRes } from "@/network/api/login/api-res-model"
import { validatePassword, validatePhoneNumber, validateVerificationCode } from "@/utils/validators"

function BindphonenumberLqh() {
  const { Option } = Select
  const navigate = useNavigate()
  const location = useLocation()

  const { setToken, setUserInfo } = useUserStore((state) => state)

  const { setTipTitleLqh } = useLoginStore((state) => state)

  // 点击点此登录去登录页面
  const goLoginPage = () => {
    navigate("/login")
  }

  const { remainingTime, startCountdown } = useCountdown(60, "VerificationcodeBindPhonenum")
  const [phoneNumyan, setPhoneNumyan] = useState("")

  // 绑定手机号接口优化代码
  const { request } = useTryApi<GetBindPhoneNumberDataRes>({
    title: "绑定成功,正在进入首页!",
    apiFunction: BindPhoneNumData,

    handler: (data: GetBindPhoneNumberDataRes) => {
      // 判断成功,正在进入首页
      const { token, ...rest } = data
      setToken(token)
      setUserInfo(rest)
      // //执行登录逻辑（假设已登录// 如果没有来源路径则重定向到首页
      const from = location?.state?.from?.pathname || "/"
      navigate(from, { replace: true })
    },
    onError: (error: any) => {
      console.error("绑定失败:", error)
    },
  })
  const onFinish = async (values: any) => {
    const openid = location?.state?.openid
    if (!openid) {
      return message.error("openid不存在,请重试")
    }
    // BindPhoneNumData
    // 传绑定手机号表单参数给后端--然后接口状态为成功状态关闭弹窗
    const data = {
      openid,
      name: values.Accountname,
      phone: values.phonenumber,
      code: values.verificationCode,
      password: values.newpassword,
    }
    setTipTitleLqh("绑定中...")
    request(data)

    // 绑定手机号后登录接口 BindLoginPhoneNumData
    // const dataLogin = {
    //   openid: sessionStorage.getItem("wechat_openid") || "",
    // }
    // try {
    //   const res = await BindLoginPhoneNumData(dataLogin)
    //   console.log(res, "Res请求成功的情况")
    //   if (res.code == 200) {
    //     // 关闭弹窗
    //     // contextHolder.onClose()
    //     setTimeout(() => {
    //       // 提示绑定成功
    //       messageApi.success(res.message)
    //     }, 3000)
    //     // 跳转到首页
    //     // navigate("/")
    //   } else {
    //     // 提示绑定失败
    //     messageApi.error(res.message)
    //   }
    //   // 捕获错误
    // } catch (error) {
    //   console.log(error, "error请求失败的情况")
    // }
  }
  // 取消状态
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  const [form] = Form.useForm()

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
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
      const values = await form.validateFields(["phonenumber"])

      // 发送验证码逻辑
      // setLoading(true);
      setTimeout(() => {
        message.success("验证码已发送至手机号：" + values.phonenumber)
        // setLoading(false);
      }, 1000)
      //  保存手机号
      setPhoneNumyan(values.phonenumber)
      console.log(phoneNumyan) //把这个变量传给获取验证码接口
      const data: GetVerificationCodeBindPhoneNumber = {
        phone: values.phonenumber, //传手机号
      }

      // 内层调用获取验证码接口
      try {
        const res = await VerificationBindPhoneNumData(data)

        if (res.code == 200) {
          console.log("提示用户发送成功", res.message)
        } else {
          console.log("提示用户发送失败", res.message)
        }
        // 捕获内层错误
      } catch (error) {
        console.log(error, "调用失败的情况")
      }
      startCountdown() // 开始倒计时
    } catch (errorInfo) {
      //捕获外层错误 失败的状态
      console.log("校验失败:", errorInfo)
      // 不需要手动处理错误提示，Form.Item 会自动显示
    }
    // fetchCaptcha()
    startCountdown() // 开始倒计时
  }

  return (
    // <Loadinglqh tip="绑定中..." loading={loadingLqh}>
    <div className="flex flex-col justify-center items-center mt-[20px]">
      <div className="text-[22px] text-[#222222] mb-[30px] w-[430px] text-left">
        <span>绑定手机号</span>
      </div>
      <div>
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
            name="Accountname"
            className="text-left"
            rules={[
              {
                required: true,
                message: "请设置账户名（例如：DAYU-3D）!",
              },
            ]}
          >
            <Input
              prefix={<i className={"iconfont icon-zhanghao w-[20px] text-[#1366F0]"}></i>}
              className="w-[430px] h-[66px] leading-[66px] text-[18px]"
              placeholder="请设置账户名（例如：DAYU-3D）"
              onChange={(e) => form.setFieldValue("Accountname", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

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
              className="bind-phone-number"
              maxLength={11}
              onChange={(e) => form.setFieldValue("phonenumber", e.target.value.replaceAll(" ", ""))}
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
              className="w-[430px] h-[66px] leading-[66px] text-[18px]"
              maxLength={6}
              placeholder="请输入验证码"
              onChange={(e) => form.setFieldValue("verificationCode", e.target.value.replaceAll(" ", ""))}
              size="large"
              suffix={
                <Button onClick={handleGetCaptcha} disabled={remainingTime > 0} type="link" className="text-[18px]">
                  {remainingTime || "获取验证码"}
                </Button>
              }
            />
          </Form.Item>

          <Form.Item
            name="newpassword"
            className="text-left"
            rules={[
              {
                validator: (_, value) => validatePassword(value),
              },
            ]}
          >
            <Input.Password
              className="w-[430px] h-[66px] leading-[66px] text-[18px]"
              placeholder="请输入新密码"
              prefix={<i className={"iconfont icon-mima w-[20px] text-[#1366F0]"}></i>}
              onChange={(e) => form.setFieldValue("newpassword", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>

          <Form.Item>
            <div className="w-[430px] h-[66px] mx-auto rounded-[10px] text-[22px]">
              <Button htmlType="submit" className="w-[430px] text-[22px] h-[66px]" type="primary">
                绑定并登录
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="w-[430px] mx-auto text-center">
              <span className="text-[16px] inline-block mr-[8px]">已有账号?</span>
              <span className="text-[16px] text-[#1366F0] cursor-pointer" onClick={() => goLoginPage()}>
                点此登录
              </span>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="w-[343px] mx-auto">
              <LoginAgree />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
    // </Loadinglqh>
  )
}

export default BindphonenumberLqh
