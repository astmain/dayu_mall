import "./styles.css"

import { Checkbox } from "antd"

import Pagination from "@/views/order/table/pagination"

import type { TableProps } from "./hook"

const TableWithPage: React.FC<TableProps extends { a: string } ? { b: string } : TableProps> = ({
  fontSize = 16,
  columns,
  dataList,
  emptyTitle = "暂无数据",
  showCheckBox = false,
  paginationProps,
  onCheckChange,
}) => {
  const { currentPage, pageSize, total, setCurrentPage, setPageSize } = paginationProps || {}
  const [currentChecked, setCurrentChecked] = useState(0)

  const onChange0 = (_e: any, item: any, index: number) => {
    setCurrentChecked(index)
    onCheckChange && onCheckChange(item)
  }

  const emptyDom = (
    <div className="text-center text-[#999]" style={{ height: "55px", lineHeight: "55px" }}>
      {emptyTitle}
    </div>
  )
  //   <div>
  //   <span>kk</span>
  // </div>
  const listDom = () => {
    return dataList.map((item, index) => {
      return (
        <div key={index} style={{ width: "100%" }}>
          <div className="uptimehead flex items-center justify-between h-[46px] pl-[30px] text-[14px] text-[#666666]">
            <div className="flex items-center h-[46px]  text-[14px] text-[#666666]">
              <div className="mr-[10px]">
                <span>{item.uploadTime}</span>
                <span>{item.time}</span>
              </div>

              <div className="mr-[10px]">
                <span>{item.orderNumber}</span>
                <span>{item.orderNum}</span>
              </div>
              <div className="mr-[10px]">
                <span>{item.workNumber}</span>
                <span>{item.workNum}</span>
              </div>
              <div>
                <span>{item.auditTime}</span>
                <span>{item.workingDays}</span>
              </div>
            </div>

            <div className=" w-[150px] text-[18px] text-[#666666]">
              <div className="underline-xzz">联系客服</div>
            </div>
          </div>

          <div
            className="Reedit content flex justify-around text-center bg-[#fff]  items-center h-[140px] relative table-xzz"
            style={index != 0 ? { borderTop: " 1px solid #DCDCDC" } : {}}
          >
            {showCheckBox && (
              <Checkbox
                onChange={(e) => onChange0(e, item, index)}
                // onClick={() => onChange(item, index)}
                checked={currentChecked == index}
                className="absolute left-[60px]"
              ></Checkbox>
            )}

            {columns.map((iten, indey) => {
              return (
                <div
                  className="text-[#222] Reedit"
                  style={{
                    flex: iten.flex,
                    fontSize,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  key={indey}
                >
                  {item[iten["key"]]}
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }
  return (
    <>
      <div
        className="upheadwork rounded-[16px] overflow-hidden w-[100%] max-w-[1390px]"
        style={{ border: "1px solid #DCDCDC" }}
      >
        {/* 头部预览图 w-[1390px]*/}
        <div className="header upworkheader flex justify-around text-center  items-center bg-[#FFF] w-[1390px]  h-[56px]">
          {columns.map((item, index) => {
            return (
              <div className="text-[#000] w-[418px] " style={{ flex: item.flex, fontSize }} key={index}>
                {item.title}
              </div>
            )
          })}
        </div>
        <div className="uptimeheader">{dataList.length === 0 ? emptyDom : listDom()}</div>
      </div>
      {/* w-[1425px] */}
      <div className="flex justify-end w-[100%] max-w-[1425px]">
        {total > 0 && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={total}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          ></Pagination>
        )}
      </div>
    </>
  )
}

export default TableWithPage
