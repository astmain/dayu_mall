import { Checkbox } from "antd"
import React from "react"

interface ColumnProps {
  title: string
  dataIndex: string
  key: string
  flex: number
  [key: string]: any
}

interface TableProps {
  fontSize?: number
  emptyTitle?: string
  columns: ColumnProps[]
  dataList: any[]
  showCheckBox?: boolean
  onCheckChange?: (record: any) => void
}
const TableXzz: React.FC<TableProps extends { a: string } ? { b: string } : TableProps> = ({
  fontSize = 16,
  columns,
  dataList,
  emptyTitle = "暂无数据",
  showCheckBox = false,
  onCheckChange,
}) => {
  const [currentChecked, setCurrentChecked] = React.useState(-1)

  // const onChange = (_e: any, item: any) => {
  //   changeEntity(item)
  // }
  // const changeEntity = (item: any) => {
  //   if (!item) return
  //   setCurrentChecked(item?.id)
  //   if (item?.id) {
  //     onCheckChange && onCheckChange(item)
  //   }
  // }
  // useEffect(() => {
  //   const currentItem = dataList.find((item) => item.is_default)
  //   changeEntity(currentItem || dataList[0])
  // }, [])

  const onChange = (_e: any, item: any, index: number) => {
    setCurrentChecked(index < 0 ? 0 : index)
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
              onChange={(e) => onChange(e, item, index)}
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
  )
}

export default TableXzz
