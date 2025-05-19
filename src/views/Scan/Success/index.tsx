import { Button } from "antd"

const imgBaseUrl = "http://yun3d.com/frontend/public/test/"
const ScanOrderForm = () => {
  return (
    <div className="w-[1200px] bg-[#fff] rounded-[20px] border border-[#dcdcdc] mx-auto mb-[208px] pb-[30px] mt-[31px]">
      <div className="mt-[80px] mb-[59px]">
        <div className="flex justify-center">
          <img src={imgBaseUrl + "dagou.png"} alt="" />
        </div>

        <div className="mt-[30px] text-[26px]">
          <span>提交成功</span>
        </div>
      </div>

      <div className="w-[888px] font-normal text-[18px] text-[#222222] mx-auto">
        <div className="mb-[40px] text-left">
          <span>
            订单说明：订单提交成功后将由后台工作人员核实，核实后会在第一时间与您电话联系沟通，请您保持电话畅通。
          </span>
        </div>
        <div className="mb-[40px] text-left">
          <span> 预估金额： </span>

          <span className="text-[#f05113]">人工报价</span>
          <span>。</span>
        </div>
        <div className="text-left">
          <span> 核实时间：周一至周六 上午9:00~12:00 下午14:00~19:00。</span>
        </div>
      </div>

      <div className="mt-[56px] flex justify-center">
        <div className="mr-[20px]">
          <Button className="w-[160px] h-[56px] text-[18px]">返回主页</Button>
        </div>
        <div>
          <Button className="w-[160px] h-[56px] text-[18px]" type="primary">
            查看订单
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ScanOrderForm
