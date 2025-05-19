import { Checkbox } from "antd"

import EmptyLqh from "@/components/Emptylqh"
import ModalLqh2 from "@/components/ModalLqh2"
// import React, { useState } from "react"
import NumberInput from "@/components/NumberInput"
import PopconfirmLqh from "@/components/PopconfirmLqh"

import { useShoppingCartTableStore } from "../../../store/shoppingcart"

interface ModalProps {
  data: string
}

const ThreedPrinting: React.FC<ModalProps> = ({ data }) => {
  console.log(data)
  // 解构获取购物车store里面的数据和方法
  const { cart, toggleSelectAll, toggleSelectAllFalse, toggleSingleSelect, toggleNumberChange } =
    useShoppingCartTableStore()

  const onChangecontent = (e: any, index: number) => {
    toggleSingleSelect(e, index)
  }

  // 选中项长度
  const checkBoxChooseLength = () => {
    // 返回过滤选中项的长度
    return cart.filter((item) => item.check).length
  }

  // 表格头部状态改变
  const toggleAll = (e: any) => {
    if (e.target.checked == true) {
      // 全选中状态
      toggleSelectAll()
    } else {
      // 全不选状态
      toggleSelectAllFalse()
    }
  }

  // 计算价格
  const onNumberChange = (value: number, index: number) => {
    toggleNumberChange(value, index)
  }

  const handleCancel = () => {
    console.log("取消删除数据")
  }

  const handleDelete = (id: number) => {
    console.log(id, "确认删除数据")
  }

  const [open, setOpen] = useState(false)

  const handleCancelModal = () => {
    setOpen(false)
  }

  const handleOk = () => {
    console.log("确认修改")
    setOpen(false)
  }

  // 修改规格弹窗
  const ModifySpecifications = () => {
    setOpen(true)
  }

  return (
    <div className="w-[1200px] 2xl:w-[1200px]">
      <div className="w-[1200px] rounded-[20px] overflow-hidden border border-[#dcdcdc] mb-[20px]">
        {/* table表格响应式展示 */}
        <table className="w-[1200px] border-collapse">
          {/* 2xl:w-[1200px] xl:w-[75vw] lg:w-[73vw] md:w-[70vw] sm:w-[65vw] */}
          <thead className="w-[1200px] h-[56px] bg-[#f5f5f5] border-b border-[#dcdcdc]">
            <tr className="w-[100%] h-[56px] bg-[#f5f5f5]">
              <th className="pl-[30px]">
                <Checkbox onChange={toggleAll} checked={cart.length == checkBoxChooseLength()}></Checkbox>
              </th>
              <th>图纸</th>
              <th>规格</th>

              <th className="w-[176px]">数量</th>
              <th className="w-[137px]">预计发货日期</th>
              <th className="w-[100px]">金额</th>
              <th>操作</th>
            </tr>
          </thead>
          {cart.length > 0 && (
            <tbody>
              {/* 循环tr才对 */}

              {cart.map((item, index) => {
                return (
                  <tr className="h-[140px] border-b border-[#dcdcdc] last:border-0" key={index}>
                    <td className="pl-[30px]">
                      <Checkbox onChange={() => onChangecontent(item.check, index)} checked={item.check}></Checkbox>
                    </td>
                    {/* 图纸 */}
                    <td>
                      <div className="relative flex justify-center items-center">
                        <div>
                          <img src={item.imgSrc} alt="" />
                        </div>

                        <div className="absolute  w-[36px] h-[16px] bg-[#1366f0]  rounded-bl-lg-[8px]  text-[#fff] text-[12px]  top-[2px] right-[17px]">
                          <span>{item.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-normal">
                      <div className="flex justify-center items-center text-left text-[14px] text-[#666666]">
                        <div className="w-[162px] mr-[38px] text-[14px] text-[#666666]">
                          <p className="text-hidden">{item.title} </p>
                          <p className="text-hidden">{item.chicun}</p>
                          <p className="text-hidden">{item.tiji} </p>
                          <p className="text-hidden">{item.shuangmianji} </p>
                          <p className="text-hidden">{item.zhongliang}</p>
                        </div>

                        <div className="w-[140px]">
                          <p className="text-hidden">材料: {item.cailiao}</p>
                          <p className="text-hidden">颜色：{item.color}</p>
                          <p className="text-hidden">表面处理：{item.handle}</p>
                          <p className="text-hidden">交期： {item.time}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        <NumberInput defaultValue={item.num} onChange={(value) => onNumberChange(value, index)} />
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center text-[#222222] text-[14px] w-[137px]">
                        <span className="text-hidden">{item.yujifuoriqi}</span>
                      </div>
                    </td>
                    <td>
                      <div className="w-[100px] flex justify-center items-center text-[#f05113] flex-wrap text-[18px]">
                        <p
                          style={{
                            whiteSpace: "normal",
                            margin: "0",
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                          }}
                        >
                          ￥{item.price}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        <div className="mr-[15px]" onClick={ModifySpecifications}>
                          <span className="text-[#1366f0] text-[16px] cursor-pointer">修改规格</span>
                        </div>
                        <div>
                          <PopconfirmLqh
                            title="确认要删除吗"
                            onCancel={handleCancel}
                            onConfirm={() => handleDelete(item.id)}
                          >
                            <span className="text-[#1366f0] text-[16px] cursor-pointer">删除</span>
                          </PopconfirmLqh>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>

      {cart.length === 0 && (
        <div className="mb-[15px]">
          <EmptyLqh description="购物车空空如也" />
        </div>
      )}
      {/* 总价:￥{totalPrice.toFixed(2)} */}
      {/* 需要根据我们定义的属性来判断是否是全选 --左边内容 */}
      {/* 全选 footer */}
      {/* 修改规格弹窗 */}
      <ModalLqh2
        width="1100px"
        title="修改规格"
        open={open}
        onCancel={handleCancelModal}
        onOk={handleOk}
        classname="custom-modal-xggg"
        closable={true}
        content={<div className="pl-[30px] pb-[30px]">我是修改规格内容</div>}
      />
    </div>
  )
}

export default ThreedPrinting
