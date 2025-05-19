import { Button, Checkbox } from "antd"

import { useShoppingCartTableStore } from "../../../store/shoppingcart"

// const onChange = (e: any) => {
//   console.log(`checked = ${e.target.checked}`)
// }

function ThreedprintingfootercomLqh() {
  // 解构获取购物车store里面的数据和方法
  const { cart, getTotalPrice, toggleSelectAll, toggleSelectAllFalse } = useShoppingCartTableStore()

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
  // 选中项长度
  const checkBoxChooseLength = () => {
    // 返回过滤选中项的长度
    return cart.filter((item) => item.check).length
  }
  return (
    <div className="w-[100%] h-[80px] border-t border-[#dcdcdc]">
      <div className="flex w-[78%] justify-between items-center mx-auto">
        <div className="w-[33%] h-[80px] flex justify-end items-center text-[18px]">
          <div className="mr-[12px]">
            <Checkbox className="text-[18px]" onChange={toggleAll} checked={cart.length == checkBoxChooseLength()}>
              全选
            </Checkbox>
          </div>

          <div className="mr-[18px]"></div>
          <div>
            <Button color="primary" variant="outlined">
              批量删除
            </Button>
          </div>
        </div>

        <div className="w-[377px] h-[80px] flex justify-end items-center">
          <div className="mr-[32px]">
            <div className="text-[18px] flex justify-center items-center">
              <span>合计</span>

              <span className="text-[#F05113]">￥{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          <div>
            <Button className="w-[120px] h-[50px] text-[18px]" color="primary" variant="solid">
              立即下单
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreedprintingfootercomLqh
