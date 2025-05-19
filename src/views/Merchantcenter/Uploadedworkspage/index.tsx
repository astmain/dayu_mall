import PopconfirmLqh from "@/components/PopconfirmLqh"
import { useTableWithPage } from "@/components/TableWithPage/hook"
import TableWithPageLqh from "@/components/TableWithPageLqh"
import TextBtn from "@/components/TextBtn"

const uploadList = [
  { id: 1, title: "待审核", status: "daishenhe" },
  { id: 2, title: "未通过", status: "weitongguo" },
  { id: 3, title: "已通过", status: "yitongguo" },
  { id: 4, title: "已上架", status: "yishangjia" },
]

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

function UploadedworkspageLqh() {
  // 取消删除
  const handleCancel = () => {
    console.log("取消删除数据")
  }

  // 确认删除
  const handleDelete = () => {
    console.log("确认删除")
  }
  const { isUploadworks, setIsUploadworks } = useuploadworkStore((state) => state)
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
        title: "作品状态",
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
        title: "价格",
        dataIndex: "price",
        key: "price",
        flex: 4,
      },
      {
        title: "操作",
        dataIndex: "operate",
        key: "operate",
        flex: 2,
      },
    ],
    fetchDataApi: async () => {
      // await new Promise((resolve) => setTimeout(resolve, 1000))
      // const { currentPage, pageSize } = paginationProps
      // console.log("xzz2021: Home -> await", currentPage, pageSize)
      return {
        list: [
          {
            uploadTime: "上传时间:",
            time: "2024-09-12 16:33:30",
            workNumber: "作品编号:",
            workNum: "G24091201511",
            auditTime: "审核时间:",
            workingDays: "1~3个工作日",
            contact: (
              <div className="flex justify-around items-center   pl-[11px]">
                <img className="w-[40px]" src={imgUrl + "dagou.png"} alt="" />
              </div>
            ),
            phone: "高品质机械手表建模、电子表建模",

            authorizationType: (
              <div className="text-[14px]">
                <span>素材出售</span>
              </div>
            ),
            price: (
              <div className="text-[#F05113] text-[18px]">
                {/* 到时记得保留两位小数点 */}
                <span>￥88.00</span>
              </div>
            ),
            tag: { label: "公司", value: "company" },
            operate: (
              <div className="flex justify-around items-center flex-col">
                <div className="mb-[20px]">
                  <TextBtn>重新编辑</TextBtn>
                </div>
                <PopconfirmLqh title="确认要删除吗" onCancel={handleCancel} onConfirm={handleDelete}>
                  <div className="underline-xzz text-[#999999]">删除作品</div>
                </PopconfirmLqh>
              </div>
            ),
          },
          {
            uploadTime: "上传时间:",
            time: "2024-09-12 16:33:30",
            workNumber: "作品编号:",
            workNum: "G24091201511",
            auditTime: "审核时间:",
            workingDays: "1~3个工作日",
            contact: (
              <div className="flex justify-around items-center pl-[11px]">
                <img className="w-[40px]" src={imgUrl + "dagou.png"} alt="" />
              </div>
            ),
            phone: "高品质机械手表建模、电子表建模",

            authorizationType: (
              <div className="text-[14px]">
                <span>素材出售</span>
              </div>
            ),
            price: (
              <div className="text-[#F05113] text-[18px]">
                {/* 到时记得保留两位小数点 */}
                <span>￥88.00</span>
              </div>
            ),
            tag: { label: "公司", value: "company" },
            operate: (
              <div className="flex justify-around flex-col items-center">
                <div className="mb-[20px]">
                  <TextBtn>重新编辑</TextBtn>
                </div>
                <PopconfirmLqh title="确认要删除吗" onCancel={handleCancel} onConfirm={handleDelete}>
                  <div className="underline-xzz text-[#999999]">删除作品</div>
                </PopconfirmLqh>
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
    setIsUploadworks(value)
  }

  const newDataList = dataList.map((item) => {
    item.detailAddress = (
      <div>
        <div className="address text-[#F01342] mb-[13px] text-hidden">
          <span>待审核</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-[4px]">
            <img className="w-[14px]" src={imgUrl + "moxingyulan2.png"} alt="" />
          </div>
          <div>
            <div className="underline-xzz">模型预览</div>
          </div>
        </div>
      </div>
    )
    return item
  })
  return (
    <div>
      <div className="w-[100%] max-w-[1470px] h-[61px] bg-[#fff] rounded-[14px] flex justify-start items-center mb-[20px]  xl:w-[71vw] lg:w-[65vw] md:w-[54vw] sm:w-[45vw]">
        {uploadList.map((item, index) => {
          return (
            <div key={index} className="flex justify-start items-center">
              <div
                onClick={() => tablistChange(index)}
                className="uploadtitle w-[108px] max-w-[108px] h-[61px]  leading-[61px] cursor-pointer 2xl:w-[108px] xl:w-[11vw] lg:w-[11vw] md:w-[11vw] sm:w-[11vw]"
              >
                <div
                  className={`${isUploadworks === index ? "text-[#1366f0]" : ""} hover:bg-[rgba(224,224,224,0.5)] text-[16px]`}
                >
                  <span>{item.title}</span>
                </div>
              </div>

              {(index == 0 || index == 1 || index == 2) && <div className="w-[1px] h-[29px] bg-[#dcdcdc]"></div>}
            </div>
          )
        })}
      </div>

      <div className="w-[100%] max-w-[1470px] bg-[#f5f5f5] rounded-[14px]">
        {isUploadworks == 0 && (
          <div className="mb-[20px]">
            <div className="w-[860px] max-w-[100%] leading-[36px] bg-[rgba(240,81,19,0.1)] rounded-[8px] pl-[30px] pr-[30px] text-[14px] flex justify-start items-center 2xl:w-[860px] xl:w-[71vw] lg:w-[65vw] md:w-[54vw] sm:w-[45vw]">
              <span className="text-[#f05113] font-bold">
                注意：作品审核通过后将为你自动上架，上架的作品可自行前往已上架列表下架作品，下架后作品显示在已通过列表可再次上架。
              </span>
            </div>
          </div>
        )}
        {isUploadworks == 1 && (
          <div className="mb-[20px]">
            <div className="w-[860px]  leading-[36px] bg-[rgba(240,81,19,0.1)] rounded-[8px] pl-[30px] pr-[30px] text-[14px] flex justify-start items-center 2xl:w-[860px] xl:w-[78%] lg:w-[78%] md:w-[69%] sm:w-[60%]">
              <span className="text-[#f05113] font-bold">
                注意：未通过审核的作品只保留15日，如需继续发布该作品请重新编辑发布作品。
              </span>
            </div>
          </div>
        )}
        {isUploadworks == 2 && (
          <div className="mb-[20px]">
            <div className="w-[860px]  leading-[36px] bg-[rgba(240,81,19,0.1)] rounded-[8px] pl-[30px] pr-[30px] text-[14px] flex justify-start items-center 2xl:w-[860px] xl:w-[78%] lg:w-[78%] md:w-[69%] sm:w-[60%]">
              <span className="text-[#f05113] font-bold">
                注意：上架的作品可自行前往已上架列表下架作品，下架后作品显示在当前列表可再次上架。
              </span>
            </div>
          </div>
        )}

        {isUploadworks == 3 && (
          <div className="mb-[20px]">
            <div className="w-[860px] leading-[36px] bg-[rgba(240,81,19,0.1)] rounded-[8px] pl-[30px] pr-[30px] text-[14px] flex justify-start items-center 2xl:w-[860px] xl:w-[78%] lg:w-[78%] md:w-[69%] sm:w-[60%]">
              <span className="text-[#f05113] font-bold">
                注意：已上架的作品可下架，下架后显示在已通过列表可再次上架。
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

export default UploadedworkspageLqh
