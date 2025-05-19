import Pagination from "@/components/pagination"

import { useTableWithPage } from "./hook"
import items from "./tempItems"

interface ModelListProps {
  searchParams: any
  [key: string]: any
  showPagination?: boolean
}
const ModelList: React.FC<ModelListProps> = (props: any) => {
  //  首先 传递 fetchData函数给hooks
  // 2. 共享变量由hook导出
  const { searchParams, showPagination = true } = props
  const { dataList, paginationProps } = useTableWithPage({
    searchParams,
    fetchDataApi: async () => {
      const params = {
        currentPage: paginationProps.currentPage,
        pageSize: paginationProps.pageSize,
        ...searchParams,
      }
      console.log("xzz2021: params", params)
      return {
        list: items,
        total: items.length,
      }
    },
  })
  return (
    <>
      <div className="w-full mb-[20px]">
        <ItemList items={dataList} />
        {showPagination && <Pagination {...paginationProps} />}
      </div>
    </>
  )
}
const ItemList = ({ items }: { items: any }) => {
  const navigate = useNavigate()

  return (
    <>
      <ul className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4  2xl:grid-cols-5  gap-5 m-[20px_0]">
        {items.map((item: any, index: number) => (
          <li
            key={index}
            className="flex flex-col text-left  hover:shadow-xl rounded-2xl cursor-pointer
             transform transition-transform duration-400 ease-in-out hover:scale-105 
             active:text-gray-700 active:shadow-inner relative
             active:[box-shadow:inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
            onClick={() => navigate(`/home/model?id=${index}`)}
          >
            <img src={item.image} alt={item.title} className=" h-auto rounded-2xl" />
            <p className="m-[5px_0]  font-bold text-[16px] text-[#000] text-hidden">{item.title}</p>
            <div className="flex items-center gap-2 mb-2">
              <img src={item.authorimg} alt={item.author} className="w-[30px] h-[30px] rounded-[50%]" />
              <p className="text-gray-500 text-sm">{item.author}</p>
            </div>
            {item.enableCommercial && (
              <div className="absolute w-[70px] text-center  top-0 left-0 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-tl-2xl rounded-br-2xl">
                商
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
export default ModelList
