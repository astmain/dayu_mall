// import MonthlypaymentcardStyle from "./index.module.scss"

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import { DatePicker, Space } from "antd"
import dayjs from "dayjs"

// 新改的弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"
// 引入新的协议弹框
import ModalPaymentLqhSecond from "@/components/ModalPaymentLqh2"
import XzzTag from "@/components/XzzTag"

// 账单列表
import BillListComLqh from "./components/BillListCom"
// 引入月付卡立即还款
import RepayimmediatelyCom from "./components/RepayimmediatelyCom"

function MonthlypaymentcardLqh() {
  // 年月格式
  const monthFormat = "YYYY/MM"

  // 立即还款弹框
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 支付协议弹框
  const [isModalOpenPayment, setIsModalOpenPayment] = useState(false)

  // 立即还款事件
  const repayImmediately = () => {
    setIsModalOpen(true)
  }

  // 月付卡用户协议
  const MonthlyPaymentCardUserAgreement = () => {
    setIsModalOpenPayment(true)
  }

  return (
    <div className="pt-[30px] pb-[30px] pl-[30px] pr-[30px]">
      <div className="w-[100%] h-[306px] bg-[#333333] rounded-[20px] relative pt-[30px] pb-[30px] pl-[30px] pr-[30px] overflow-hidden">
        <div className="text-[18px] flex justify-between pt-[10px]">
          <div className="text-[14px] text-[#dcdcdc] font-normal flex flex-1">
            <span>还款日：每月1号出账单，10号还款</span>
          </div>

          <div className="text-[18px] text-[#f05113] font-normal flex-1">
            <span>月付卡</span>
          </div>

          <div className="flex justify-end items-center flex-1">
            <span className="text-[14px] text-[#f05113] cursor-pointer" onClick={MonthlyPaymentCardUserAgreement}>
              月付卡用户协议
            </span>
          </div>
        </div>
        {/* 金额 */}

        <div className="w-[100%] max-w-[1140px] flex justify-center">
          <div className="flex justify-between w-[63%] pt-[64px] flex-wrap">
            <div className="flex-1">
              <div className="text-center text-[#f05113] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[18px]">
                <span>可用额度</span>
              </div>

              <div className="text-[#f05113] text-center">
                <span className="text-[22px]">￥</span>
                <span className="text-[36px]">5000.00</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="w-[1px] h-[42px] bg-[#dcdcdc]"></div>
            </div>

            <div className="text-[#f05113] flex-1">
              <div className="font-normal text-[18px] text-[#f05113] text-center">
                <span>剩余额度</span>
              </div>

              <div className="text-[#f05113] text-center">
                <span className="text-[22px]">￥</span>

                <span className="text-[36px]">1288.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* 立即还款按钮 mt-[33px]*/}
        <div className="flex justify-center items-center 2xl:mt-[33px] xl:mt-[33px] lg:mt-[33px] md:mt-[-17px] sm:mt-[-17px]">
          <div
            onClick={repayImmediately}
            className="w-[112px] h-[42px] leading-[42px] bg-[#333333] rounded-[8px] text-[#ffffff] text-[18px] border border-[#dcdcdc] cursor-pointer"
          >
            <span>立即还款</span>
          </div>
        </div>

        <div className="flex justify-end absolute bottom-[0px] right-[1px]">
          <img
            className="w-[100%] h-[240px] max-w-[263px] 2xl-[100%] xl:w-[95%] lg:w-[81%] md:w-[60%] md:h-[37vh] sm:w-[45%] sm:h-[39vh]"
            src={imgUrl + "yuecard.png"}
            alt=""
          />
        </div>
      </div>

      <div className="mt-[31px] flex mb-[31px] justify-between">
        <div>
          <XzzTag title={"月付卡账单"}></XzzTag>
        </div>
        <div className="flex">
          <div className="text-[#999999] text-[18px] mr-[31px]">
            <span>本月已用额度￥3722.00</span>
          </div>
          <div className="mt-[-4px]">
            <Space direction="vertical" size={12}>
              <DatePicker defaultValue={dayjs("2015/01", monthFormat)} format={monthFormat} picker="month" />
            </Space>
          </div>
        </div>
      </div>

      {/* 月付卡账单列表 */}

      <BillListComLqh />

      {/* 立即还款 使用自己封装的弹框组件*/}
      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        title="立即还款"
        classname="custom-modal-wdqbyrcz"
        closable={true} //显示右上角关闭按钮 />
        content={<RepayimmediatelyCom />}
      />

      {/* 月付卡用户协议 */}
      <ModalPaymentLqhSecond
        width="300px"
        zIndex={2222}
        title="月付卡协议"
        open={isModalOpenPayment}
        onCancel={() => setIsModalOpenPayment(false)}
        onOk={() => setIsModalOpenPayment(false)}
        classname="custom-modal-zfxieyi"
        closable={true}
        content={<div>月付卡</div>}
      />
    </div>
  )
}

export default MonthlypaymentcardLqh
