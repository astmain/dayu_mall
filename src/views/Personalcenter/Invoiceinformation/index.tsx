import { Button } from "antd"

import InvoiceFormXzz from "@/components/InvoiceInfo/editForm"
import TableXzz from "@/components/TableXzz"

function InvoiceinformationLqh() {
  // invoiceModalVisible, editFormData, setInvoiceModalVisible,
  const { updateEditFormData } = useInvoiceStore((state) => state)

  // const { editFormData, updateEditFormData } = useInvoiceStore((state) => state)
  interface DataListType {
    entity: string
    name: string
    operate?: React.ReactNode
    taxId: string
    invoiceType: string
  }
  const columns = [
    {
      title: "开票主体",
      dataIndex: "entity",
      key: "entity",
      flex: 1,
    },
    {
      title: "开票主体名称",
      dataIndex: "name",
      key: "name",
      flex: 1,
    },
    {
      title: "税号",
      dataIndex: "taxId",
      key: "taxId",
      flex: 1,
    },
    {
      title: "发票类型",
      dataIndex: "invoiceType",
      key: "invoiceType",
      flex: 1,
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      flex: 1,
    },
  ]
  const dataList: DataListType[] = [
    {
      entity: "个人",
      name: "陈小生",
      taxId: "无",
      invoiceType: "增值税普通发票",
    },
    {
      entity: "企业",
      name: "泉州大宇科技有限公司",
      taxId: "91350503156494748X",
      invoiceType: "增值税专用发票",
    },
  ]

  const onCheckChange = (record: any) => {
    console.log("TCL: onCheckChange -> record", record)
    if (record.entity == "个人") {
      // updateEditFormData({ entity: record.entity, invoiceType: "normal" })
    } else {
      // updateEditFormData({ entity: record.entity })
    }
  }

  const updateInvoiceList = () => {
    console.log("更新发票列表")
  }
  const gengrateDataList = () => {
    return dataList.map((item, index) => {
      item.operate = (
        <div className="flex justify-around items-center">
          {/* {item.id == currentId ? (
                <Button color="primary" size="small" variant="solid">
                  当前
                </Button>
              ) : (
                <Button type="text" size="small">
                  使用
                </Button>
              )} */}
          {index == 0 ? (
            <Button color="primary" size="small" variant="solid">
              当前默认
            </Button>
          ) : (
            <Button type="text" size="small">
              设为默认
            </Button>
          )}
          <div className="btns">
            <Button type="text" size="small" onClick={() => updateEditFormData(item)}>
              修改
            </Button>
            <Button type="text" size="small" className="text-[#999]">
              删除
            </Button>
          </div>
        </div>
      )
      return item
    })
  }
  return (
    <div className="w-[920px] h-[677px] rounded-[10px] border border-[#dcdcdc] max-w-[920px] pt-[30px] pl-[30px] pr-[30px] 2xl:w-[920px] xl:w-[100%] lg:w-[87%] md:w-[82%] sm:w-[70%]">
      <div className="flex justify-between items-center mb-[30px]">
        <div className="text-[#222] text-[20px]">
          <span>开票资料</span>
        </div>

        <div onClick={() => updateEditFormData(true)} className="text-[16px] text-[#1366f0] cursor-pointer">
          <span>+ 新建开票资料</span>
        </div>
      </div>

      {/* 中间表格--直接引入开票组件 */}
      <div>
        <TableXzz columns={columns} dataList={gengrateDataList()} onCheckChange={onCheckChange} />
      </div>

      {/* 新建开票资料弹框 */}
      <InvoiceFormXzz updateInvoiceList={updateInvoiceList} />
    </div>
  )
}

export default InvoiceinformationLqh
