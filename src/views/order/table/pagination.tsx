interface PaginationProps {
  currentPage: number // 当前页码
  pageSize: number // 每页条数
  totalItems: number // 数据总条数
  onPageChange: (page: number) => void // 页码变化回调
  onPageSizeChange: (size: number) => void // 每页条数变化回调
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize) // 总页数

  // 生成分页按钮（带省略号）
  const generatePagination = () => {
    const pages: (number | string)[] = []
    const showRange = 3 // 中间展示页码的范围

    if (totalPages <= 7 + showRange * 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1) // 首页
      if (currentPage > showRange + 2) pages.push("...")

      const start = Math.max(2, currentPage - showRange)
      const end = Math.min(totalPages - 1, currentPage + showRange)

      for (let i = start; i <= end; i++) pages.push(i)

      if (currentPage < totalPages - showRange - 1) pages.push("...")
      pages.push(totalPages) // 末页
    }
    return pages
  }

  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "40px",
        padding: "0 40px",
      }}
    >
      <div className="flex gap-[10px] ">
        {/* 上一页按钮 */}
        <PageBtn onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
          {"<"}
        </PageBtn>

        {/* 分页按钮 */}
        {generatePagination().map((page, idx) =>
          typeof page === "number" ? (
            <PageBtn
              key={idx}
              onClick={() => onPageChange(page)}
              style={{
                backgroundColor: currentPage === page ? "#1366F0" : "#fff",
                color: currentPage === page ? "white" : "black",
              }}
            >
              {page}
            </PageBtn>
          ) : (
            <PageBtn key={idx}>...</PageBtn>
          ),
        )}

        {/* 下一页按钮 */}
        <PageBtn
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          {">"}
        </PageBtn>
      </div>

      {/* 每页条数选择 */}
      <div className="flex items-right" style={{ color: "#999999" }}>
        {/* <div>每页</div> 
        border: 1px solid #aba7a7;
    border-radius: 6px;
    */}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="focus:outline-none"
        >
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              每页{size}条
            </option>
          ))}
        </select>
        {/* 显示总记录数 */}
        <span style={{ marginLeft: "20px" }}>当前共 {totalItems} 条</span>
      </div>
    </div>
  )
}

const PageBtn = (props: any) => {
  const { children, style, ...rest } = props
  const btnStyle = {
    lineHeight: "42px",
    border: "1px solid #ddd",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "8px",
    fontSize: "16px",
    ...style,
  }
  return (
    <div className="w-[42px] h-[42px] hover:bg-red-500" style={btnStyle} {...rest}>
      {children}
    </div>
  )
}

export default Pagination
