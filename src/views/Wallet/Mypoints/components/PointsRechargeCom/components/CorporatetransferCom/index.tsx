import { Button, Form, Input, Space } from "antd"

// 支付协议新的弹框
import ModalPaymentLqhSecond from "@/components/ModalPaymentLqh2"
import XzzCopyBtn from "@/components/XzzCopBtn"
import { validateVerificationBankAccountNumber } from "@/utils/validators"

function CorporatetransferComLqh() {
  const [form] = Form.useForm()
  // 支付协议弹框
  const [isModalOpenPayment, setIsModalOpenPayment] = useState(false)
  // 已支付--状态轮询如果成功关闭弹框
  const onFinish = (values: any) => {
    // 对公转账参数传给后端
    const params = {
      componeyname: values.componeyname,
      openbank: values.openbank,
      bankNumber: values.bankNumber,
      Rechargenumber: values.Rechargenumber,
    }

    // // 关闭弹框 把对公转账参数传给后端，成功状态关闭弹框
    // setIsModalOpenDg(false)
    console.log(params, "params对公转账")
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 支付协议事件
  const payment = () => {
    setIsModalOpenPayment(true)
  }
  return (
    <div className="bg-[#ffffff] h-[67.96vh] rounded-[20px] w-[822px] max-w-[822px] 2xl:w-[822px] xl:w-[62vw] lg:w-[67vw] md:w-[78vw] sm:w-[85vw]">
      <div className="text-center mt-[27px]  text-[20px]">
        <span className="text-[#222222]">积分余额：</span>

        <span className="text-[#f05113]">￥9388.00</span>
      </div>

      <div className="flex justify-center items-center pt-[30px] pb-[30px] pl-[110px] pr-[110px]">
        <Form
          name="basicdgzz"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label={<span className="text-[18px] text-[#222222]">公司名称</span>}
            name="componeyname"
            style={{ lineHeight: "56px", fontSize: "18px", color: "#222222" }}
            rules={[
              {
                required: true,
                message: "请输入公司名称",
              },
            ]}
          >
            <Space>
              <Form.Item noStyle>
                <Input
                  className="h-[56px] text-[18px] w-[436px] max-w-[436px] 2xl:w-[436px] xl:w-[33vw] lg:w-[35vw] md:w-[44vw] sm:w-[55vw]"
                  placeholder="请输入公司名称"
                />
              </Form.Item>

              <div className="ml-[11px] w-[70px]">
                <XzzCopyBtn title={"componeyname"} />
              </div>
            </Space>
          </Form.Item>

          <Form.Item
            label={<span className="text-[18px] text-[#222222]">开户银行</span>}
            name="openbank"
            style={{ lineHeight: "56px", fontSize: "18px", color: "#222222" }}
            rules={[
              {
                required: true,
                message: "请输入开户银行",
              },
            ]}
          >
            <Space>
              <Form.Item noStyle>
                <Input
                  className="w-[436px] h-[56px] text-[18px] w-[436px] max-w-[436px] 2xl:w-[436px] xl:w-[33vw] lg:w-[35vw] md:w-[44vw] sm:w-[55vw]"
                  placeholder="请输入开户银行"
                />
              </Form.Item>

              <div className="ml-[11px]">
                <XzzCopyBtn title={"openbank"} />
              </div>
            </Space>
          </Form.Item>

          <Form.Item
            label={<span className="text-[18px] text-[#222222]">银行账号</span>}
            style={{ lineHeight: "56px", fontSize: "18px", color: "#222222" }}
            required
          >
            <Space>
              <Form.Item
                noStyle
                name="bankNumber"
                rules={[{ validator: (_, value) => validateVerificationBankAccountNumber(value) }]}
              >
                <Input
                  maxLength={19}
                  onChange={(e) => form.setFieldValue("bankNumber", e.target.value.replaceAll(" ", ""))}
                  className="w-[436px] h-[56px] text-[18px] w-[436px] max-w-[436px] 2xl:w-[436px] xl:w-[33vw] lg:w-[35vw] md:w-[44vw] sm:w-[55vw]"
                  placeholder="请输入银行账号"
                />
              </Form.Item>

              <div className="ml-[11px]">
                <XzzCopyBtn title="bankNumber" />
              </div>
            </Space>
          </Form.Item>

          <Form.Item
            label={<span className="text-[18px] text-[#222222]">充值单号</span>}
            style={{ lineHeight: "56px", fontSize: "18px", color: "#222222" }}
            required
          >
            <Space>
              <Form.Item
                noStyle
                name="Rechargenumber"
                rules={[
                  {
                    required: true,
                    message: "请输入充值单号",
                  },
                ]}
              >
                <Input
                  className="w-[436px] h-[56px] text-[18px] w-[436px] max-w-[436px] 2xl:w-[436px] xl:w-[33vw] lg:w-[35vw] md:w-[44vw] sm:w-[55vw]"
                  placeholder="请输入充值单号"
                />
              </Form.Item>

              <div className="ml-[11px]">
                <XzzCopyBtn title="Rechargenumber" />
              </div>
            </Space>
          </Form.Item>

          <Form.Item>
            <div className="mt-[-4px] h-[34px] font-normal text-[12px] text-[#f05113] pl-[87px] mb-[52px]">
              <p>说明：1、对公转账时请复制充值单号在备注里填写充值单号方便快速审核；</p>

              <p className="pl-[37px]">2、对公转账未备注充值单号审核将在24小时内完成。</p>
            </div>

            <div className="pl-[125px] text-[16px] mb-[18px]">
              <span>支付即同意</span>

              <span className="text-[#1366F0] cursor-pointer" onClick={payment}>
                《大宇3D用户支付协议和隐私政策》
              </span>
            </div>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0" }}>
            <div className="flex justify-center">
              <Button className="w-[150px] h-[56px] text-[18px] mr-[20px]">联系客服</Button>

              <Button htmlType="submit" type="primary" className="w-[150px] h-[56px] text-[18px]">
                已支付
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>

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
    </div>
  )
}

export default CorporatetransferComLqh
