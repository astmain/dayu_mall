// 引入月付卡组件

import Monthlypaymentcard from "./Monthlypaymentcard"
// 引入我的钱包组件
import MyMoney from "./Mymoney"
import Mypoints from "./Mypoints"

function MywalletLqh() {
  // 我的钱包tab数据接口
  const myMoneyTab = [
    {
      id: 1,
      title: "我的钱包",
    },
    {
      id: 2,
      title: "月付卡",
    },
    {
      id: 3,
      title: "我的积分",
    },
  ]

  const { isMoney, setIsisMoney } = useWalletStore((state) => state)

  const myWalletBtn = (value: number) => {
    setIsisMoney(value)
  }

  return (
    <div className="w-[100%] h-[100%] rounded-[20px] box-border border border-[#dcdcdc] mt-[30px] mb-[51px] max-w-[1200px]">
      <div className="flex pt-[22px] pl-[29px] pb-[18px] border-b border-[#dcdcdc]">
        {myMoneyTab.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => myWalletBtn(index)}
              className={`${isMoney === index ? "selectedtab" : ""} pr-[60px] text-center text-[18px] relative text-[#222222] cursor-pointer`}
            >
              <h1>{item.title}</h1>
              {isMoney == index && <div className="moneyBorder"></div>}
            </div>
          )
        })}
      </div>

      {/* 导入切换显示的组件 */}
      <div>{isMoney == 0 && <MyMoney />}</div>
      <div>{isMoney == 1 && <Monthlypaymentcard />}</div>
      <div>{isMoney == 2 && <Mypoints />}</div>
    </div>
  )
}

export default MywalletLqh
