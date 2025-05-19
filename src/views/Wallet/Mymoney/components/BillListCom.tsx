// 账单列表

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

// 滚动加载数据
import { App as AntdApp, List, Spin } from "antd"
import VirtualList from "rc-virtual-list"

import EmptyLqh from "@/components/Emptylqh"
// 新改的弹框组件
import ModalLqh2 from "@/components/ModalLqh2/index"

// 账单详情
import BillDetails from "./BilldetailsCom"

const BillListComLqh = () => {
  // 账单详情
  const [isModalOpenBillDetails, setIsModalOpenBillDetails] = useState(false)

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
      imgSrc: imgUrl + "wechatpay.png",
      title: `3D打印订单支付-微信扫码支付${start + index + 1}`,
      yearMonth: "2024年10月01日",
      time: "10:26",
      money: "￥-1288.88",
    }))
  }
  const [billListArr, setbillListArr] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  // ✅ 初始化加载数据
  useEffect(() => {
    setbillListArr(generateFakeData(0, PageSize))
  }, [])

  // ✅ 滚动到底部加载更多数据
  const loadMoreData = () => {
    if (loading || !hasMore) return
    setLoading(true)

    setTimeout(() => {
      setbillListArr((prev) => {
        const remaining = TotalData - prev.length
        const loadCount = Math.min(remaining, PageSize)
        const newItems = generateFakeData(prev.length, loadCount)
        const nextData = [...prev, ...newItems]

        // ✅ 这里判断数据是否加载完
        if (nextData.length >= TotalData) {
          setHasMore(false)
          // ✅ 只弹一次提示
          message.success("已加载全部数据")
        }

        return nextData
      })

      setLoading(false)
    }, 500)
  }

  // 账单详情
  const billListBtn = (value: any) => {
    console.log(value)

    setIsModalOpenBillDetails(true)
  }
  const handleCancel = () => {
    setIsModalOpenBillDetails(false)
  }
  const handleOk = () => {
    setIsModalOpenBillDetails(false)
  }

  return (
    <div>
      <div className="text-center p-[3px]">
        {billListArr.length > 0 && (
          <VirtualList
            data={billListArr}
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

        {/* ✅ 显示加载动画 */}
        {billListArr.length == 0 && <EmptyLqh description="暂无账单信息" />}
      </div>

      {loading && hasMore && (
        <Spin tip="加载中...">
          <div className="h-0"></div>
        </Spin>
      )}
      {/* ✅ 显示结束消息 */}

      {/* {billListArr.length === TotalData && <p style={{ textAlign: "center", paddingTop: "11px" }}>没有更多数据了 🎉</p>} */}
      {/* 我的钱包--账单详情 */}
      <ModalLqh2
        width="830px 2xl:w-[830px] xl:w-[52vw] lg:w-[51vw] md:w-[50vw] sm:w-[49vw]"
        title="账单详情"
        open={isModalOpenBillDetails}
        onCancel={handleCancel}
        onOk={handleOk}
        classname="custom-modal-zddetail"
        closable={true} //显示右上角关闭按钮 />
        content={<BillDetails />}
      />
    </div>
  )
}

export default BillListComLqh
