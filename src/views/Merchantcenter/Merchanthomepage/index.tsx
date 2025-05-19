import { Popover } from "antd"

import EmptyLqh from "@/components/Emptylqh"

// import { Empty } from "antd"
// import React, { PureComponent } from "react"
import NumberofvisitorsCom from "./components/NumberofvisitorsCom"

const imgUrl = "http://yun3d.com/frontend/public/test/"

const content = (
  <div className="text-[#dcdcdc]">
    <p>交易未完成的订单总额，</p>
    <p>消费者确认收货后将自</p>
    <p>动转入可提现金额（钱包余额）</p>
  </div>
)

// 可提现气泡
const contentWithdrawal = (
  <div className="text-[#dcdcdc]">
    <p>可提现金额（订单结算</p>
    <p>完成的入账金额）</p>
  </div>
)

function MerchanthomepageLqh() {
  const navigate = useNavigate()
  // 数据概览数据DataOverview
  const DataOverviewList = [
    { title: "昨日发布数", num: "08", moon: "36", all: "88" },
    { title: "昨日点击量", num: "56", moon: "36", all: "88" },
    { title: "昨日访客数", num: "08", moon: "36", all: "88" },
    { title: "昨日销售额（元）", num: "8888.88", moon: "12888.88", all: "328888.88" },
  ]
  console.log(DataOverviewList)

  // 最近访客数据
  const VisitorListArr = [
    {
      userId: 1,
      userName: "不吃香菜",
      imgSrc: imgUrl + "wechatpay2.png",
    },
    {
      userId: 2,
      userName: "不吃香菜",
      imgSrc: imgUrl + "wechatpay2.png",
    },
    {
      userId: 3,
      userName: "不吃香菜",
      imgSrc: imgUrl + "wechatpay2.png",
    },
    {
      userId: 4,
      userName: "不吃香菜",
      imgSrc: imgUrl + "wechatpay2.png",
    },
    {
      userId: 5,
      userName: "不吃香菜",
      imgSrc: imgUrl + "wechatpay2.png",
    },
    {
      userId: 6,
      userName: "不吃香菜",
      imgSrc: imgUrl + "wechatpay2.png",
    },
    {
      userId: 7,
      userName: "不吃香菜",
      imgSrc: imgUrl + "wechatpay2.png",
    },
  ]

  // 趋势图数据 trend
  const trendTabList = [
    {
      id: 1,
      title: "访客数",
    },
    {
      id: 2,
      title: "点击量",
    },
    {
      id: 3,
      title: "发布数",
    },
    {
      id: 4,
      title: "销售量",
    },
  ]

  // 作品概况假数据--后端的数据循环
  const OverviewoftheworkList = [
    {
      num: 0,
      title: "待售后",
      imgSrc: imgUrl + "kefu2.png",
    },
    {
      num: 0,
      title: "未通过",
      imgSrc: imgUrl + "kefu2.png",
    },
    {
      num: 1,
      title: "待审核",
      imgSrc: imgUrl + "kefu2.png",
    },
    {
      num: 0,
      title: "已上架",
      imgSrc: imgUrl + "kefu2.png",
    },
  ]

  const [istrend, settrend] = useState(0)
  const trendTabChange = (value: number) => {
    settrend(value)
  }

  return (
    <div className="flex w-[100%] h-[100%] max-w-[1420px] sm:w-[41vw] md:w-[45vw] lg:w-[49vw] xl:w-[52vw] 2xl:w-[1075px]">
      <div className="w-[1075px] flex flex-wrap sm:w-[41vw] md:w-[45vw] lg:w-[49vw] xl:w-[52vw] 2xl:w-[1075px]">
        <div className="h-[294px] sm:w-[41vw] md:w-[45vw] lg:w-[49vw] xl:w-[52vw] 2xl:w-[1075px]">
          {/* 数据概览 */}
          <div className="max-w-[1075px] h-[294px] bg-[#333333] rounded-[20px] mb-[20px] pt-[30px]">
            <div className="flex flex-wrap relative justify-start text-[#fff] pl-[30px] mb-[35px]">
              <div className="merchantcenterSugl text-[20px] mr-[19px] flex justify-center items-center">
                <span>数据概览</span>
              </div>

              <div className="flex justify-center items-center text-[16px]">
                <span>每日凌晨1点更新昨日数据</span>
              </div>
            </div>
            {/* 昨日发布 */}

            <div>
              <div className="flex justify-around flex-wrap sm:w-[41vw] md:w-[45vw] lg:w-[49vw] xl:w-[52vw] 2xl:w-[1075px]">
                {/*  前端先模拟数据动态循环 */}
                {DataOverviewList.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="flex flex-col justify-center items-center 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                        <div className="text-[#dcdcdc] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]  mb-[3px]">
                          <span>{item.title}</span>
                        </div>

                        <div className="text-[#f05113] text-[36px] 2xl:text-[36px] xl:text-[36px] lg:text-[36px] md:text-[30px] sm:text-[24px] mb-[3px]">
                          <span>{item.num}</span>
                        </div>

                        <div className="text-[#fff] text-[18px] w-[109px] 2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                          <p className="w-[109px]  truncate">月 {item.moon}</p>
                          <p className="w-[109px]  truncate">总 {item.all}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 第三个作品概况 */}
        <div className="h-[275px] max-w-[1075px] sm:w-[41vw] md:w-[45vw] lg:w-[49vw] xl:w-[52vw] h-auto 2xl:w-[1075px]">
          <div className="max-h-[275px] px-[20px] bg-[#333333] rounded-[20px] pt-[30px] pb-[30px] max-w-[1075px] sm:w-[41vw] md:w-[45vw] lg:w-[49vw] xl:w-[52vw] 2xl:w-[1075px]">
            <div className="flex justify-start pl-[30px] mb-[40px] relative">
              <div className="zpgk text-[#fff] text-[20px]">
                <span>作品概况</span>
              </div>
            </div>
            <div className="h-[126px] scrollable-div overflow-y-auto">
              <div className="flex items-start justify-center flex-wrap max-w-[1075px] gap-[20px]  w-full max-w-full overflow-x-hidden ">
                {/* 循环数据第一个 */}
                {/* 后端的数据循环 */}
                {OverviewoftheworkList.map((item, index) => {
                  return (
                    <div key={index} className="daishouhou w-[240px] relative h-[126px] bg-[#3c3c3c] rounded-[10px]">
                      <div className="flex justify-between pt-[17px] pl-[30px]">
                        <div className="text-left text-[#dcdcdc]">
                          {/* 数量大于等于1的显示橙色,这边的数量到时对接后端在确定数量是要用字符串还是数值型才好判断,前端数量先用字符串 */}
                          {item.num >= 1 ? (
                            <p className="w-[54px] text-[#F05113] truncate text-[36px]">{"0" + item.num}</p>
                          ) : (
                            <p className="w-[54px] truncate text-[36px]">{item.num}</p>
                          )}

                          <p className="2xl:text-[18px] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[16px]">
                            {item.title}
                          </p>
                        </div>

                        <div className="w-[90px]">
                          <img className="w-[90px] absolute r-[20px] bottom-[0]" src={item.imgSrc} alt="" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* 趋势图 */}
        <div>
          <div className="h-[482px] bg-[#333333] rounded-[20px] max-w-[1075px] sm:w-[42vw] md:w-[45vw] md:mr-[20px] lg:w-[49vw] xl:w-[52vw] 2xl:w-[1075px]">
            <div className="flex">
              <div className="flex  pt-[30px] pl-[30px] relative items-center mb-[81px]">
                <div className="flex justify-around qushitutext text-[20px] text-[#ffffff]">
                  <div>
                    <span>趋势图</span>
                  </div>
                  <div className="max-w-[950px] w-[950px] 2xl:w-[950px] xl:w-[43vw] lg:w-[40vw] sm:w-[38vw]">
                    <div className="leading-[36px]">
                      <div
                        // flex-wrap
                        className="tubiaoneirong w-[320px] mx-auto flex sm:flex-wrap sm:w-[162px] 2xl:w-[320px] 2xl:flex-nowrap xl:w-[320px] xl:flex-nowrap lg:w-[320px] lg:flex-nowrap md:w-[250px] md:flex-nowrap sm:w-[158px] sm:flex-nowrap justify-center  relative border border-solid border-[#dcdcdc] rounded-[18px] 2xl:text-[16px] xl:text-[16px] lg:text-[16px] md:text-[16px] sm:text-[0.79rem]"
                      >
                        {trendTabList.map((item, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => trendTabChange(index)}
                              style={{
                                cursor: "pointer",
                                width: "80px",
                                color: "#dcdcdc",
                                height: "36px",
                                background: "#333333",
                                borderTopLeftRadius: "18px",
                                borderBottomLeftRadius: "18px",
                                borderTopRightRadius: "18px",
                                borderBottomRightRadius: "18px",
                              }}
                              className={istrend == index ? "isQushi" : ""}
                            >
                              {item.title}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 点击图表切换 */}
            {istrend == 0 && (
              <div className="w-[100%] h-[300px] max-[auto]">
                <NumberofvisitorsCom visitors="" />
              </div>
            )}

            {istrend == 1 && (
              <div className="w-[100%] h-[300px] max-[auto]">
                <span>我是点击量组件页面</span>
              </div>
            )}
            {istrend == 2 && (
              <div className="w-[100%] h-[300px] max-[auto]">
                <span>我是发布数组件页面</span>
              </div>
            )}
            {istrend == 3 && (
              <div className="w-[100%] h-[300px] max-[auto]">
                <span>我是销售量组件页面</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  */}
      {/* 第二个用户名 */}
      <div className="ml-[20px]">
        <div className="max-w-[340px] h-[589px] bg-[#333333] rounded-[20px] pt-[40px] mb-[20px] sm:w-[40vw] md:w-[35vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[340px]">
          <div className="flex justify-between border-b border-[#474747] pb-[30px]">
            <div className="flex flex-col justify-center pl-[30px]">
              <div className="w-[100%] text-[20px] text-[#ffffff] mb-[30px]">
                <span>用户名：DAYU-3D</span>
              </div>

              <div className="flex text-[20px] text-[#ffffff] text-[left] justify-start">
                <p>下载量：2988</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/merchantcenter/authentication")}
              className="flex justify-center items-center text-[#dcdcdc] w-[100px] h-[42px] bg-[#3c3c3c] cursor-pointer"
              style={{ borderRadius: "21px 0px 0px 21px" }}
            >
              <span>已认证</span>
            </div>
          </div>

          {/* 第二个 */}

          <div className="pt-[50px] pl-[30px]  2xl:mb-[70px] xl:mb-[70px] lg:mb-[60px] md:mb-[40px] sm:mb-[14%]">
            <div>
              <div className="flex justify-start mb-[52px]">
                <div className="text-[#dcdcdc] text-left">
                  <div className="weiruzhangquestion flex justify-start items-center">
                    <p className="text-[18px] mr-[6px]">未入账 (元)</p>

                    <Popover
                      arrow={false}
                      placement="rightTop"
                      content={content}
                      overlayClassName="custom-popover-wrz" // 自定义类名
                    >
                      <img className="w-[22px] h-[22px] cursor-pointer" src={imgUrl + "yingwen2.png"} alt="" />
                    </Popover>
                  </div>

                  {/* 金额保留两位小数 */}

                  <p className="w-[131px] text-[36px] text-[#ffffff] truncate">0.00</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="text-[#dcdcdc] text-[left]">
                  <div className="flex justify-start items-center">
                    <p className="text-[18px] mr-[6px]">可提现 (元)</p>
                    <Popover
                      arrow={false}
                      placement="rightTop"
                      content={contentWithdrawal}
                      overlayClassName="custom-popover-ketixian" // 自定义类名
                    >
                      <img className="w-[22px] h-[22px] cursor-pointer" src={imgUrl + "yingwen2.png"} alt="" />
                    </Popover>
                  </div>

                  {/* 金额保留两位小数 */}

                  <p className="w-[131px] text-[36px] text-[#ffffff] truncate">1688.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* 第三个去提现按钮 */}

          <div className="flex justify-center items-center">
            <div
              onClick={() => navigate("/wallet")}
              className="w-[100%] max-w-[160px] h-[56px] bg-[#f05113] rounded-[7px] flex justify-center items-center text-[18px] text-[#ffffff] cursor-pointer 2xl:w-[100%] xl:w-[100%] lg:w-[98%] sm:w-[90%]"
            >
              <img
                className="w-[21px] h-[22px] leading-[56px] mr-[8px] mt-[-6px]"
                src={imgUrl + "tixian2.png"}
                alt=""
              />
              <span>去提现</span>
            </div>
          </div>
        </div>

        {/* 最近访客 */}

        <div className="h-[482px] bg-[#333333] rounded-[20px] pt-[30px] max-w-[340px] bg-[#333333] rounded-[20px] pt-[40px] mb-[20px] sm:w-[40vw] md:w-[35vw] lg:w-[40vw] xl:w-[25vw] 2xl:w-[340px]">
          <div>
            <div className="flex justify-start relative text-[20px] text-[#ffffff] pl-[30px] mb-[24px]">
              <span className="zuijinfangketextzuijinfangke">最近访客</span>
            </div>
            {/* 判断最近访客长度大于0,显示最近访客数据 */}
            {VisitorListArr.length > 0 && (
              <div className="scrollable-div overflow-y-auto h-[372px]">
                {/* 循环最近访客数据-- */}

                {VisitorListArr.map((item, index) => {
                  return (
                    <div key={index} className="flex justify-start pl-[30px] items-center mb-[20px] cursor-pointer">
                      <div className="mr-[19px]">
                        <img className="w-[50px] h-[50px]" src={item.imgSrc} alt="" />
                      </div>

                      <div className="text-[18px] text-[#dcdcdc]">
                        <span>{item.userName}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            {/* 最近访客没有数据的时候,显示暂无访客记录 */}
            {VisitorListArr.length === 0 && (
              <div className="h-[353px] flex justify-center items-center">
                <div>
                  <EmptyLqh description={<span className="text-[#666666]">暂无访客记录</span>} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MerchanthomepageLqh
