const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

// 引入新的支付协议弹框
import ModalPaymentLqhSecond from "@/components/ModalPaymentLqh2"

function ScanCodePaymentComLqh() {
  // 支付协议弹框
  const [isModalOpenPayment, setIsModalOpenPayment] = useState(false)
  // 支付协议事件
  const payment = () => {
    setIsModalOpenPayment(true)
  }
  return (
    <div className="w-[820px] h-[61.0vh]  max-w-[820px]  rounded-[20px] 2xl:w-[100vw] xl:w-[90vw] lg:w-[85vw] md:w-[80vw] sm:w-[75vw]">
      <div className="text-center mt-[101px] mb-[78px] text-[20px]">
        <span className="text-[#222222]">账户余额：</span>

        <span className="text-[#f05113]">￥9388.00</span>
      </div>

      <div className="flex justify-center mb-[164px]">
        <div className="mr-[120px] text-center text-[18px] text-[#222222]">
          <img src={imgUrl + "wechatpayment1.png"} alt="" />
          <p>微信支付</p>
        </div>

        <div className="text-center text-[18px] text-[#222222]">
          <img src={imgUrl + "alipay.png"} alt="" />
          <p>支付宝支付</p>
        </div>
      </div>

      <div className="w-[820px] max-w-[820px] pb-[26px] flex justify-center 2xl:w-[100vw] xl:w-[90vw] lg:w-[85vw] md:w-[80vw] sm:w-[75vw] text-[16px]">
        <span>支付即同意</span>

        <span className="text-[#1366F0] cursor-pointer" onClick={payment}>
          《大宇3D用户支付协议和隐私政策》
        </span>
      </div>

      <ModalPaymentLqhSecond
        width="300px"
        zIndex={2222}
        title="支付协议"
        open={isModalOpenPayment}
        onCancel={() => setIsModalOpenPayment(false)}
        onOk={() => setIsModalOpenPayment(false)}
        classname="custom-modal-zfxieyi"
        closable={true}
        content={<div>内容lqh</div>}
      />
    </div>
  )
}

export default ScanCodePaymentComLqh
