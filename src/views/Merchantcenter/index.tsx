const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import { Button } from "antd"

import Merchanthomepage from "./Merchanthomepage"
import Merchantinformation from "./Merchantinformation"
import Tradingorder from "./Tradingorder"
import Uploadedworkspage from "./Uploadedworkspage"
function MerchantcenterLqh() {
  const tablistArr = [
    { id: 1, title: "商户首页" },
    { id: 2, title: "我上传的作品" },
    { id: 3, title: "交易订单" },
    { id: 4, title: "商户信息" },
  ]

  const { isMerchant, setIsMerchant } = useMerchantcenterStoreStore((state) => state)

  const tablistChange = (value: number) => {
    setIsMerchant(value)
  }

  return (
    <div className="w-[100%] h-[100%] bg-[#f5f5f5]">
      <div>
        <div className="pt-[30px] pb-[30px] w-[100%] pl-[30px] mx-[auto] ">
          <div className="flex w-[100%]">
            <div className="mr-[20px]">
              <div className="w-[260px] h-[294px] bg-[#ffffff] mb-[20px] rounded-[20px]">
                <div className="flex justify-center pt-[30px] pb-[21px]">
                  <img className="w-[100px] h-[100px]" src={imgUrl + "wechatpay2.png"} alt="" />
                </div>

                <div className="text-[22px] text-[#222222] text-center pb-[28px]">
                  <span>DAYU-3D</span>
                </div>
                <div>
                  <Button className="w-[160px] h-[56px] text-[18px]" type="primary">
                    <img className="w-[18px]" src={imgUrl + "upload2.png"} alt="" />
                    上传作品
                  </Button>
                </div>
              </div>

              <div className="w-[260px] h-[397px] bg-[#ffffff] rounded-[20px]">
                <div className="pt-[30px] pb-[30px]">
                  <ul className="text-left text-[18px] relative">
                    {tablistArr.map((item, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => tablistChange(index)}
                          className={`${isMerchant === index ? "selected" : ""} hover:bg-[rgba(224,224,224,0.5)] h-[50px] leading-[50px] pl-[36px] cursor-pointer mb-[22px]`}
                        >
                          <span> {item.title}</span>

                          {/* 使用伪元素 selected 的样式 */}
                          {isMerchant === index && (
                            <span className="absolute left-[0] w-[6px] h-[21px] mt-[13px] bg-[#1366f0] rounded-[3px] content-['']" />
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {isMerchant == 0 && <Merchanthomepage />}

            {isMerchant == 1 && <Uploadedworkspage />}
            {isMerchant == 2 && <Tradingorder />}
            {isMerchant == 3 && <Merchantinformation />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MerchantcenterLqh
