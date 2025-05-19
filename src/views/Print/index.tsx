import { message } from "antd"

import XzzAgree from "@/components/XzzAgree"
import XzzBtn from "@/components/XzzBtn"

import DeliveryList from "./delivery"
import FileList from "./FileList"
import Specification from "./FileList/specification"
import HistoryTable from "./history"
import Pre3d from "./Previewer"
// import Pre3d from '../Previewer'
// import { useThree } from "../Previewer/hooks"
// import DragAndDropUpload from '../test'
import Tips from "./tips"
import UploadXzz from "./Upload"
function Print() {
  const { getisCheckededPrintCart, calculateTotalPrice, isAgree } = usePrintCartStore((state) => state)

  const submitOrder = () => {
    const printCartLength = getisCheckededPrintCart().length
    if (printCartLength === 0) {
      message.warning("请选择要打印的文件")
      return
    }
    if (!isAgree) {
      message.warning("请阅读并同意打印须知")
      return
    }
    console.log("TCL: submitOrder")
  }
  return (
    <div className=" flex w-full justify-between justify-items-center gap-[30px] flex-wrap">
      <div className="flex-[5]  md:w-[70%] sm:w-[1000%]">
        <div className="h-[500px] relative ">
          <Pre3d />
          <UploadXzz />
        </div>
        <Tips />
        <HistoryTable />
      </div>
      <div className="flex-[3] lg:w-[30%] sm:w-[100%] min-w-[350px] ">
        <FileList />
        <DeliveryList />
        <div className="text-[18px] flex justify-between items-center w-[100%] my-[20px]">
          <div className="title">零件数量</div>
          <div className="count">{getisCheckededPrintCart()?.length}件</div>
        </div>
        <div className="text-[18px] flex justify-between items-center w-[100%] my-[20px]">
          <div className="title">总计(含税)</div>
          <div className="total text-[#F05113]">￥{calculateTotalPrice()}</div>
        </div>

        <XzzBtn block type="primary" className="mb-[20px] w-[100%] px-[30px]" onClick={submitOrder}>
          提交订单
        </XzzBtn>
        <XzzAgree />
      </div>
      <Specification />
    </div>
  )
}

export default Print
