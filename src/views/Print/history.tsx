import type { TableColumnsType, TableProps } from "antd"
import { Button, message, Space, Table } from "antd"

import Xzztag from "@/components/XzzTag"
import { addHistory2CartApi, deleteHistoryApi } from "@/network/api/print"
// const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

interface DataType {
  key: React.Key
  imgSrc: any
  filename: string
  // filesize: string
  uploadtime: string
}

function HistoryTable() {
  const columns: TableColumnsType<DataType> = [
    { align: "center", title: "序号", width: 70, dataIndex: "key" },
    { align: "center", title: "图纸", width: 80, dataIndex: "imgSrc" },
    { align: "center", title: "文件名", width: 184, dataIndex: "filename" },
    // Lqh3.31写的先注释,UI历史记录模块没有文件大小 { align: "center", title: "文件大小", width: 100, dataIndex: "filesize" },
    { align: "center", title: "上传时间", width: 140, dataIndex: "uploadtime" },
    {
      align: "center",
      title: "操作",
      fixed: "right",
      width: 200,
      dataIndex: "",
      key: "x",
      render: (item: any, _record: DataType, _index: number) => (
        <Space size="middle">
          <Button type="primary" onClick={() => addItem2Cart(item.id)}>
            加入购物车
          </Button>
          <Button onClick={() => deleteItem(item.id)}>删除</Button>
        </Space>
      ),
    },
  ]

  const { initPrintHistory, printHistory } = usePrintHistoryStore((state) => state)
  const { initPrintCart } = usePrintCartStore((state) => state)
  const getHistoryList = async () => {
    await initPrintHistory()
  }

  useEffect(() => {
    getHistoryList()
  }, [])

  useEffect(() => {
    const dataSource = printHistory.map<DataType>((_, i) => {
      const { id, file_name, upload_time, designer, image_url } = _
      return {
        key: i + 1,
        id,
        imgSrc: <img src={image_url} className="w-[100%] h-[100%] " />,
        filename: file_name,
        // filesize: "16.32mb",
        uploadtime: upload_time,
        designer,
      }
    })
    setDataSource(dataSource)
  }, [printHistory])

  const [dataSource, setDataSource] = useState<DataType[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  // const [list, setList] = useState<GetHistoryListRes[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const addItem2Cart = async (id?: number) => {
    try {
      if (selectedRowKeys.length === 0 && !id) return message.warning("请先勾选要加入的产品")
      const res = await addHistory2CartApi({ id: id ? [id] : selectedRowKeys.map((key) => key as number) })
      if (res.code === 200) {
        message.success("加入购物车成功")
        // getHistoryList()
        // 清空勾选
        setSelectedRowKeys([])
        initPrintCart()
      }
    } catch (error) {
      message.error("加入购物车失败")
    }
  }
  const deleteItem = async (id?: number) => {
    try {
      if (selectedRowKeys.length === 0 && !id) return message.warning("请先勾选要删除的产品")
      const res = await deleteHistoryApi({ ids: id ? [id] : selectedRowKeys.map((key) => key as number) })
      if (res.code === 200) {
        message.success("删除成功")
        getHistoryList()
        // 清空勾选
        setSelectedRowKeys([])
      } else {
        message.error("删除失败")
      }
    } catch (error) {
      message.error("删除失败")
    }
  }

  return (
    <div className="w-full h-[480px] p-[20px] overflow-hidden rounded-[20px] border-[1px] border-solid border-[#DCDCDC]">
      <div className="w-[100%] flex justify-between items-center mb-[20px]">
        <Xzztag title="历史上传记录" />
        <div className="flex w-[190px] justify-between">
          <Button onClick={() => addItem2Cart()}>批量加入</Button>
          <Button onClick={() => deleteItem()}>批量删除</Button>
        </div>
      </div>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        className=""
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 690, y: 330 }}
        bordered
      />
    </div>
  )
}

export default HistoryTable
