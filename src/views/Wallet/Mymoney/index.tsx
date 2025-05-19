import { DatePicker, Space } from "antd"

// import React, { useEffect, useState } from "react"
// 新改的弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import dayjs from "dayjs"

import XzzTag from "@/components/XzzTag"

// 余额充值
import Balancerecharge from "./components/BalancerechargeCom"
// 账单列表
import BillListComLqh from "./components/BillListCom"
// 提现组件
import Withdrawal from "./components/Withdrawal"

function MymoneyLqh() {
  // 年月格式
  const monthFormat = "YYYY/MM"

  //余额充值
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 提现弹框
  const [open, setOpen] = useState(false)

  const handleOk = () => {
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  // 余额充值
  const balanceRechargeMoney = () => {
    setIsModalOpen(true)
  }

  // 提现
  const WithdrawalBtn = () => {
    setOpen(true)
  }

  return (
    <div className="pt-[30px] pb-[30px] pl-[30px] pr-[30px]">
      <div className="w-[100%] h-[306px] bg-[#333333] relative  rounded-[20px] overflow-hidden max-w-[1140px]">
        <div className="pt-[40px] text-[18px] text-[#f05113] pb-[64px]">
          <span>账户余额</span>
        </div>
        <div>
          <span className="text-[#f05113] text-[22px]">￥</span>

          <span className="text-[36px] text-[#f05113] cursor-pointer">9388.00</span>
        </div>

        <div className="flex justify-center items-center mt-[59px]">
          <div
            onClick={WithdrawalBtn}
            className="w-[112px] h-[42px] leading-[42px] bg-[#333333] rounded-[8px] mr-[20px] text-[#fff] text-[18px] border border-[#dcdcdc] cursor-pointer"
          >
            <span>提现</span>
          </div>

          <div
            onClick={balanceRechargeMoney}
            className="w-[112px] h-[42px] leading-[42px] bg-[#333333] rounded-[8px] mr-[20px] text-[#fff] text-[18px] border border-[#dcdcdc] cursor-pointer"
          >
            <span>余额充值</span>
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
          <XzzTag title={"我的账单"}></XzzTag>
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
      {/* bill 账单列表 第三块 添加瀑布流或者分页*/}
      <BillListComLqh />

      {/* 我的钱包--余额充值 */}
      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
        title="余额充值"
        classname="custom-modal-wdqbyrcz"
        closable={true} //显示右上角关闭按钮 />
        content={<Balancerecharge />}
      />

      {/* 我的钱包--提现 */}
      <ModalLqh2
        open={open}
        title="提现"
        width="820px rounded-[20px]"
        footer={null}
        onCancel={handleCancel}
        onOk={handleOk}
        closable={true} //显示右上角关闭按钮 />
        classname="custom-modal-tx"
        content={<Withdrawal />}
      />
    </div>
  )
}

export default MymoneyLqh
