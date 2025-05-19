// 新改的弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"

// 对公转账
import CorporateTransfer from "./components/CorporateTransfer"
// 引入输入支付弹框
import Enterpaymentpassword from "./components/Enterpaymentpassword"
// 扫码支付
import ScanCodePayment from "./components/ScanCodePayment"
function RepayimmediatelyComLqh() {
  const [isModalOpenCode, setIsModalOpenCode] = useState(false)
  console.log(isModalOpenCode)
  // 输入支付密码框 setIsModalOpenYuer
  const [isModalOpenYuer, setIsModalOpenYuer] = useState(false)
  console.log(isModalOpenYuer)

  // 对公转账弹框
  const [isModalOpenDg, setIsModalOpenDg] = useState(false)
  console.log(isModalOpenDg)

  // 扫码支付
  const scanCodePayment = () => {
    setIsModalOpenCode(true)
  }

  // 余额支付
  const balancePaymentBtn = () => {
    setIsModalOpenYuer(true)
  }
  // 对公转账弹框
  const corporateTransferBtn = () => {
    // setIsModalOpen(false)

    setIsModalOpenDg(true)
  }
  // 关闭输入支付密码
  const closepaymentPassword = () => {
    setIsModalOpenYuer(false)
  }
  const closeCorporateTransfers = () => {
    // 关闭对公转账弹框
    setIsModalOpenDg(false)
  }
  return (
    <div className="h-[44.440vh] 2xl:w-[820px] xl:w-[78vw] lg:w-[71vw] md:w-[68vw] sm:w-[60vw]">
      <div className="text-center mt-[60px] mb-[60px]">
        <span className="text-[20px] text-[#222222]">已用额度：</span>

        <span className="text-[20px] text-[#f05113]">￥3266.32</span>
      </div>

      <div className="w-[660px] mx-auto max-w-[660px] pb-[30px] 2xl:w-[100%] xl:w-[90%] lg:w-[85%] md:w-[80%] sm:w-[75%]">
        <div className="w-[660px] flex justify-start gap-[50px] items-center flex-wrap">
          <div className="flex justify-around">
            <div
              onClick={balancePaymentBtn}
              className="h-[100px] max-w-[300px] bg-[#ffffff] rounded-[8px] border border-[#1366f0] text-center pt-[15px] pb-[15px] pl-[0] pr-[0] font-normal cursor-pointer  mr-[60px] 2xl:w-[300px] xl:w-[50vw]  lg:w-[29vw] md:w-[31vw] sm:w-[38vw]"
            >
              <p className="text-[22px] text-[#1366f0] mb-[8px] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px]">
                余额支付
              </p>

              <span className="text-[#222222] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[14px] sm:text-[12px]">
                账户余额：
              </span>

              <span className="text-[#f05113] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[14px] sm:text-[12px]">
                ￥998.00
              </span>
            </div>

            <div
              onClick={scanCodePayment}
              className="h-[100px] max-w-[300px] bg-[#ffffff] rounded-[8px] border border-[#1366f0] text-center pt-[15px] pb-[15px] pl-[0] pr-[0] font-normal cursor-pointer  2xl:w-[300px] xl:w-[50vw]  lg:w-[29vw] md:w-[31vw] sm:w-[38vw]"
            >
              <p className="text-[22px] text-[#1366f0] mb-[8px] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px]">
                扫码支付
              </p>

              <p className="text-[18px] text-[#222222] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[14px] sm:text-[12px]">
                通过微信或支付宝扫码支付
              </p>
            </div>
          </div>

          <div className="flex justify-around">
            <div
              onClick={corporateTransferBtn}
              className="max-w-[300px] h-[100px] bg-[#ffffff] rounded-[8px] border border-[#1366f0] text-center pt-[15px] pb-[15px] pl-[0] pr-[0] font-normal cursor-pointer  2xl:w-[300px] xl:w-[50vw]  lg:w-[29vw] md:w-[31vw] sm:w-[38vw]"
            >
              <p className="text-[#1366f0]  mb-[8px] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px]">
                对公转账
              </p>

              <p className="text-[#222222] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[14px] sm:text-[12px]">
                使用公司对公账户进行还款
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 输入支付密码--自己封装的弹框对话框 */}
      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        open={isModalOpenYuer}
        onCancel={closepaymentPassword}
        onOk={() => setIsModalOpenYuer(false)}
        title="输入支付密码"
        classname="custom-modal-wdqbyrcz"
        closable={true} //显示右上角关闭按钮 />
        content={<Enterpaymentpassword />}
      />

      {/* 扫码支付弹框 */}
      <ModalLqh2
        width="830px"
        open={isModalOpenCode}
        onCancel={() => setIsModalOpenCode(false)}
        onOk={() => setIsModalOpenCode(false)}
        title=""
        classname="custom-modal-wdqbsmzf"
        closable={true} //显示右上角关闭按钮 />
        content={<ScanCodePayment />}
      />

      {/* 对公转账弹框 */}
      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        open={isModalOpenDg}
        onCancel={closeCorporateTransfers}
        onOk={() => setIsModalOpenDg(false)}
        title="对公转账"
        classname="custom-modal-wdqbdgzz"
        closable={true} //显示右上角关闭按钮 />
        content={<CorporateTransfer />}
      />
    </div>
  )
}

export default RepayimmediatelyComLqh
