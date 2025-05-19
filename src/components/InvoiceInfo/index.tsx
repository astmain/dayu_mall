import { Button } from "antd"

import ModalLqh2 from "@/components/ModalLqh2/index"

import XzzBtn from "../XzzBtn"
import InvoiceList from "./invoiceList"
function InvoiceInfo() {
  const { invoiceModalVisible, invoiceFormData, setInvoiceModalVisible, updateEditFormData, updateInvoiceFormData } =
    useInvoiceStore((state) => state)

  const onCloseModal = () => {
    setInvoiceModalVisible(false)
    // resetEditFormData()
  }

  return (
    <ModalLqh2
      width="1200px"
      open={invoiceModalVisible}
      onCancel={onCloseModal}
      onOk={onCloseModal}
      title="编辑发票信息"
      classname="custom-modal-editfpxinxi"
      closable={true} //显示右上角关闭按钮 />
      content={
        <div
          style={{
            padding: "30px",
            width: "1180px",
            height: "74.723vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            type="text"
            size="small"
            style={{
              color: "#1366F0",
              marginBottom: "10px",
              alignSelf: "end",
            }}
            onClick={() => updateEditFormData()}
          >
            + 添加新的发票
          </Button>
          <InvoiceList />

          <div className="flex flex-col gap-[30px] mt-[40px]">
            {/* <TagXzz title="开票信息" /> */}
            <div className="text-[#222] text-[18px]">
              <span className="mr-[50px]">开票资料: </span>
              {invoiceFormData?.entity ? (
                <>
                  <span
                    style={{
                      background: "#1366f02e",
                      color: "#1366F0",
                      fontSize: "16px",
                      borderRadius: "16px",
                      padding: "6px",
                      marginRight: "20px",
                    }}
                  >
                    {invoiceFormData.entity}
                  </span>
                  <span>{invoiceFormData.name}</span>
                </>
              ) : (
                <span>请选择开票主体</span>
              )}
            </div>
            <div className="text-[#222] text-[18px]">
              <span className="mr-[50px]">发票类型:</span>
              <span style={{ marginRight: "30px" }}>
                <XzzBtn00
                  disabled={invoiceFormData.invoice_type == "person"}
                  border={invoiceFormData.invoice_type == "special"}
                  onClick={() => updateInvoiceFormData({ invoice_type: "special" })}
                >
                  <div>增值税专用发票</div>
                  <div
                    style={{
                      color: "#fff",
                      background: "#1366F0",
                      borderRadius: "8px 0px",
                      fontSize: "14px",
                      padding: "0 14px",
                      position: "absolute",
                      top: "0",
                      left: "-1px",
                    }}
                  >
                    可抵税
                  </div>
                </XzzBtn00>
              </span>
              <span>
                <XzzBtn00
                  border={invoiceFormData.invoice_type == "normal"}
                  onClick={() => updateInvoiceFormData({ invoice_type: "normal" })}
                >
                  <div>增值税普通发票</div>
                  <div
                    style={{
                      color: "#999",
                      background: "#F5F5F5",
                      borderRadius: "8px 0px",
                      fontSize: "14px",
                      padding: "0 14px",
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }}
                  >
                    不可抵税
                  </div>
                </XzzBtn00>
              </span>
            </div>

            <div className="text-[#222] text-[18px]">
              <span className="mr-[50px]">发票种类:</span>
              <span style={{ marginRight: "30px" }}>
                <XzzBtn00 border={true}>
                  <div
                    style={{
                      color: "#222",
                      fontSize: "20px",
                    }}
                  >
                    电子发票
                  </div>
                  <div
                    style={{
                      color: "#999",
                      fontSize: "18px",
                    }}
                  >
                    收13%税金
                  </div>
                </XzzBtn00>
              </span>
            </div>
          </div>
          <div className="mt-[auto] justify-center flex gap-[20px]">
            <XzzBtn>
              <div style={{ width: "98px" }} onClick={() => setInvoiceModalVisible(false)}>
                取消
              </div>
            </XzzBtn>
            <XzzBtn type="primary" onClick={() => setInvoiceModalVisible(false)}>
              <div style={{ width: "98px" }}>确定</div>
            </XzzBtn>
          </div>
        </div>
      }
    />
  )
}
interface XzzBtn00Props {
  children: React.ReactNode
  disabled?: boolean
  border?: boolean
  onClick?: () => void
}

const XzzBtn00: React.FC<XzzBtn00Props> = (props) => {
  const { children, disabled = false, border = false, ...rest } = props
  const btnStyle: any = {
    height: "90px",
    borderRadius: "8px",
    fontFamily: "Microsoft YaHei",
    fontWeight: 400,
    Position: "relative",
    width: "292px",
    border: border ? "1px solid #1677ff" : "",
  }

  return (
    <Button style={btnStyle} disabled={disabled} {...rest}>
      <div className="text-[18px]">{children}</div>
    </Button>
  )
}
export default InvoiceInfo
