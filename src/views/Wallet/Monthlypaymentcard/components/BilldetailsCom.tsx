import { Button } from "antd"

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

function BilldetailsComLqh() {
  // 联系客服
  const customerServiceBtn = () => {}
  return (
    <div className="w-[830px] bg-[#ffffff] h-[75.681vh] rounded-[20px] mt-[50px] 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]">
      <div className="mx-auto border-b border-b-gray-300 mb-[30px] 2xl:w-[610px] xl:w-[70%] lg:w-[65%] md:w-[65%] sm:w-[60%]">
        <div className="text-center text-[18px] text-[#222222]">
          <div className="mb-[20px]">
            <img className="w-[56px] mx-auto" src={imgUrl + "yfzf.png"} alt="" />
          </div>

          <div className="mb-[20px]">
            <p>3D打印订单支付-月付卡支付</p>
          </div>

          <div className="text-[20px] pb-[49px]">
            <p>￥-1288.88</p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex justify-between mb-[175px] 2xl:w-[610px] xl:w-[70%] lg:w-[65%] md:w-[65%] sm:w-[80%]">
        <div className="text-[#999999] 2xl:text-[18px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[14px]">
          <div className="mb-[30px]">
            <span>支付方式</span>
          </div>

          <div className="mb-[30px]">
            <span>支付时间</span>
          </div>
          <div>
            <span>支付单号</span>
          </div>
        </div>

        <div className="text-[#222222] text-right 2xl:text-[18px] xl:text-[18px] lg:text-[16px] md:text-[14px] sm:text-[14px]">
          <div className="mb-[29px]">
            <span>微信扫码</span>
          </div>

          <div className="mb-[29px]">
            <span>2024年10月01日 12:41:26</span>
          </div>
          <div>
            <span>10006442154545151544545</span>
          </div>
        </div>
      </div>

      <div className="mx-auto pb-[30px] 2xl:w-[610px] xl:w-[70%] lg:w-[65%] md:w-[65%] sm:w-[60%]">
        <div className="text-center text-[16px] text-[#999999] mb-[29px]">
          <span>如对订单有疑问可联系客服进行解决</span>
        </div>

        <div className="text-center">
          <Button onClick={customerServiceBtn} className="text-[18px] text-[#222222] w-[150px] h-[56px]">
            联系客服
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BilldetailsComLqh
