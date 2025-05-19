const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import { Button, Checkbox, Form, Input, Select } from "antd"

import useCountdown from "@/hooks/useCountdown"
import { validateVerificationCode } from "@/utils/validators"
import { validateIDCard } from "@/utils/validators"

import UploadLqh from "./components/uploadlqh"

const { Option } = Select

function PersonalauthenticationLqh() {
  const [form] = Form.useForm()
  const { setIsInformation } = usePersonalcenterStore((state) => state)
  const navigate = useNavigate()

  const accountsecuritySelf = () => {
    navigate("/personalcenter")
    setIsInformation(8)
  }

  const UploadTitle = [
    { id: 1, title: "点击上传身份证人像面" },
    { id: 2, title: "点击上传身份证国徽面" },
    { id: 3, title: "点击上传手持身份证人像面" },
  ]
  const onGenderChange = (value: any) => {
    console.log(value)
  }
  const onFinish = (values: any) => {
    console.log("Success:", values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 个人认证倒计时方法
  const { remainingTime, startCountdown } = useCountdown(60, "Personalauthentication")

  // 点击获取验证码
  const handleGetCaptcha = async () => {
    const values = await form.validateFields(["yanzhengshouji"])
    console.log(values)

    // 调用开始倒计时方法
    startCountdown()
  }

  return (
    <div className="w-[100%] pt-[30px] flex">
      <div className="mb-[50px]">
        <div>
          <div className="flex w-[1665px] justify-center">
            <div className="w-[303px]">
              <div className="flex justify-center">
                <div
                  onClick={() => navigate("/merchantcenter/authentication")}
                  className="flex justify-center items-center cursor-pointer"
                >
                  <img className="w-[11px] h-[22px] mr-[10px]" src={imgUrl + "backleft.png"} alt="" />

                  <span className="text-[#999999] text-[18px] inline-block mt-[2px]">返回</span>
                </div>
              </div>
            </div>

            <div className="w-[1200px] mx-auto rounded-[20px] border border-[#dcdcdc] pt-[30px] pl-[29px] flex justify-start  2xl:w-[1200px] xl:w-[82vw] lg:w-[78vw] md:w-[75vw] sm:w-[70vw]">
              <Form
                form={form}
                name="basic"
                style={{
                  maxWidth: 1200,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">证件类型</span>}
                  className="leading-[56px] text-[18px] text-left"
                  name="idType"
                  rules={[
                    {
                      required: true,
                      message: "请选择证件类型",
                    },
                  ]}
                >
                  <div className="sm:w-48 md:w-64 lg:w-96 xl:w-128 2xl:w-[250px]">
                    <Select
                      placeholder="请选择证件类型"
                      // 默认身份证
                      defaultValue="ID"
                      onChange={onGenderChange}
                      className="h-[56px] text-[18px] text-left"
                      allowClear
                    >
                      <Option value="ID">二代身份证</Option>
                    </Select>
                  </div>
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">证件姓名</span>}
                  name="username"
                  className="leading-[56px] text-[18px] text-left"
                  rules={[
                    {
                      required: true,
                      message: "请输入证件姓名",
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入您的证件姓名"
                    className="h-[56px] text-[18px] text-left 2xl: w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
                    onChange={(e) => form.setFieldValue("username", e.target.value.replaceAll(" ", ""))}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">证件号码</span>}
                  className="leading-[56px] text-[18px] text-left"
                  name="idNumber"
                  required
                  rules={[
                    {
                      validator: (_, value) => validateIDCard(value),
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入您的身份证号码"
                    maxLength={18}
                    className="h-[56px] text-[18px] text-left 2xl: w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
                    onChange={(e) => form.setFieldValue("idNumber", e.target.value.replaceAll(" ", ""))}
                  />
                </Form.Item>

                <Form.Item label={null}>
                  <div className="text-left flex text-[18px] text-[#999999] 2xl:w-[570px] xl:w-[95%] lg:w-[90%] md:w-[95%] sm:w-[100%]">
                    <p className="mr-[19px]">上传证件: </p>

                    <p>我们会对您上传的证件进行加密处理，请放心认证。</p>
                  </div>
                </Form.Item>
                <Form.Item label={null}>
                  <div className="flex gap-[20px]">
                    {UploadTitle.map((item) => {
                      return <UploadLqh UploadTitleInfo={item} key={item.id} />
                    })}
                  </div>
                </Form.Item>
                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">验证手机</span>}
                  className="leading-[56px] text-[18px] text-left"
                  name="yanzhengshouji"
                  required
                >
                  <div className="text-[18px] flex justify-start text-[#222] learding-[54.5px] 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%]">
                    <p>1300****8931 (您可以在个人中心-</p>

                    <div onClick={accountsecuritySelf} className="text-[#1366f0] cursor-pointer">
                      账号安全
                    </div>
                    <p>内更换改绑手机号)</p>
                  </div>
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">验证码</span>}
                  className="leading-[56px] text-[18px] text-left"
                  name="Verificationcode"
                  required
                  rules={[
                    {
                      validator: (_, value) => validateVerificationCode(value),
                    },
                  ]}
                >
                  <Input
                    className="h-[56px] leading-[56px] text-[18px] text-[#999999] 2xl:w-[570px] xl:w-[33vw] lg:w-[32vw] md:w-[32vw] sm:w-[30vw]"
                    placeholder="请输入验证码"
                    onChange={(e) => form.setFieldValue("Verificationcode", e.target.value.replaceAll(" ", ""))}
                    maxLength={6}
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

                <Form.Item
                  name="noupdate"
                  valuePropName="checked"
                  label={null}
                  className="text-[18px] text-left mb-[0]"
                >
                  <Checkbox className="text-[#F05113] text-[16px]">确认信息无误，提交认证后不可更改</Checkbox>
                </Form.Item>

                <Form.Item name="agree" valuePropName="checked" label={null} className="text-[18px] text-left">
                  <div className="flex justify-start items-center text-[16px]">
                    <Checkbox className="text-[16px]"></Checkbox>

                    <div className="text-[#222222] pl-[8px]">
                      <span>我已阅读并同意</span>
                    </div>

                    <div className="text-[#1366f0] cursor-pointer"> 《大宇3D模型库身份认证服务协议》</div>
                  </div>
                </Form.Item>

                <Form.Item label={null}>
                  <div className="w-[1200px] 2xl:w-[1200px] mx-auto xl:w-[90%] mx-auto lg:w-[80%] mx-auto md:w-[75%] mx-auto sm:w-[70%] mx-auto">
                    <Button
                      className="w-[520px] h-[56px] text-[18px] 2xl:w-[520px] xl:w-[50%] lg:w-[47%] md:w-[42%] sm:w-[40%]"
                      type="primary"
                      htmlType="submit"
                    >
                      提交认证
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalauthenticationLqh
