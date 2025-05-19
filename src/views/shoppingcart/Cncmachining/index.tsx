import { Checkbox } from "antd"

import NumberInput from "@/components/NumberInput"

import Threedprinting from "./index.module.scss"
const onChange = (e: any) => {
  console.log(`checked = ${e.target.checked}`)
}

const onNumberChange = (value: number) => {
  console.log("TCL: onNumberChange -> value", value)
  // setCurrentGrinding({ label: value })
}

const onChangecontent = (e: any) => {
  console.log(e)
}

const shoppingList = [
  {
    type: "3D",
    title: "hollow_of_越野车 5_1.stl ",
    chicun: "尺寸：15.00cm*15.00cm",
    tiji: "体积：11.46cm³ ",
    shuangmianji: "表面积：114.00cm² ",
    zhongliang: "重量：50.02g",
    price: 88.0,
    cailiao: "铝合金-7075",
    color: "粗磨-亮光",
    handle: "GB/T 1804-2000 m级",
    time: "4个工作日",
    num: 2,
    yujifuoriqi: "2024-09-13 20:00:00",
    check: true,
    imgSrc: "",
  },
  //
  {
    type: "3D",
    title: "hollow_of_越野车 5_1.stl ",
    chicun: "尺寸：15.00cm*15.00cm",
    tiji: "体积：11.46cm³ ",
    shuangmianji: "表面积：114.00cm² ",
    zhongliang: "重量：50.02g",
    price: 88.0,
    cailiao: "铝合金-7075",
    color: "粗磨-亮光",
    handle: "GB/T 1804-2000 m级",
    time: "4个工作日",
    num: 3,
    yujifuoriqi: "2024-09-13 20:00:00",
    check: false,
    imgSrc: "",
  },
]
// 材料：铝合金-7075 表面处理：粗磨-亮光 最严公差：GB/T 1804-2000 m级 交期：4个工作日
// rowSelection object indicates the need for row selection

function CncmachiningLqh() {
  return (
    <div className={Threedprinting.printinghead}>
      {/* 中间表格内容 */}
      <div className={Threedprinting.maintable}>
        <table>
          <thead>
            <tr>
              <th style={{ paddingLeft: "30px" }}>
                <Checkbox onChange={onChange}></Checkbox>
              </th>
              <th>图纸</th>
              <th>规格</th>
              <th style={{ width: "176px" }}>数量</th>
              <th style={{ width: "137px" }}>预计发货日期</th>
              <th style={{ width: "100px" }}>金额</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {/* 循环tr才对 */}
            {shoppingList.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ paddingLeft: "30px" }}>
                    <Checkbox onChange={onChangecontent} checked={item.check}></Checkbox>
                  </td>
                  {/* 图纸 */}
                  <td>
                    <div
                      className={Threedprinting.imgtitle}
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <img src={item.imgSrc} alt="" />
                      </div>
                      <div
                        className={Threedprinting.threeDtext}
                        style={{
                          position: "absolute",
                          top: "2px",
                          width: "36px",
                          height: "16px",
                          background: "#1366f0",
                          borderRadius: "0px 0px 0px 8px",
                          right: "17px",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      >
                        <span>{item.type}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={Threedprinting.gghead}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "left",
                        fontSize: "14px",
                        color: "#666666",
                      }}
                    >
                      <div
                        className={Threedprinting.lefttext}
                        style={{ width: "162px", fontSize: "14px", color: "#666666", marginRight: "38px" }}
                      >
                        <p className="text-hidden">{item.title} </p>
                        <p className="text-hidden">{item.chicun}</p>
                        <p className="text-hidden">{item.tiji} </p>
                        <p className="text-hidden">{item.shuangmianji} </p>
                        <p className="text-hidden">{item.zhongliang}</p>
                      </div>
                      <div className={Threedprinting.righttitle} style={{ width: "140px" }}>
                        <p className="text-hidden">材料: {item.cailiao}</p>
                        <p className="text-hidden">表面处理：{item.color}</p>
                        <p className="text-hidden">最严公差：{item.handle}</p>
                        <p className="text-hidden">交期： {item.time}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className={Threedprinting.num}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <NumberInput defaultValue={item.num} onChange={onNumberChange} />
                    </div>
                  </td>
                  <td>
                    <div
                      className={Threedprinting.yujifhrq}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#222222",
                        fontSize: "14px",
                        width: "137px",
                      }}
                    >
                      <span className="text-hidden">{item.yujifuoriqi}</span>
                    </div>
                  </td>
                  <td>
                    <div
                      className={Threedprinting.price}
                      style={{
                        width: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#f05113",
                        flexWrap: "wrap",
                        fontSize: "18px",
                      }}
                    >
                      <p style={{ whiteSpace: "normal", margin: "0", wordWrap: "break-word", wordBreak: "break-all" }}>
                        ￥{item.price}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      className={Threedprinting.xiuguigehead}
                      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      <div className={Threedprinting.xiuguigetext} style={{ marginRight: "15px" }}>
                        <a href="#" style={{ color: "#1366f0", fontSize: "16px" }}>
                          修改规格
                        </a>
                      </div>
                      <div>
                        <a href="#" style={{ color: "#1366f0", fontSize: "16px" }}>
                          删除
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CncmachiningLqh
