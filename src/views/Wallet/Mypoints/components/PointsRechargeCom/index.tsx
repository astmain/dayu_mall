import ModalLqh2 from "@/components/ModalLqh2/index"

import CorporatetransferComLqh from "./components/CorporatetransferCom"
import ScancodepaymentComLqh from "./components/ScancodepaymentCom"

function PointsRechargeComLqh() {
  // 对公转账弹框
  const [isModalOpenDg, setIsModalOpenDg] = useState(false)
  // 扫码支付弹框
  const [isModalOpenCode, setIsModalOpenCode] = useState(false)

  //   对公转账
  const corporateTransferBtn = () => {
    setIsModalOpenDg(true)
  }
  // 清空对公转账表单参数和关闭对公转账弹框
  const CorporateTransfer = () => {
    setIsModalOpenDg(false)
  }
  // 扫码支付
  const scanCodePayment = () => {
    setIsModalOpenCode(true)
  }
  return (
    <div className="h-[42.438vh]  2xl:w-[830px] xl:w-[54vw] lg:w-[52vw] md:w-[50vw] sm:w-[48vw]">
      <div className="text-center mt-[59px] mb-[105px]">
        <span className="text-[20px] text-[#222222]">积分余额：</span>

        <span className="text-[20px] text-[#f05113]">￥9388.00</span>
      </div>

      <div className="flex justify-around items-center pb-[30px]">
        <div
          onClick={corporateTransferBtn}
          className="h-[100px] bg-[#fff] rounded-[8px] border border-[#1366f0] text-center leading-none pt-[20px] pb-[20px] pl-[0] pr-[0] font-normal cursor-pointer 2xl:w-[300px] xl:w-[36%] lg:w-[35%] md:w-[35%] sm:w-[35%]"
        >
          <p className="text-[#1366f0] mb-[19px] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px]">
            对公转账
          </p>

          <p className="text-[#222222] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[14px] sm:text-[12px]">
            使用对公转账进行充值
          </p>
        </div>

        <div
          onClick={scanCodePayment}
          className="h-[100px] bg-[#fff] rounded-[8px] border border-[#1366f0] text-center leading-none pt-[20px] pb-[20px] pl-[0] pr-[0] font-normal cursor-pointer 2xl:w-[300px] xl:w-[36%] lg:w-[35%] md:w-[35%] sm:w-[35%]"
        >
          <p className="text-[#1366f0] mb-[19px] 2xl:text-[22px] xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px]">
            扫码支付
          </p>

          <p className="text-[#222222] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[14px] sm:text-[12px]">
            通过微信或支付宝扫码充值
          </p>
        </div>
      </div>

      {/* 对公转账弹框 */}
      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        open={isModalOpenDg}
        onCancel={CorporateTransfer}
        onOk={() => setIsModalOpenDg(false)}
        title="对公转账"
        classname="custom-modal-wdqbdgzz"
        closable={true}
        content={<CorporatetransferComLqh />}
      />

      {/* 扫码支付 */}
      <ModalLqh2
        width="830px"
        open={isModalOpenCode}
        onCancel={() => setIsModalOpenCode(false)}
        onOk={() => setIsModalOpenCode(false)}
        title=""
        classname="custom-modal-wdqbsmzf"
        closable={true}
        content={<ScancodepaymentComLqh />}
      />
    </div>
  )
}

export default PointsRechargeComLqh
