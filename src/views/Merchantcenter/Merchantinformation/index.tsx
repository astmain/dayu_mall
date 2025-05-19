const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

function MerchantinformationLqh() {
  return (
    <div className="w-[1470px] max-w-[1470px]">
      <div className="w-[537px] h-[210px] bg-[#ffffff] rounded-[14px] flex justify-start items-center pl-[40px] mb-[30px]">
        <div className="w-[100px] h-[100px] mr-[21px]">
          <img className="w-[100px] h-[100px]" src={imgUrl + "wechatpay2.png"} alt="" />
        </div>

        <div className="text-left text-[18px] text-[#222222]">
          <p className="mb-[8px]">DAYU-3D</p>
          <p className="mb-[8px]">认证时间：2024-10-26 15:28:32</p>
          <p className="mb-[8px]">主体信息：个人认证</p>
        </div>
      </div>

      <div className="w-[537px] h-[210px] bg-[#ffffff] rounded-[14px] flex justify-start items-center pl-[40px] mb-[30px]">
        <div className="w-[100px] h-[100px] bg-[#1366f0] rounded-[50%] mr-[21px] flex justify-center items-center">
          <img className="w-[55px] h-[58px]" src={imgUrl + "morentouxiang2.png"} alt="" />
        </div>

        <div className="text-left text-[18px] text-[#222222]">
          <p className="text-[22px] text-[#222222] mb-[14px]">认证信息</p>
          <p className="mb-[8px]">真实姓名：王*华</p>
          <p className="mb-[8px]">证件类型：二代身份证</p>
          <p className="mb-[8px]">证件号码：350322********8888</p>
        </div>
      </div>
    </div>
  )
}

export default MerchantinformationLqh
