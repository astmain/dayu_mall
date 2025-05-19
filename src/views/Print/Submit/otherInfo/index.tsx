import { Button, Input } from "antd"

import TagXzz from "@/components/XzzTag"

function OtherInfo() {
  const { setInvoiceModalVisible, editFormData } = useInvoiceStore((state) => state)

  // const { openManageModal } = useConsigneeStore((state) => state)

  const [hasInvoice] = useState(!false)

  const navigate = useNavigate()

  return (
    <>
      <div className="title mb-[20px]">
        <TagXzz title="其他信息" />
      </div>
      <div className="each-container flex flex-col gap-[20px]">
        <div className="eachItem flex items-center text-[18px]">
          <div className="label flex items-center w-[160px]">
            <span className="mr-[6px]">发货方式</span>
            <i className="iconfont icon-bangzhu" style={{ color: "#1366F0", fontSize: "20px" }}></i>
          </div>
          <div className=" flex items-center gap-[20px]">
            <div className="r">
              <XzzBtn00>
                <span
                  style={{
                    background: "#F05113",
                    color: "#fff",
                    fontSize: "14px",
                    borderRadius: "12px",
                    padding: "1px 6px",
                  }}
                >
                  推荐
                </span>
                <span className="text-[18px]">不同交货期一起发货</span>
              </XzzBtn00>
            </div>
            <div className="r">
              <XzzBtn00>
                <span className="text-[18px]">分开发货</span>
              </XzzBtn00>
            </div>
          </div>
        </div>

        <div className="eachItem flex items-baseline text-[18px]">
          <div className="label flex items-center w-[160px]">
            <span className="mr-[6px]">开票信息</span>
            <i className="iconfont icon-bangzhu" style={{ color: "#1366F0", fontSize: "20px" }}></i>
          </div>
          <div className="fg">
            <div className=" flex items-center gap-[20px] text-[18px]">
              {hasInvoice ? (
                <div className="flex items-center gap-[20px]">
                  <span
                    style={{
                      background: "#1366f02e",
                      color: "#1366F0",
                      fontSize: "16px",
                      borderRadius: "16px",
                      padding: "3px 6px",
                    }}
                  >
                    {editFormData.entity}
                  </span>
                  <span>{editFormData.name}</span>
                  <span>{editFormData.taxID || ""}</span>
                </div>
              ) : (
                <div>无</div>
              )}
              <div className="flex items-center gap-[10px] cursor-pointer" onClick={() => setInvoiceModalVisible(true)}>
                <i className="iconfont icon-xiugai" style={{ color: "#1366F0", fontSize: "20px" }}></i>
                <span style={{ color: "#1366F0", textDecoration: "underline" }}>修改</span>
              </div>
            </div>
            <div className="tips text-[#F05113] mt-[10px] ml-[-10px]">
              （请谨慎选择发票类型，电子发票将直接发送到您的邮箱，未填写邮箱的请前往
              <span
                className="underline-xzz text-[#1366F0]"
                onClick={() => {
                  navigate("/personalCenter")
                }}
              >
                个人中心
              </span>
              填写）
            </div>
          </div>
        </div>

        <div className="eachItem flex items-center text-[18px]">
          <div className="label flex items-center w-[160px]">
            <span className="mr-[6px]">收据/送货单</span>
            <i className="iconfont icon-bangzhu" style={{ color: "#1366F0", fontSize: "20px" }}></i>
          </div>
          <div className=" flex items-center gap-[20px]">
            <div className="r">
              <XzzBtn00>
                <span className="text-[18px]">纸质收据/发货单</span>
              </XzzBtn00>
            </div>
            <div className="r">
              <XzzBtn00>
                <span className="text-[18px]">电子收据/发货单</span>
              </XzzBtn00>
            </div>
          </div>
        </div>

        <div className="eachItem flex items-start text-[18px]">
          <div className="label flex items-center w-[160px]">
            <span className="mr-[6px]">备注</span>
          </div>
          <div className="w-[60%]">
            <Input.TextArea rows={4} placeholder="有其他特殊要求请在此说明..." />
          </div>
        </div>
      </div>
    </>
  )
}

interface XzzBtn00Props {
  children: React.ReactNode
  border?: boolean
}
const XzzBtn00: React.FC<XzzBtn00Props> = (props) => {
  const { children, border = false, ...rest } = props
  const btnStyle: any = {
    height: "46px",
    borderRadius: "8px",
    fontFamily: "Microsoft YaHei",
    fontWeight: 400,
    Position: "relative",
    border: border ? "1px solid #1677ff" : "",
  }

  return (
    <Button style={btnStyle} {...rest}>
      {children}
    </Button>
  )
}

export default OtherInfo
