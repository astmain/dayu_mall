import { Button, Radio } from "antd"
const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL
function PaymentmethodLqh() {
  const [value, setValue] = useState(1)
  const onChange = (e: any) => {
    console.log(e)

    setValue(e.target.value)
  }
  return (
    <div
      className="w-[1200px] pb-[58px]  mt-[31px] mb-[31px] max-w-[1200px] 2xl:w-[100%] xl:w-[93%] lg:w-[90%] md:w-[88%] sm:w-[85%]"
      style={{ borderRadius: "20px", border: "1px solid #dcdcdc" }}
    >
      {/* 头部内容 */}
      <div className="pt-[35px] text-center">
        <p className="text-[22px] text-[#222222]">付款金额</p>
        <p className="text-[48px] text-[#F05113]">￥108.62</p>
      </div>
      {/* 中间支付方式 */}
      <div className="w-[760px] mx-auto max-w-[760px] 2xl:w-[100%] xl:w-[93%] lg:w-[90%] md:w-[90%] sm:w-[85%]">
        <div className="text-left mb-[21px]">
          <span className="text-[#999999] text-[22px]">支付方式:</span>
        </div>
        {/* 选择支付方式 */}
        <div className="w-[760px] max-w-[760px] flex justify-between flex-wrap items-center text-left 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%]">
          <Radio.Group
            onChange={onChange}
            value={value}
            style={{ lineHeight: "100px" }}
            // 到时后端提供数据,前端渲染,然后点击传值给后端
            options={[
              {
                value: 1,
                label: (
                  <div>
                    <div
                      className="w-[270px] pt-[5px]  pb-[5px]  flex justify-start mr-[134px] max-w-[270px] 2xl:w-[270px] xl:w-[100vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw]"
                      style={{ border: "1px solid #e5e5e5", borderRadius: "5px" }}
                    >
                      {/* 左边图片 */}
                      <div className="flex justify-center items-center ml-[10px]">
                        <img className="w-[36px]" src={imgUrl + "yuer2.png"} alt="" />
                      </div>
                      <div className="ml-[21px]">
                        <p className="text-[18px] text-[#222222]">余额支付</p>
                        <span className="text-[15px] text-[#666666]">账户余额:</span>
                        <span className="text-[15px] text-[#F05113]">￥998.00</span>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                value: 2,
                label: (
                  <div
                    className="w-[270px] pt-[5px] pb-[5px]  text-left flex justify-start max-w-[270px] 2xl:w-[270px] xl:w-[100vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw]"
                    style={{ border: "1px solid #e5e5e5", borderRadius: "5px" }}
                  >
                    {/* 左边图片 */}
                    <div className="flex justify-center items-center ml-[10px]">
                      <img className="w-[36px]" src={imgUrl + "wxzf2.png"} alt="" />
                    </div>
                    <div className="ml-[21px]">
                      <p className="text-[18px] text-[#222222]">微信支付</p>
                      <span className="text-[15px] text-[#666666]">通过微信扫码支付</span>
                      {/* <span className="text-[15px] text-[#F05113]">￥998.00</span> */}
                    </div>
                  </div>
                ),
              },
              {
                value: 3,
                label: (
                  <div
                    className="w-[270px] pt-[5px] pb-[5px]  text-left flex justify-start mr-[134px] max-w-[270px] 2xl:w-[270px] xl:w-[100vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw]"
                    style={{ border: "1px solid #e5e5e5", borderRadius: "5px" }}
                  >
                    {/* 左边图片 */}
                    <div className="flex justify-center items-center ml-[10px]">
                      <img className="w-[36px]" src={imgUrl + "yuejie2.png"} alt="" />
                    </div>
                    <div className="ml-[21px]">
                      <p className="text-[18px] text-[#222222]">月付支付</p>
                      <span className="text-[15px] text-[#666666]">使用月付支付更便捷</span>
                      {/* <span className="text-[15px] text-[#F05113]">￥998.00</span> */}
                    </div>
                  </div>
                ),
              },
              {
                value: 4,
                label: (
                  <div
                    className="w-[270px] pt-[5px] pb-[5px]  text-left flex justify-start max-w-[270px] 2xl:w-[270px] xl:w-[100vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw]"
                    style={{ border: "1px solid #e5e5e5", borderRadius: "5px" }}
                  >
                    {/* 左边图片 */}
                    <div className="flex justify-center items-center ml-[10px]">
                      <img className="w-[36px]" src={imgUrl + "zfbzf2.png"} alt="" />
                    </div>
                    <div className="ml-[21px]">
                      <p className="text-[18px] text-[#222222]">支付宝支付</p>
                      <span className="text-[15px] text-[#666666]">通过支付宝扫码支付</span>
                    </div>
                  </div>
                ),
              },
              {
                value: 5,
                label: (
                  <div
                    className="w-[270px] pt-[5px] pb-[5px]  text-left flex justify-start max-w-[270px] 2xl:w-[270px] xl:w-[100vw] lg:w-[90vw] md:w-[85vw] sm:w-[80vw]"
                    style={{ border: "1px solid #e5e5e5", borderRadius: "5px" }}
                  >
                    {/* 左边图片 */}
                    <div className="flex justify-center items-center ml-[10px]">
                      <img className="w-[36px]" src={imgUrl + "shenghuo2.png"} alt="" />
                    </div>
                    <div className="ml-[21px]">
                      <p className="text-[18px] text-[#222222]">对公转账</p>
                      <span className="text-[15px] text-[#666666]">使用公司对公账户进行转账</span>
                      {/* <span className="text-[15px] text-[#F05113]">￥998.00</span> */}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* 尾部按钮 */}
        {/* mt-[84px] */}
        <div className="w-[760px] max-w-[760px] flex justify-center items-center mt-[84px] 2xl:w-[100%] xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%]">
          <div className="mr-[24px]">
            <Button className="w-[150px] max-w-[150px] h-[56px] text-[18px]">返回上一步</Button>
          </div>
          <div>
            <Button type="primary" className="w-[150px] max-w-[150px] h-[56px] text-[18px]">
              下一步
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentmethodLqh
