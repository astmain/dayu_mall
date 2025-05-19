import { Button, Divider, Input, Typography } from "antd"

const { TextArea } = Input

import ChooseExpress from "./ChooseExpress"
import OrderContact from "./OrderContact"
import OrderInformation from "./OrderInformation"
import Receipt from "./Receipt"

const imgUrl = "http://yun3d.com/frontend/public/test/"

const ScanTypes = ["纸质收据/送货单", "电子收据/送货单"]

function SubmitLqh() {
  const [indexType, setIndexType] = useState(0)
  const { Title } = Typography

  return (
    <div className="w-[1200px]">
      <div className="text-left text-[20px] mt-[31px] mb-[29px] text-[#222222]">
        <span>提交订单</span>
      </div>
      <div className="w-[1200px] border border-[#DCDCDC] rounded-[20px] mb-[30px]">
        {/* 收货人信息 */}
        <Receipt></Receipt>
        {/* 下单联系人 */}
        <OrderContact></OrderContact>

        {/* 选择快递（估重0.52kg） */}
        <ChooseExpress></ChooseExpress>

        {/* 订单信息 */}
        <OrderInformation></OrderInformation>

        {/* 扫描地点*/}
        <div className="flex justify-between">
          <div className="ml-[15px]">
            {/* 扫描地点 */}
            <Title level={5} style={{ marginTop: "15px", fontSize: "20px", fontWeight: 400 }}>
              <Divider
                type="vertical"
                style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
              />
              扫描地点
            </Title>
          </div>
        </div>

        <div className="w-[1200px] mx-auto pl-[30px] pr-[30px] pb-[30px] border-b border-b-dashed border-b-[#dcdcdc]">
          <TextArea rows={4} placeholder="请输入需要扫描的详细地址（非必填）" />
        </div>
        <div className="flex justify-between">
          <div className="ml-[15px] mb-[15px]">
            {/* 收货人信息 */}
            <Title level={5} style={{ marginTop: "15px", fontSize: "20px", fontWeight: 400 }}>
              <Divider
                type="vertical"
                style={{ borderWidth: "3px", height: "18px", borderColor: "#1366F0", borderRadius: "3px" }}
              />
              其他信息
            </Title>
          </div>
        </div>

        <div className="w-[1100px] flex justify-start items-center ml-[30px] mb-[20px]">
          <div className="flex justify-start self-baseline items-center">
            <div className="text-left text-[#222222] text-[18px] mr-[2px]">
              <span>开票信息</span>
            </div>
            <div>
              <img className="w-[20px] h-[20px]" src={imgUrl + "kaipiaoxinxi2.png"} alt="" />
            </div>
          </div>

          <div className="ml-[74px]">
            <div className="flex justify-start">
              <div className="w-[60px] h-[26px] leading-[26px] bg-[#dcdcdc] flex justify-center rounded-[16px] mr-[16px] ">
                <span className="text-[#1366f0] text-[16px]">企业</span>
              </div>
              <div className="text-[18px] mt-[1px] mr-[40px]">
                <span>泉州大宇科技有限公司 91350503156494748X</span>
              </div>

              <div className="flex justify-center items-center">
                <div className="mr-[2px]">
                  <img className="w-[16px] h-[17px]" src={imgUrl + "bianji2.png"} alt="" />
                </div>

                <div className="underline">
                  <span className="text-[#1366f0] cursor-pointer">修改</span>
                </div>
              </div>
            </div>

            <div className="mt-[20px] text-[#f05113] text-[18px]">
              <div>
                个人无法开专票，请谨慎选择发票类型，我司将发票发送到您的邮箱，未填写邮箱的请前往
                <span className="underline cursor-pointer">个人中心</span>填写）
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-[17px]">
          <div className="flex justify-center items-center">
            <div className="text-left mr-[2px] ml-[30px] text-[18px]">
              <span>收据/送货单</span>
            </div>

            <div>
              <img className="w-[20px] h-[20px]" src={imgUrl + "kaipiaoxinxi2.png"} alt="" />
            </div>
          </div>

          <div className="flex ml-[39px]">
            {ScanTypes.map((item, index) => {
              return (
                <Button
                  className="w-[170px] h-[46px] text-[18px] mr-[20px]"
                  key={index}
                  color={ScanTypes[indexType] == item ? "primary" : undefined}
                  variant="outlined"
                  onClick={() => setIndexType(index)}
                >
                  {item}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="flex mb-[17px]">
          <div className="ml-[30px] text-[18px] text-[#222222] mr-[121px]">
            <span>备注</span>
          </div>

          <div className="w-[668px] bg-[#ffffff] rounded-[8px]">
            <TextArea rows={4} placeholder="有其他特殊要求请在此说明..." />
          </div>
        </div>
      </div>

      <div className="w-[1200px] rounded-[20px] border border-[#DCDCDC] mb-[50px] pb-[30px]">
        <div className="flex">
          <div className="mt-[33px] ml-[30px]">
            <div className="text-left text-[16px] text-[#222222]">
              <p className="mb-[4px]">零件数量： 1款、20件</p>
              <p className="mb-[4px]">运费： ￥5 </p>
              <p className="mb-[4px]">预计发货日期： 2024-09-13 20:00:00</p>
            </div>
          </div>

          <div className="text-left flex mt-[29px]">
            <p className="text-[16px] text-[#222222]">预估金额(含税)：</p>

            <p className="text-[22px] text-[#f05113] mt-[-6px]">人工报价</p>
          </div>
        </div>

        <div className="flex justify-end mr-[30px]">
          <div className="w-[150px] h-[50px] leading-[50px] bg-[#f5f5f5] rounded-[8px] mr-[20px] text-[18px] text-[#999999]">
            <button>返回上一步</button>
          </div>

          <div className="w-[150px] h-[50px] leading-[50px] bg-[#1366f0] rounded-[8px] text-[#ffffff] text-[18px]">
            <button>提交订单</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitLqh
