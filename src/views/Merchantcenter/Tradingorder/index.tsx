import TableWithPageLqh from "@/components/TableWithPageLqh"
import { useTableWithPage } from "@/components/TableWithPageLqh/hook"

// import TextBtn from "@/components/TextBtn"

const TradingorderList = [
  { id: 1, title: "交易中", status: "jiaoyizhong" },
  { id: 2, title: "已出售", status: "yichushou" },
  { id: 3, title: "售后中", status: "shouhuozhong" },
]

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

function TradingorderLqh() {
  const { isTradingorder, setIsTradingorder } = useTradingorderStore((state) => state)

  const { dataList, columns, paginationProps } = useTableWithPage({
    columns: [
      {
        title: "预览图",
        dataIndex: "contact",

        key: "contact",
        flex: 2,
      },
      {
        title: "模型信息",
        dataIndex: "phone",

        key: "phone",
        flex: 4,
      },
      {
        title: "销量/下载量",
        dataIndex: "downloads",

        time: "2024-09-12 16:33:30",
        key: "downloads",
        flex: 5,
      },
      {
        title: "交易状态",
        dataIndex: "detailAddress",

        time: "2024-09-12 16:33:30",
        key: "detailAddress",
        flex: 5,
      },
      {
        title: "授权类型",
        dataIndex: "authorizationType",
        key: "authorizationType",
        flex: 4,
      },
      {
        title: "交易金额",
        dataIndex: "Transactionamount",
        key: "Transactionamount",
        flex: 4,
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        flex: 3,
      },
    ],
    fetchDataApi: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // const { currentPage, pageSize } = paginationProps
      // console.log("xzz2021: Home -> await", currentPage, pageSize)
      return {
        list: [
          {
            uploadTime: "交易时间:",
            time: "2024-09-12 16:33:30",
            orderNumber: "订单编号:",
            orderNum: "DY24091201511",
            workNumber: "作品编号:",
            workNum: "G24091201511",

            contact: (
              <div className="flex justify-around items-center   pl-[11px]">
                <img className="w-[40px]" src={imgUrl + "dagou.png"} alt="" />
              </div>
            ),
            phone: (
              <div>
                <div className="mb-[22px]">
                  <p className="text-hidden">高品质机械手表建模、电子表建模</p>
                </div>
                <div className="flex justify-start items-center">
                  <div className="flex justify-start items-center mr-[21px] fontClass">
                    <div className="mr-[11px] w-[24px]">
                      <img className="w-[28px]" src={imgUrl + "liulanliang2.png"} alt="" />
                    </div>
                    <div className="text-[16px] text-[#999999]">
                      <span>1688</span>
                    </div>
                  </div>
                  <div className="flex justify-start items-center mt-[-6px]">
                    <div className="mr-[11px] w-[24px]">
                      <img className="w-[24px]" src={imgUrl + "shoucang1.png"} alt="" />
                    </div>
                    <div className="text-[16px] text-[#999999] mt-[5px]">
                      <span>56</span>
                    </div>
                  </div>
                </div>
              </div>
            ),

            downloads: (
              <div className="text-[18px] text-[#000000]">
                <span>688</span>
              </div>
            ),
            authorizationType: (
              <div className="text-[14px]">
                <span>素材出售</span>
              </div>
            ),
            Transactionamount: (
              <div className="text-[#F05113] text-[18px]">
                {/* 到时记得保留两位小数点 */}
                <span>￥88.00</span>
              </div>
            ),
            tag: { label: "公司", value: "company" },
            operate: (
              <div className="flex flex-col justify-around items-center">
                <div className="mb-[3px] text-[#999999] text-[16px]">剩余时间</div>
                <div className="underline-xzz text-[#999999]">20:16:32</div>
                {/* 剩余时间 20:16:32   时 分 秒 倒计时 到时问下要不要做个倒计时优化,还是直接用后端返回的数据直接渲染时间就好 */}
              </div>
            ),
          },
          {
            uploadTime: "交易时间:",
            time: "2024-09-12 16:33:30",
            orderNumber: "订单编号:",
            orderNum: "DY24091201511",
            workNumber: "作品编号:",
            workNum: "G24091201511",

            contact: (
              <div className="flex justify-around items-center   pl-[11px]">
                <img className="w-[40px]" src={imgUrl + "dagou.png"} alt="" />
              </div>
            ),
            phone: (
              <div>
                <div className="mb-[22px]">
                  <p className="text-hidden">高品质机械手表建模、电子表建模</p>
                </div>
                <div className="flex justify-start items-center">
                  <div className="flex justify-start items-center mr-[21px]">
                    <div className="mr-[11px] w-[24px]">
                      <img className="w-[28px]" src={imgUrl + "liulanliang2.png"} alt="" />
                    </div>
                    <div className="text-[16px] text-[#999999]">
                      <span>1688</span>
                    </div>
                  </div>
                  <div className="flex justify-start items-center mt-[-6px]">
                    <div className="mr-[11px] w-[24px]">
                      <img className="w-[24px]" src={imgUrl + "shoucang1.png"} alt="" />
                    </div>
                    <div className="text-[16px] text-[#999999] mt-[5px]">
                      <span>56</span>
                    </div>
                  </div>
                </div>
              </div>
            ),

            downloads: (
              <div className="text-[18px] text-[#000000]">
                <span>2</span>
              </div>
            ),
            authorizationType: (
              <div className="text-[14px]">
                <span>素材出售</span>
              </div>
            ),
            Transactionamount: (
              <div className="text-[#F05113] text-[18px]">
                {/* 到时记得保留两位小数点 */}
                <span>￥88.00</span>
              </div>
            ),
            tag: { label: "公司", value: "company" },
            operate: (
              <div className="flex flex-col justify-around items-center">
                <div className="mb-[3px] text-[#999999] text-[16px]">剩余时间</div>
                <div className="underline-xzz text-[#999999]">20:16:32</div>
                {/* 剩余时间 20:16:32   时 分 秒 倒计时 到时问下要不要做个倒计时优化,还是直接用后端返回的数据直接渲染时间就好 */}
              </div>
            ),
          },
        ],
        total: 500,
      }
    },
  })
  const tablistChange = (value: number) => {
    console.log(value)
    setIsTradingorder(value)
  }

  const newDataList = dataList.map((item) => {
    item.detailAddress = (
      <div>
        <div className="address text-[#F01342] mb-[13px] text-hidden">
          <span>等待买家付款</span>
        </div>
      </div>
    )
    return item
  })
  return (
    <div>
      <div className="w-[100%] max-w-[1470px] h-[61px] bg-[#fff] rounded-[14px] flex justify-start items-center mb-[20px] max-w-[1470px] xl:w-[71vw] lg:w-[65vw] md:w-[54vw] sm:w-[45vw]">
        {TradingorderList.map((item, index) => {
          return (
            <div key={index} className="flex justify-start items-center">
              <div
                onClick={() => tablistChange(index)}
                className="Tradingordertitle w-[108px] max-w-[108px] h-[61px]  leading-[61px] cursor-pointer 2xl:w-[108px] xl:w-[11vw] lg:w-[11vw] md:w-[11vw] sm:w-[11vw]"
              >
                <div
                  className={`${isTradingorder === index ? "text-[#1366f0]" : ""} hover:bg-[rgba(224,224,224,0.5)] text-[16px]`}
                >
                  <span>{item.title}</span>
                </div>
              </div>

              {(index == 0 || index == 1) && <div className="w-[1px] h-[29px] bg-[#dcdcdc]"></div>}
            </div>
          )
        })}
      </div>

      <div className="w-[100%] max-w-[1470px] bg-[#f5f5f5] rounded-[14px]">
        {isTradingorder == 0 && (
          <div className="mb-[20px]">
            <div className="w-[860px]  leading-[36px] bg-[rgba(240,81,19,0.1)] rounded-[8px] pl-[30px] pr-[30px] text-[14px] flex justify-start items-[center] 2xl:w-[860px] xl:w-[71vw] lg:w-[65vw] md:w-[54vw] sm:w-[45vw]">
              <span className="text-[#f05113] font-bold">
                注意：买家未付款订单或买家取消的订单，系统将在24小时后自动为您删除该订单信息。
              </span>
            </div>
          </div>
        )}
        {isTradingorder == 1 && (
          <div className="mb-[20px]">
            <div className="w-[860px]  leading-[36px] bg-[rgba(240,81,19,0.1)] rounded-[8px] pl-[30px] pr-[30px] text-[14px] flex justify-start items-[center] 2xl:w-[860px] xl:w-[71vw] lg:w-[65vw] md:w-[54vw] sm:w-[45vw]">
              <span className="text-[#f05113] font-bold">
                注意：买家付款后，7日后系统将自动将交易金额转入您的钱包余额。
              </span>
            </div>
          </div>
        )}
        {isTradingorder == 2 && (
          <div className="mb-[20px]">
            <div className="w-[860px] leading-[36px] bg-[rgba(240,81,19,0.1)] rounded-[8px] pl-[30px] pr-[30px] text-[14px] flex justify-start items-[center] 2xl:w-[860px] xl:w-[71vw] lg:w-[65vw] md:w-[54vw] sm:w-[45vw]">
              <span className="text-[#f05113] font-bold">
                注意：买家申请售后问题，如确实出现该问题商家应同意退款，如遇其他问题可联系客服协商解决。
              </span>
            </div>
          </div>
        )}

        <div className="w-[100%] max-w-[1390px]">
          <TableWithPageLqh columns={columns} dataList={newDataList} paginationProps={paginationProps} />
        </div>
      </div>
    </div>
  )
}

export default TradingorderLqh
