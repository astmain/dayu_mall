import { Button, Form, Input } from "antd"

import ModalLqh2 from "@/components/ModalLqh2"
// 引入新的支付协议弹框
import ModalPaymentLqhSecond from "@/components/ModalPaymentLqh2"
import { validatePassword } from "@/utils/validators"

import Setpaymentpassword from "./Setpaymentpassword"
function EnterpaymentpasswordLqh() {
  const [form] = Form.useForm()
  // 支付协议弹框
  const [isModalOpenPayment, setIsModalOpenPayment] = useState(false)

  // 设置支付密码弹框
  const [isSetZfpwd, SetIszfpwd] = useState(false)

  const onFinishPwd = (values: any) => {
    // 传支付密码参数给后端
    const params = {
      zfpassword: values.zfpassword,
    }
    // // 关闭输入支付密码弹框
    // setIsModalOpenYuer(false)

    console.log(params, "params传支付密码参数给后端")
  }
  const onFinishFailedPwd = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 设置支付密码
  const setChangePwd = () => {
    SetIszfpwd(true)
  }

  // 支付协议事件
  const payment = () => {
    setIsModalOpenPayment(true)
  }

  // 处理自定义事件
  const handleCustomEvent = () => {
    SetIszfpwd(false)
  }
  return (
    <div className="w-[830px] max-w-[830px] 2xl:w-[100vw] xl:w-[95vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw] pt-[30px] pb-[6px] pl-[30px] pr-[30px]">
      <div className="text-[14px]">
        <Form name="basic" onFinish={onFinishPwd} onFinishFailed={onFinishFailedPwd} autoComplete="off" form={form}>
          <Form.Item
            label={<span className="text-[18px] text-[#222222]">输入密码</span>}
            name="zfpassword"
            className="leading-[56px]"
            rules={[{ validator: (_, value) => validatePassword(value) }]}
          >
            <Input.Password
              className="h-[56px] leading-[56px] text-[18px]"
              placeholder="请输入支付密码"
              maxLength={12}
              onChange={(e) => form.setFieldValue("zfpassword", e.target.value.replaceAll(" ", ""))}
            />
          </Form.Item>
          <Form.Item>
            <p className="text-[#999999] mt-[-6px] mb-[39px] w-[673px] text-center">
              还未设置支付密码的，请使用默认密码支付（登录密码），或前往
              <span className="cursor-pointer text-[#1366F0]" onClick={setChangePwd}>
                设置支付密码
              </span>
            </p>
          </Form.Item>

          <Form.Item>
            <div className="text-center">
              <span>支付即同意</span>

              <span className="cursor-pointer text-[#1366F0] text-[16px]" onClick={payment}>
                《大宇3D用户支付协议和隐私政策》
              </span>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-center">
              <div className="mr-[20px]">
                <Button className="w-[130px] h-[56px] text-[20px] text-[#222222]">取消</Button>
              </div>
              <div>
                <Button htmlType="submit" type="primary" className="w-[130px] h-[56px] text-[20px] text-[#fff]">
                  确定支付
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>

      {/* 支付协议新封装的弹框 */}
      <ModalPaymentLqhSecond
        width="300px"
        zIndex={2222}
        title="支付协议"
        open={isModalOpenPayment}
        onCancel={() => setIsModalOpenPayment(false)}
        onOk={() => setIsModalOpenPayment(false)}
        classname="custom-modal-zfxieyi"
        closable={true}
        content={<div>内容lqh</div>}
      />
      {/* 设置支付密码弹框 */}

      <ModalLqh2
        width="w-[830px] rounded-[20px]"
        open={isSetZfpwd}
        onCancel={() => SetIszfpwd(false)}
        onOk={() => SetIszfpwd(false)}
        title="设置支付密码"
        closable={true} //显示右上角关闭按钮 />
        classname="custom-modal-qbsetzfpwd"
        content={<Setpaymentpassword onCustomEvent={handleCustomEvent} />}
      ></ModalLqh2>
    </div>
  )
}

export default EnterpaymentpasswordLqh
