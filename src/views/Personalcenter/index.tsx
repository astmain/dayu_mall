const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import Accountauthorization from "./Accountauthorization"
import Accountsecurity from "./Accountsecurity"
import CompanyInformation from "./CompanyInformation"
import Invoiceinformation from "./Invoiceinformation"
import PersonalInformation from "./PersonalInformation"
import Shippingaddress from "./Shippingaddress"

const PersonalInformationList = [
  {
    title: "个人信息",
  },
  {
    title: "我的钱包",
  },
  {
    title: "我的积分",
  },
  {
    title: "我的订单",
  },
  {
    title: "公司信息",
  },
  {
    title: "收货地址",
  },
  {
    title: "开票资料",
  },

  {
    title: "账号授权",
  },
  {
    title: "账号安全",
  },
]

function PersonalcenterLqh() {
  // 我的钱包切换变量
  const { setIsisMoney } = useWalletStore((state) => state)

  // 个人中心切换变量
  const { isInformation, setIsInformation } = usePersonalcenterStore((state) => state)
  // 路由跳转
  const navigate = useNavigate()
  const PersonalInformationBth = (value: any) => {
    if ([1, 2, 3].includes(value)) {
      if (value === 3) {
        navigate("/order")
      } else {
        navigate("/wallet")
        setIsisMoney(value === 1 ? 0 : 2)
      }
      // 解决个人中心页面跳转我的钱包页面，返回回来个人中心页面显示空白，bug
      setTimeout(() => {
        setIsInformation(0)
      }, 2000)
    }

    setIsInformation(value)
  }
  return (
    <div className="h-[800px] mx-[auto] pt-[31px] max-w-[1200px] 2xl:w-[100%] xl:w-[80%] lg:w-[70%] md:w-[60%] sm:w-[83%]">
      <div className="flex">
        {/* 左边内容 */}

        <div className="mr-[20px]">
          <div className="w-[260px] h-[260px] rounded-[10px] border border-[#dcdcdc] bg-[#ffffff] flex flex-col justify-center items-center mb-[20px] max-w-[260px] 2xl:w-[25.5vw] xl:w-[24vw] lg:w-[22vw] md:w-[18vw] sm:w-[22vw]">
            <div className="w-[100px] h-[100px] flex justify-center items-center mb-[21px]">
              <img className="w-[100px] h-[100px]" src={imgUrl + "wechatpay2.png"} alt="" />
            </div>

            <div className="text-[22px] text-[#222222]">
              <p>DAYU-3D</p>
            </div>
          </div>
          {/* 个人信息切换 */}

          <div className="w-[260px] h-[397px] rounded-[10px] border border-[#dcdcdc] bg-[#ffffff] max-w-[260px] 2xl:w-[25.5vw] xl:w-[24vw] lg:w-[22vw] md:w-[18vw] sm:w-[22vw] text-[14px]">
            <div className="pt-[30px] pb-[30px]">
              <ul className="scrollable-PersonalCenter text-left relative max-h-[348px] overflow-auto">
                {PersonalInformationList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => PersonalInformationBth(index)}
                      className={`${isInformation === index ? "selected" : ""} hover:bg-[rgba(224,224,224,0.5)] h-[48px] leading-[48px] mb-[9.5px] cursor-pointer pl-[36px] h-[48px] text-[18px]`}
                    >
                      <span> {item.title}</span>

                      {/* 使用伪元素 selected 的样式 */}
                      {isInformation === index && (
                        <span className="absolute left-[0] w-[6px] h-[21px] mt-[13px] bg-[#1366f0] rounded-[3px] content-['']" />
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        {/* 右边切换组件 */}
        <div>
          {isInformation == 0 && (
            // 个人信息组件
            <PersonalInformation />
          )}
          {/* 公司信息组件Invoiceinformation */}
          {isInformation == 4 && <CompanyInformation />}
          {isInformation == 5 && (
            // 收货地址组件
            <Shippingaddress />
          )}
          {isInformation == 6 && (
            // 开票资料组件
            <Invoiceinformation />
          )}

          {isInformation == 7 && (
            // 账号授权组件
            <Accountauthorization />
          )}
          {isInformation == 8 && (
            // 账号安全组件
            <Accountsecurity />
          )}
        </div>
      </div>
    </div>
  )
}

export default PersonalcenterLqh
