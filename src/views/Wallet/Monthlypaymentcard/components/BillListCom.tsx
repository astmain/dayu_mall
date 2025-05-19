import EmptyLqh from "@/components/Emptylqh"
import ModalLqh2 from "@/components/ModalLqh2"

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL
// 滚动加载数据
import { App as AntdApp, List, Spin } from "antd"
import VirtualList from "rc-virtual-list"

// 账单详情
import BilldetailsCom from "./BilldetailsCom"

// 月付卡账单列表
// const mouthbillListArr = [
//   {
//     imgSrc: imgUrl + "yfzf.png",
//     title: "3D打印订单支付-月付卡支付",
//     yearMonth: "2024年10月01日",
//     time: "10:26",
//     money: "￥-1288.88",
//   },
// ]

function BillListComLqh() {
  // 账单详情
  const [isModalOpenBillDetails, setIsModalOpenBillDetails] = useState(false)
  // 账单详情
  const billListBtn = (value: any) => {
    console.log(value)
    setIsModalOpenBillDetails(true)
  }

  const { message } = AntdApp.useApp() // ✅ 使用 useApp 获取 message 实例

  // 设置滚动高度
  const ContainerHeight = 600 // ✅ 设置滚动区域高度
  const TotalData = 30 // ✅ 假设总共有 30 条数据
  const PageSize = 10 // ✅ 每次加载 10 条数据

  // 模拟后端请求
  // ✅ 生成本地假数据
  const generateFakeData = (start: number, count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: start + index + 1,
      imgSrc: imgUrl + "yfzf.png",
      title: `3D打印订单支付-月付卡支付${start + index + 1}`,
      yearMonth: "2024年10月01日",
      time: "10:26",
      money: "￥-1288.88",
    }))
  }

  const [mouthbillListArr, setmouthbillListArr] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // ✅ 初始化加载数据
  useEffect(() => {
    setmouthbillListArr(generateFakeData(0, PageSize))
    // if (hasMore && billListArr.length >= TotalData) {
    //   setHasMore(false) // ✅ 只触发一次
    // }
  }, [])
  // ✅ 滚动到底部加载更多数据
  const loadMoreData = () => {
    if (loading || !hasMore) return
    setLoading(true)

    setTimeout(() => {
      setmouthbillListArr((prev) => {
        const remaining = TotalData - prev.length
        const loadCount = Math.min(remaining, PageSize)
        const newItems = generateFakeData(prev.length, loadCount)
        const nextData = [...prev, ...newItems]

        // ✅ 这里判断数据是否加载完
        if (nextData.length >= TotalData) {
          setHasMore(false)

          message.success("已加载全部数据")
        }

        return nextData
      })

      setLoading(false)
    }, 500)
  }
  return (
    <div>
      <div className="text-center p-[3px]">
        {mouthbillListArr.length > 0 && (
          <VirtualList
            data={mouthbillListArr}
            height={ContainerHeight}
            itemHeight={50}
            itemKey={(item) => item.id} // ✅ 确保 itemKey 唯一
            onScroll={(e) => {
              if (
                e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight - 20 &&
                hasMore &&
                !loading
              ) {
                loadMoreData() // ✅ 监听滚动触底，加载新数据
              }
            }}
          >
            {(item) => (
              <List.Item key={item.id} className="list-none">
                <div className="flex flex-col mb-[11px] gap-[20px]">
                  <div className="flex flex-col gap-[20px]">
                    <div onClick={() => billListBtn(item)} className="cursor-pointer">
                      <div className="flex">
                        <div>
                          <img className="w-[56px] h-[56px]" src={item.imgSrc} alt="" />
                        </div>
                        <div className="ml-[21px] text-left w-[100%] border-b border-b-[#f5f5f5]  flex justify-between pb-[20px]">
                          <div className="mt-[6px]">
                            <p className="text-[18px] text-[#222222]">{item.title}</p>
                            <p className="text-[14px] text-[#999999]">
                              {item.yearMonth} {item.time}
                            </p>
                          </div>
                          <div className="text-[20px] flex justify-center items-center">
                            <span>{item.money}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          </VirtualList>
        )}
        {mouthbillListArr.length == 0 && <EmptyLqh description="暂无账单信息" />}

        {loading && hasMore && (
          <Spin tip="加载中...">
            <div className="h-0"></div>
          </Spin>
        )}
      </div>

      {/* 月付卡查看账单详情 */}
      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        title="账单详情"
        open={isModalOpenBillDetails}
        onCancel={() => setIsModalOpenBillDetails(false)}
        onOk={() => setIsModalOpenBillDetails(false)}
        classname="custom-modal-zddetail"
        closable={true} //显示右上角关闭按钮 />
        content={<BilldetailsCom />}
      />
    </div>
  )
}

export default BillListComLqh
