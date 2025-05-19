import { Checkbox, message } from "antd"

import NumberInputXzz from "@/components/NumberInput/index2"
import XzzBtn from "@/components/XzzBtn"
import Xzztag from "@/components/XzzTag"
import { deleteCartApi } from "@/network/api/print"

import EditXzz from "../EditSpecifications"
import ImgPreview from "./imgPreview"

function FileList() {
  const { printCart, initPrintCart, getisCheckededPrintCart, updatePrintCart, setPrintCart, openEditModal } =
    usePrintCartStore((state) => state)

  const updateList = async () => {
    await initPrintCart()
    setCheckedList(getisCheckededPrintCart())
  }
  useEffect(() => {
    updateList()
  }, [])
  const [checkedList, setCheckedList] = useState(getisCheckededPrintCart())
  const onQuantityChange = (value: number, item: any) => {
    const updateItem = { ...item, quantity: value }
    updatePrintCart(item.id, updateItem)
  }

  const indeterminate = checkedList.length > 0 && checkedList.length < printCart.length
  const onEachChange = (e: Event, item: any) => {
    const isChecked = (e?.target as HTMLInputElement)?.checked || false
    const updateItem = { ...item, isChecked }
    updatePrintCart(item.id, updateItem)
    setCheckedList(getisCheckededPrintCart())
  }

  // 表格头部状态改变
  const onChangeAll = (e: any) => {
    const isChecked = (e?.target as HTMLInputElement)?.checked || false
    setPrintCart(printCart.map((item) => ({ ...item, isChecked })))
    setCheckedList(getisCheckededPrintCart())
  }
  const modifySpecifications = (item: any) => {
    console.log(item)
    openEditModal()
  }
  const deletePrintCart = async () => {
    console.log(checkedList.map((item) => item.id))
    const res = await deleteCartApi({ ids: checkedList.map((item) => item.id) })
    if (res.code === 200) {
      message.success("删除成功")
      updateList()
    }
  }
  return (
    <div className="w-full">
      <Xzztag title="文件列表" />
      <div className="my-[10px] flex justify-between items-center ">
        <Checkbox
          onChange={onChangeAll}
          indeterminate={indeterminate}
          checked={printCart.length != 0 && printCart.length == checkedList.length}
        >
          全选
        </Checkbox>
        <div className="flex gap-[10px] items-center">
          <div className="text-[16px]">已选中{checkedList.length}款零件</div>
          <XzzBtn style={{ height: "32px", width: "80px" }}>
            <div className="text-[14px] ">批量复制</div>
          </XzzBtn>
          <XzzBtn style={{ height: "32px", color: "#1366f0", width: "80px" }} onClick={deletePrintCart}>
            <div className="text-[14px] ">批量删除</div>
          </XzzBtn>
        </div>
      </div>
      <div className="tablelist mb-[30px]">
        <div className=" rounded-[16px] overflow-hidden border border-[#DCDCDC]">
          <Header />
          <div className="scrollbarTable h-[402px] overflow-y-scroll">
            {/* 循环文件列表数据 */}
            {printCart.map((item, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-center items-center  h-[46px] border-t border-t-[#DCDCDC] border-b border-b-[#DCDCDC]">
                    <div className="text-[14px] flex-1 relative">
                      <Checkbox
                        checked={item?.isChecked || false}
                        className="mr-[10px]"
                        onChange={(e: any) => onEachChange(e, item)}
                      ></Checkbox>
                      <span>{index + 1}</span>
                    </div>
                    <div className="text-[14px] flex-1">{item.file_name}</div>

                    <NumberInputXzz defaultValue={item.qty} onChange={(value) => onQuantityChange(value, item)} />
                    {/* 价格也是保留两位小数点 */}
                    <div className="text-[16px] text-[#F05113] flex-1">￥{item.price.toFixed(2)}</div>
                    {/* 金额到时要保留两位小数--金额等于价格乘数量 */}
                    <div className="text-[16px] text-[#F05113] flex-1">￥{(item.price * item.qty).toFixed(2)}</div>
                  </div>
                  <div className=" flex justify-center items-center  px-[10px]  h-[100%]">
                    <div className="max-w-[100px] max-h-[100px] basis-1/5">
                      <img src="" alt="" className="w-[90%] h-[90%]" />
                    </div>

                    <div className="text-[12px]  basis-3/5  max-h-[100px] flex justify-between ">
                      <div className="flex flex-col gap-[6px]  text-[#666]">
                        {[
                          { label: "尺寸", value: item.size },
                          { label: "重量", value: item.weight },
                          { label: "层高", value: item.floor_height },
                          { label: "材料", value: item.material_name },
                        ].map((item) => {
                          return (
                            <div className="flex items-center gap-[6px]" key={item.label}>
                              <span>{item.label}: </span>
                              <span>{item.value}</span>
                            </div>
                          )
                        })}
                      </div>
                      <ImgPreview item={item} />
                    </div>

                    <div
                      className="gap-[6px] h-[125px] flex basis-1/5 justify-end cursor-pointer items-end"
                      onClick={() => modifySpecifications(item)}
                    >
                      <i className="iconfont icon-xiugai text-[#1366F0] text-[20px]"></i>
                      <span className="text-[16px] text-[#1366F0]"> 修改规格</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {printCart.length === 0 && (
              <div className="flex justify-center items-center h-[402px]">
                <div className="text-[16px] text-[#999]">购物车为空</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <EditXzz />
    </div>
  )
}

const Header = () => {
  const title = ["序号", "文件名", "数量", "价格", "金额"]
  return (
    <div
      style={{ position: "sticky", zIndex: "10" }}
      className="header flex justify-around top-[0] items-center bg-[#F5F5F5] h-[46px]"
    >
      {title.map((item, index) => {
        return (
          <div key={index} className="text-[14px] text-[#000] flex-1">
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default FileList
