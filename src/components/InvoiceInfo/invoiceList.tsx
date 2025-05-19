import { Button, message, Popconfirm } from "antd"

import { useSimpleTryApi } from "@/hooks/useTryApi"
import { deleteInvoiceApi, getInvoiceApi, setDefaultInvoiceApi } from "@/network/api/invoice"
import { BaseInvoiceData } from "@/network/api/invoice/type"

import TableXzz from "../TableXzz"
import InvoiceFormXzz from "./editForm"

const columns = [
  {
    title: "开票主体",
    dataIndex: "entity",
    key: "entity",
    flex: 1,
  },
  {
    title: "公司名称/个人名称",
    dataIndex: "name",
    key: "name",
    flex: 1,
  },
  {
    title: "税号",
    dataIndex: "taxID",
    key: "taxID",
    flex: 1,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    flex: 1,
  },
]

const invoiceDic = [
  {
    name: "个人",
    invoice_type: "person",
  },
  {
    name: "企业",
    invoice_type: "company",
  },
]
export default function InvoiceList() {
  const { updateEditFormData, updateInvoiceFormData } = useInvoiceStore((state) => state)
  const [invoiceList, setInvoiceList] = useState<BaseInvoiceData[]>([])

  const { request: getList } = useSimpleTryApi({
    apiFunction: getInvoiceApi,
    handler: (data: any) => {
      const newData = data?.map((item: any) => {
        return {
          ...item,
          name: item?.name || item?.bank_name,
          taxID: item?.tax_no || "",
          entity: invoiceDic.find((iten) => iten.invoice_type == item.invoice_type)?.name,
        }
      })
      setInvoiceList(newData)
    },
  })

  useEffect(() => {
    getList()
  }, [])

  const onCheckChange = (record: any) => {
    const { id, taxID, name, entity, invoice_type } = record
    updateInvoiceFormData({ id, taxID, name, entity, invoice_type })
  }
  const { request: deleteInvoice } = useSimpleTryApi({
    title: "删除发票成功",
    apiFunction: deleteInvoiceApi,
    handler: () => {
      getList()
    },
  })

  const setDefaultInvoice = async (id: number) => {
    const res = await setDefaultInvoiceApi({ id, is_default: true })
    if (res.code == 200) {
      message.success("设置默认发票成功")
      getList()
    }
  }
  const generateDataList = () => {
    return invoiceList.map((item: BaseInvoiceData) => {
      const operate = (
        <div className="flex justify-around items-center">
          {item.is_default ? (
            <Button color="primary" size="small" variant="solid">
              当前默认
            </Button>
          ) : (
            <Button type="text" size="small" onClick={() => setDefaultInvoice(item.id)}>
              设为默认
            </Button>
          )}
          <div className="btns">
            <Button
              type="text"
              size="small"
              onClick={() => {
                updateEditFormData(item)
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确定删除地址吗？"
              description="删除后无法恢复"
              onConfirm={() => deleteInvoice({ id: item.id })}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" style={{ color: "#999" }}>
                删除
              </Button>
            </Popconfirm>
          </div>
        </div>
      )
      return {
        ...item,
        operate,
      }
    })
  }
  return (
    <>
      <TableXzz columns={columns} dataList={generateDataList()} showCheckBox={true} onCheckChange={onCheckChange} />

      <InvoiceFormXzz updateInvoiceList={getList} />
    </>
  )
}
