import { Checkbox } from "antd"

import EmptyLqh from "@/components/Emptylqh"
import PopconfirmLqh from "@/components/PopconfirmLqh"

const onChange = (e: any) => {
  console.log(`checked = ${e.target.checked}`)
}

const onChangecontent = (e: any) => {
  console.log(e)
}

// 扫描类型：人像 扫描方式：手持激光 能否喷显像剂：不能 交期： 7个工作日
const shoppingList = [
  {
    id: 1,
    type: "3D",
    title: "越野车.png",
    chang: "500.68mm",
    kuan: "300.60mm",
    height: "360.00mm",
    price: "人工报价",
    cailiao: "人像",
    color: "手持激光",
    handle: "不能",
    time: "7个工作日",
    num: 2,
    yujifuoriqi: "2024-09-13 20:00:00",
    check: true,
    imgSrc: "",
  },
  {
    id: 2,
    type: "3D",
    title: "越野车.png",
    chang: "500.68mm",
    kuan: "300.60mm",
    height: "360.00mm",
    price: "人工报价",
    cailiao: "人像",
    color: "手持激光",
    handle: "不能",
    time: "7个工作日",
    num: 2,
    yujifuoriqi: "2024-09-13 20:00:00",
    check: true,
    imgSrc: "",
  },
]

const handleCancel = () => {
  console.log("取消删除数据")
}

const handleDelete = (id: number) => {
  console.log(id, "确认删除数据")
}

function ThreedscanLqh() {
  return (
    <div className="w-[1200px] 2xl:w-[1200px]">
      {/* 2xl:w-[1200px] xl:w-[75vw] lg:w-[73vw] md:w-[70vw] sm:w-[65vw] */}
      <div className="w-[1200px] rounded-[20px] overflow-hidden border border-[#dcdcdc]">
        {/* 2xl:w-[1200px] xl:w-[75vw] lg:w-[73vw] md:w-[70vw] sm:w-[65vw] */}
        <table className="w-[1200px] border-collapse">
          <thead className="w-[1200px] h-[56px] bg-[#f5f5f5] border-b border-[#dcdcdc]">
            <tr className="w-[100%] h-[56px] bg-[#f5f5f5]">
              <th style={{ paddingLeft: "30px" }}>
                <Checkbox onChange={onChange}></Checkbox>
              </th>
              <th>图纸</th>
              <th>规格</th>
              <th className="w-[137px]">预计发货日期</th>
              <th className="w-[100px]">金额</th>
              <th>操作</th>
            </tr>
          </thead>
          {shoppingList.length > 0 && (
            <tbody>
              {/* 循环tr才对 */}
              {shoppingList.map((item, index) => {
                return (
                  <tr className="h-[140px] border-b border-[#dcdcdc] last:border-0" key={index}>
                    {/* style={{ paddingLeft: "30px" }} */}
                    <td className="pl-[30px]">
                      <Checkbox onChange={onChangecontent} checked={item.check}></Checkbox>
                    </td>

                    <td>
                      <div className="relative flex justify-center items-center">
                        <div>
                          <img src={item.imgSrc} alt="" />
                        </div>
                        <div className="absolute top-[2px] right-[31px] w-[36px] h-[16px] bg-[#1366f0] rounded-bl-lg-[8px]  text-[#fff] text-[12px]">
                          <span>{item.type}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center text-left text-[14px] text-[#666666]">
                        <div className="w-[162px] mr-[38px] text-[14px] text-[#666666]">
                          <p className="text-hidden">{item.title} </p>
                          <p className="text-hidden">长：{item.chang}</p>
                          <p className="text-hidden">宽：{item.kuan} </p>
                          <p className="text-hidden">高：{item.height} </p>
                        </div>
                        <div className="w-[140px]">
                          <p className="text-hidden">扫描类型：{item.cailiao}</p>
                          <p className="text-hidden">扫描方式：{item.color}</p>
                          <p className="text-hidden">能否喷显像剂：{item.handle}</p>
                          <p className="text-hidden">交期：{item.time}</p>
                        </div>
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
                          style={{ whiteSpace: "normal", margin: "0", wordWrap: "break-word", wordBreak: "break-all" }}
                        >
                          人工报价
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        <div className="mr-[15px]">
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
      {shoppingList.length === 0 && (
        <div className="mb-[15px] mt-[15px]">
          <EmptyLqh description="购物车空空如也" />
        </div>
      )}
    </div>
  )
}

export default ThreedscanLqh
