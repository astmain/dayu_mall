const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import { Button, Checkbox, Form, Input } from "antd"

import useCountdown from "@/hooks/useCountdown"
import { emailNumberChange, validateIDCard, validateUSCI, validateVerificationCode } from "@/utils/validators"

import UploadLqh from "./components/uploadlqh"

function PersonalauthenticationLqh() {
  const [form] = Form.useForm()
  const { setIsInformation } = usePersonalcenterStore((state) => state)

  const navigate = useNavigate()

  const accountsecuritySelf = () => {
    navigate("/personalcenter")

    setIsInformation(8)
  }

  // 企业认证倒计时方法
  const { remainingTime, startCountdown } = useCountdown(60, "Enterprisecertification")

  const onFinish = (values: any) => {
    console.log("Success:", values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 点击获取验证码
  const handleGetCaptcha = () => {
    startCountdown() // 开始倒计时
  }
  const UploadTitle = [{ id: 1, title: "点击上传营业执照照片" }]
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

            <div className="w-[1200px] mx-auto rounded-[20px] border border-[#dcdcdc] pt-[30px] pl-[29px] flex justify-start 2xl:w-[1200px] xl:w-[82vw] lg:w-[78vw] md:w-[75vw] sm:w-[83vw]">
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 16,
                }}
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
                <Form.Item label={<span className="text-[18px] text-[#666666]">上传营业执照</span>} required>
                  <div className="items-center w-[805px]">
                    <div className="cursor-pointer w-[245px] h-[153px] bg-[#ffffff] rounded-[10px] border border-[#dcdcdc] mb-[11px] mr-[23px] flex justify-center flex-col items-center relative 2xl:w-[245px] xl:w-[23vw] lg:w-[20vw] md:w-[18vw] sm:w-[18vw]">
                      {UploadTitle.map((item) => {
                        return <UploadLqh UploadTitleInfo={item} key={item.id} />
                      })}
                    </div>

                    <div className=" flex mb-[10px] text-left 2xl:w-[368px] xl:w-[76%] lg:w-[70%] md:w-[45%] sm:w-[36%]">
                      <p>注意：</p>

                      <p className="text-[#f05113]">请上传最新盖公章的营业执照（副本）复印件</p>
                    </div>

                    <div className="w-[272px] text-[16px] text-[#222222] text-left 2xl:w-[272px] xl:w-[76%] lg:w-[70%] md:w-[45%] sm:w-[36%]">
                      <p>图片小于5M，仅支持JPG/PNG格式。</p>
                    </div>
                  </div>
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">机构名称</span>}
                  name="jigoumingcheng"
                  className="leading-[56px] text-[18px] text-left mb-[0]"
                  rules={[
                    {
                      required: true,
                      message: "请输入机构名称",
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入机构名称"
                    className="h-[56px]  text-[18px] text-left 2xl:w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
                    onChange={(e) => form.setFieldValue("jigoumingcheng", e.target.value.replaceAll(" ", ""))}
                  />
                </Form.Item>

                <Form.Item
                  className="mb-[12px]"
                  colon={false}
                  label={<span className="inline-block w-[83px] h-[56px] text-[18px] text-[#666666]"></span>}
                >
                  <div className="text-[#999999] text-[14px] h-[15px] learding-[15px] text-left">
                    <span className="w-[557px] text-[#999999] text-[14px] inline-block 2xl:w-[557px]  xl:w-[76%]  lg:w-[70%]  md:w-[66%] text-[12px] sm:w-[66%] text-[12px]">
                      请与营业执照的机构名保持一致;因平台有付费业务，机构名需与提现账户的真实姓名保持
                      一致，否则将无法提现。
                    </span>
                  </div>
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-[#666666] inline-block mr-[5px] sm:text-[14px] md:text-[15px] lg:text-[15px] xl:text-[18px]">
                      统一社会信用代码
                    </span>
                  }
                  name="socialCreditCode"
                  className="leading-[56px] text-left"
                  required
                  rules={[
                    {
                      // 校验统一社会信用代码
                      validator: (_, value) => validateUSCI(value),
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入统一社会信用代码"
                    className="h-[56px] text-[18px] text-left 2xl:w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
                    onChange={(e) => form.setFieldValue("socialCreditCode", e.target.value.replaceAll(" ", ""))}
                    maxLength={18}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="w-[1140px] h-[1px] bg-[#dcdcdc] 2xl:w-[1140px] xl:w-[1000px] lg:w-[780px] md:w-[535px] sm:w-[400px]"></div>
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666] inline-block mr-[5px]">运营者姓名</span>}
                  name="Operatorsname"
                  className="leading-[56px] text-[18px] text-left"
                  rules={[
                    {
                      required: true,
                      message: "请输入运营者姓名",
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入运营者姓名"
                    className="h-[56px] text-[18px] text-left 2xl:w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
                    onChange={(e) => form.setFieldValue("Operatorsname", e.target.value.replaceAll(" ", ""))}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666] inline-block mr-[5px]">身份证号码</span>}
                  name="idNumber"
                  className="leading-[56px] text-[18px] text-left"
                  required
                  rules={[
                    {
                      validator: (_, value) => validateIDCard(value),
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入身份证号码"
                    maxLength={18}
                    className="h-[56px] text-[18px] text-left 2xl:w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
                    onChange={(e) => form.setFieldValue("idNumber", e.target.value.replaceAll(" ", ""))}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-[18px] text-[#666666] sm:text-[14px] md:text-[15px] lg:text-[15px] xl:text-[18px]">
                      企业认证申请公函
                    </span>
                  }
                  required
                >
                  <div className="items-center w-[805px]">
                    <div className="w-[245px] h-[153px] bg-[#ffffff] rounded-[10px] border border-[#dcdcdc] mb-[11px] mr-[23px] flex justify-center flex-col items-center relative">
                      <div className="flex flex-col justify-center items-center">
                        <div>
                          <span>点击上传</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[16px] text-[#222222] text-left 2xl:w-[272px] xl:w-[76%] lg:w-[70%] md:w-[45%] sm:w-[36%]">
                      <p>图片小于5M，仅支持JPG/PNG格式。</p>
                    </div>

                    <div className="flex text-[16px] mb-[10px] text-left 2xl:w-[701px] xl:w-[86%] lg:w-[79%] md:w-[51%] sm:w-[36%]">
                      <p className="text-[#222222]">请下载官方模板</p>

                      <p className="text-[#1366f0] cursor-pointer">《企业认证申请公函》,</p>

                      <p className="text-[#f05113]">加盖企业公章（合同章、财务章无效）扫描或者拍照上传。</p>
                    </div>
                  </div>
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666] inline-block mr-[5px]">公司联系邮箱</span>}
                  name="componenyEmail"
                  className="leading-[56px] text-[18px] text-left"
                  required
                  // emailNumberChange
                  rules={[
                    {
                      validator: (_, value) => emailNumberChange(value),
                    },
                  ]}
                >
                  <Input
                    placeholder="请输入公司联系邮箱"
                    className="h-[56px] text-[18px] text-left 2xl:w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
                    onChange={(e) => form.setFieldValue("componenyEmail", e.target.value.replaceAll(" ", ""))}
                  />
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">验证手机</span>}
                  className="leading-[56px] text-[18px] text-left"
                  name="yanzhengshouji"
                  required
                >
                  <div className="text-[18px] flex justify-start text-[#222] leading-[54.5px] 2xl:w-[518px] xl:w-[100%] lg:w-[100%] md:w-[74%] sm:w-[53%]">
                    <p>1300****8931 (您可以在个人中心-</p>
                    {/* 跳转到个人信息首页 */}

                    <div onClick={accountsecuritySelf} className="text-[#1366f0] cursor-pointer">
                      账号安全
                    </div>
                    <p>内更换改绑手机号)</p>
                  </div>
                </Form.Item>

                <Form.Item
                  label={<span className="text-[18px] text-[#666666]">验证码</span>}
                  className="leading-[56px] text-[18px] text-left mb-[2]"
                  name="Verificationcode"
                  required
                  rules={[
                    {
                      validator: (_, value) => validateVerificationCode(value),
                    },
                  ]}
                >
                  <Input
                    className="h-[56px] leading-[56px] text-[18px] text-[#999999] 2xl:w-[570px] xl:w-[38vw] lg:w-[36vw] md:w-[34vw] sm:w-[32vw]"
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
                  className="text-[18px] text-left mb-[0] "
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
                  <div className="w-[1200px]  2xl:mx-auto xl:w-[90%] lg:w-[72%] md:w-[52%] sm:w-[42%]">
                    <Button
                      className="w-[520px] h-[56px] text-[18px] 2xl:w-[520px] xl:w-[50%] lg:w-[47%] md:w-[60%] sm:w-[40%]"
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
