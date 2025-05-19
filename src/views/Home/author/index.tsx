import { Button } from "antd"

import avatar from "@/assets/miniProgram.png"
import BackBtn from "@/components/backBtn"
import ModelList from "@/components/modelList"
function AuthorList() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  useEffect(() => {
    console.log("id = ", id)
  }, [id])
  return (
    <>
      <div className="w-full ">
        <div className="w-full p-[10px]">
          <div className="flex justify-left items-center m-[10px_0]">
            <BackBtn />
          </div>
          <div className="w-full flex justify-between items-center m-[20px_0]">
            <div className="flex items-center gap-[20px]">
              <img src={avatar} alt="" className="w-[120px] h-[120px] rounded-[50%]" />
              <div className="flex flex-col items-baseline gap-[10px]">
                <div className="text-[16px] flex items-center gap-[20px]">
                  <span className="text-[22px]">DAYU-3D</span>
                  <span className="h-[20px] w-[1px] bg-[#E0E0E0]"></span>
                  <div className="flex items-center gap-[10px]">
                    <span className="text-[22px]">2988</span> <span className="text-[14px]">下载次数</span>
                  </div>
                </div>
                <div className="flex items-center gap-[20px] text-[16px] text-[#666666]">
                  <div>年龄: 20</div>
                  <div>性别: 女</div>
                </div>
                <div className="text-[16px] text-[#666666]">
                  <div className="bg-[#FFFFFF] rounded-[6px] border p-[5px] border-solid border-[#1366F0]">
                    <div className="text-[#1366F0]">已实名认证</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center  gap-[20px]">
              <div className="flex items-center gap-[10px]">
                <div className="text-[16px] text-[#666666]">
                  收藏 <span className="text-[#1366F0]">20</span>
                </div>
                <div className="text-[16px] text-[#666666]">
                  关注 <span className="text-[#1366F0]">55</span>
                </div>
                <div className="text-[16px] text-[#666666]">
                  粉丝 <span className="text-[#1366F0]">268</span>
                </div>
              </div>
              <Button color="default" variant="outlined">
                +关注
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#F5F5F5] h-[10px]"></div>
        <div className="w-full p-[10px]">
          <div className="text-[28px] text-[#222222]  text-left">作品(268)</div>
          <ModelList searchParams={{ authorId: id }} />
        </div>
      </div>
    </>
  )
}

export default AuthorList
