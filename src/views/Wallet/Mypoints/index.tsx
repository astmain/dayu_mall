import { DatePicker, Space } from "antd"

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import dayjs from "dayjs"

// 新改的弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"
import XzzTag from "@/components/XzzTag"

import PointsBillCom from "./components/PointsBillCom"
// 引入积分充值弹框
import PointsRechargeComLqh from "./components/PointsRechargeCom"

function MymoneyLqh() {
  // 年月格式
  const monthFormat = "YYYY/MM"

  // 积分充值弹框
  const [isModalOpen, setIsModalOpen] = useState(false)

  const balanceRecharge = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="pt-[30px] pb-[30px] pl-[30px] pr-[30px]">
      <div className="w-[100%] h-[306px] bg-[#333333] relative  rounded-[20px] overflow-hidden max-w-[1140px]">
        <div className="pt-[40px] text-[18px] text-[#f05113] pb-[64px]">
          <span>积分余额</span>
        </div>
        <div>
          <span className="text-[#f05113] text-[22px]">￥</span>

          <span className="text-[36px] text-[#f05113] cursor-pointer">9388.00</span>
        </div>

        <div className="flex justify-center items-center mt-[59px]">
          <div
            onClick={balanceRecharge}
            className="w-[112px] h-[42px] leading-[42px] bg-[#333333] rounded-[8px] mr-[20px] text-[#fff] text-[18px] border border-[#dcdcdc] cursor-pointer"
          >
            <span>积分充值</span>
          </div>
        </div>

        <div className="flex justify-end absolute bottom-[0px] right-[1px]">
          <img
            className="w-[100%] max-w-[299px] h-[187px] 2xl-[100%] xl:w-[95%] lg:w-[90%] md:w-[73%] sm:w-[51%]"
            src={imgUrl + "backyezf.png"}
            alt=""
          />
        </div>
      </div>

      <div className="mt-[31px] flex mb-[31px] justify-between">
        <div>
          <XzzTag title={"积分账单"}></XzzTag>
        </div>

        <div className="flex">
          <div className="text-[#999999] text-[18px] mr-[31px]">
            <span>支出￥5212.24 收入￥10000.00</span>
          </div>

          <div className="mt-[-4px]">
            <Space direction="vertical" size={12}>
              <DatePicker
                className="text-[20px]"
                defaultValue={dayjs("2015/01", monthFormat)}
                format={monthFormat}
                picker="month"
              />
            </Space>
          </div>
        </div>
      </div>

      {/* 积分账单 */}
      <PointsBillCom />

      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        title="积分充值"
        classname="custom-modal-wdqbyrcz"
        closable={true}
        content={<PointsRechargeComLqh />}
      />
    </div>
  )
}

export default MymoneyLqh
