import DeliveryInfo from "@/components/deliveryInfo"
import InvoiceInfo from "@/components/InvoiceInfo"
import XzzBtn from "@/components/XzzBtn"

import Consignee from "./consignee"
import Contact from "./contact"
import OrderInfo from "./order"
import OtherInfo from "./otherInfo"

function SubmitXzz() {
  // const { openManageModal } = useConsigneeStore((state) => state)

  return (
    <div className=" flex flex-col">
      <div className="my-[30px] text-left text-[20px] text-[#222222] font-[400]">提交订单</div>
      <div className="submitbox container-border-xzz">
        <Consignee />
        <DividerXzz />
        <Contact />
        <DividerXzz />
        <DeliveryInfo />
        <DividerXzz />
        {/* 订单信息 */}
        <OrderInfo />
        <DividerXzz />
        <OtherInfo />
      </div>
      <div className="bottombox container-border-xzz my-[30px]">
        <div className="infobox flex text-[16px] ">
          <div className="left text-left mr-[40px]">
            {/* 零件数量： 1款、1件 运费： ￥0 预计发货日期： 2024-09-13 20:00:00  */}
            <div className="kk">
              <span>零件数量：</span> <span>1款、1件</span>
            </div>
            <div className="yf">
              <span>运费：</span> <span>￥16</span>
            </div>
            <div className="yh">
              <span>预计发货日期：</span> <span>2024-09-13 20:00:00</span>
            </div>
          </div>
          <div className="right">
            <div className="price">
              <span>应付总额(含税): </span>
              <span className="text-[#F05113]">￥ 176.00</span>
            </div>
          </div>
        </div>
        <div className="btns flex gap-[20px] justify-end">
          <XzzBtn style={{ height: "50px", width: "150px", Background: "#F5F5F5" }}>
            <div className="text-[#999999]">返回上一步</div>
          </XzzBtn>
          <XzzBtn type="primary" style={{ height: "50px", width: "150px" }}>
            <div>提交订单</div>
          </XzzBtn>
        </div>
      </div>
      {/* 
      
      <div className="test" onClick={() => setInvoiceModalVisible(true)}>
        打开弹窗
      </div>
      <Button onClick={openManageModal}>打开地址弹窗</Button> */}

      <InvoiceInfo />
    </div>
  )
}

const DividerXzz = () => {
  return <div className="divider mt-[25px] mb-[20px] h-[1px] w-[100%]" style={{ border: "1px dashed #DCDCDC" }}></div>
}
export default SubmitXzz
