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
  const listDom = () => {
    return dataList.map((item, index) => {
      return (
        <div
          className="content flex justify-around text-center  items-center h-[55px] relative table-xzz"
          key={index}
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
                className="text-[#222]"
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
      )
    })
  }
  return (
    <>
      <div className=" rounded-[16px] overflow-hidden " style={{ border: "1px solid #DCDCDC" }}>
        <div className="header   flex justify-around text-center  items-center bg-[#F5F5F5] h-[55px]">
          {columns.map((item, index) => {
            return (
              <div className="text-[#222]" style={{ flex: item.flex, fontSize }} key={index}>
                {item.title}
              </div>
            )
          })}
        </div>
        {dataList.length === 0 ? emptyDom : listDom()}
      </div>
      {total > 0 && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={total}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        ></Pagination>
      )}
    </>
  )
}

export default TableWithPage
