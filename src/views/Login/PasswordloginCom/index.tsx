// import { useUserStore } from "@store/user"
import { Button, Form, Input } from "antd"

import LoginAgree from "@/components/LoginAgree"
import { useTryApi } from "@/hooks/useTryApi"
import { LoginData } from "@/network/api/login"
// 引入登录接口
import { LoginRes } from "@/network/api/login/api-res-model"
// 导入验证方法
import { validatePassword, validatePhoneNumberlqh } from "@/utils/validators"

function PasswordloginComLqh() {
  // 引入全局控制加载变量

  const [form] = Form.useForm()

  const [formData, setFormData] = useState({})

  const navigate = useNavigate()
  const location = useLocation()
  const imgBaseUrl = "http://yun3d.com/frontend/public/test/"
  //   // 全局tip变量
  const { setCurrentComponent, setTipTitleLqh } = useLoginStore((state) => {
    return state
  })

  console.log("打印页面===================================")

  const { setToken, setUserInfo } = useUserStore((state) => state)
  const { setIsfind } = useRegisterStore((state) => state)
  const { setIsisClickregister } = useRegisterStore((state) => state)

  // 忘记密码事件
  const resetpwdPage = () => {
    // 跳回到忘记密码页面
    setCurrentComponent("resetpwd")
    // 显示用手机找回
    setIsfind(0)
  }

  // 立即注册事件
  const RegisterheaderPage = () => {
    // 跳到注册页
    setCurrentComponent("Registerheader")
    // 显示立即注册页面
    setIsisClickregister(0)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  const { request } = useTryApi<LoginRes>({
    title: "登录成功,即将进入首页!",
    apiFunction: LoginData,
    handler: (data: LoginRes) => {
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

  const onFinish = async (values: {
    username: string //账号名
    password: string
  }) => {
    setTipTitleLqh("登录中...")
    request(values)
  }
  const handleValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, "changedValues")

    setFormData(allValues)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={formData}
        onValuesChange={handleValuesChange}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          className="text-left"
          rules={[
            {
              validator: (_, value) => validatePhoneNumberlqh(value),
            },
          ]}
        >
          <Input
            className="w-[430px] h-[66px] leading-[66px] text-[18px]"
            prefix={<i className={"iconfont icon-zhanghao text-[#1366F0] w-[20px]"}></i>}
            placeholder="请输入账号"
            // 账号用手机号登录,限制输11位
            maxLength={11}
            onChange={(e) => form.setFieldValue("username", e.target.value.replaceAll(" ", ""))}
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
            autoComplete="off" //关闭自动填充
            placeholder="请输入密码"
            // 新增一个键盘enter按下调用密码登录接口--其他页面也会跟着执行
            onKeyDown={(e) => e.key === "Enter" && onFinish}
            onChange={(e) => form.setFieldValue("password", e.target.value.replaceAll(" ", ""))}
            // 现在最多输入12位
            maxLength={12}
          />
        </Form.Item>

        <Form.Item className="mb-[10px]">
          <div className="flex w-[430px] justify-between pt-[16px]">
            <div className="mt-[-30px]">
              <div className="cursor-pointer" onClick={resetpwdPage}>
                <span className="text-[#1366f0]">忘记密码?</span>
              </div>
            </div>
            <div className="mt-[-30px]">
              <span className="text-[14px] text-[#222222] inline-block mr-[4px]">没有账号?</span>

              <span className="text-[#1366f0] cursor-pointer" onClick={RegisterheaderPage}>
                立即注册
              </span>
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
            <div onClick={() => setCurrentComponent("wechatLogin")} className="cursor-pointer">
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

export default PasswordloginComLqh
