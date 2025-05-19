export interface ColumnProps {
  title: string
  dataIndex: string
  key: string
  flex: number
  [key: string]: any
  // render?: (value: any, record: any, index: number) => React.ReactNode
}
export interface PaginationProps {
  currentPage: number
  pageSize: number
  total: number
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
}
export interface TableProps {
  // children: React.ReactNode
  fontSize?: number
  emptyTitle?: string
  columns: ColumnProps[]
  dataList: any[]
  showCheckBox?: boolean
  onCheckChange?: (record: any) => void
  paginationProps: PaginationProps
}

interface UseTableConfig {
  /**
   * 是否初始化的时候请求一次
   */
  immediate?: boolean
  fetchDataApi: () => Promise<{
    list: any[]
    total?: number
  }>
  searchParams?: any
}
export const useTableWithPage = (config: UseTableConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(4)
  const [dataList, setDataList] = useState<any[]>([])

  const getList = async () => {
    setLoading(true)
    try {
      const res = await config?.fetchDataApi()
      if (res) {
        setDataList(res.list)
        setTotal(res.total || 0)
      }
    } catch (err) {
      console.log("fetchDataApi error")
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, config.searchParams])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }
  const onPageSizeChange = (size: number) => {
    setPageSize(size)
  }
  return {
    dataList,
    getList,
    paginationProps: {
      currentPage,
      onPageChange,
      pageSize,
      onPageSizeChange,
      totalItems: total,
    },
  }
}
