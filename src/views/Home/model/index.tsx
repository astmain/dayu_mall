import { Button } from "antd"

import BackBtn from "@/components/backBtn"
import DividerXzz from "@/components/divider"
import ModelList from "@/components/modelList"

import Description from "./description"

function ModelDetail() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  useEffect(() => {
    console.log("id = ", id)
  }, [id])
  const navigate = useNavigate()

  const attributes = [
    {
      label: "点",
      value: "3507561",
    },
    {
      label: "布线类型",
      value: "三角形 + 四边形",
    },
    {
      label: "使用插件",
      value: "无",
    },
    {
      label: "作品编号",
      value: "782388",
    },
    {
      label: "面",
      value: "5082341",
    },
    {
      label: "关于UV",
      value: "已展开，不重叠",
    },
    {
      label: "发布时间",
      value: "2024-10-10 16:09:01",
    },
    {
      label: "发布于",
      value: "广东省",
    },
  ]

  const description = [
    "所见即所得，可直接渲染",
    "游戏 游戏场景 游戏场景 古代街道场景 古建筑夜景 古镇 古城夜景水巷 荷花池古代步行街",
    "渲染预览图局部处理略微偏色拉对比度,文件格式:max",
    "材质、贴图、灯光齐全。",
    "模型规格、场景干净、贴图完整，可直接渲染。",
    "更多精品场景请点击右上角进入店铺。",
    "此场景模型文件禁止转发。",
  ]

  return (
    <>
      <div className="w-full m-[10px] ">
        <div className="flex justify-left items-center m-[10px_0]">
          <BackBtn />
        </div>
        <Description />
        <DividerXzz marginY="30px" />
        <div className="w-full  bg-[#F5F5F5] p-[20px] rounded-[20px] border border-solid border-[#DCDCDC] mb-[20px]">
          <div className="text-bold  text-[22px] text-[#222222] text-justify mb-[10px]">文件属性</div>
          <div className="text-[16px] text-[#666666] grid grid-cols-4 gap-[10px]">
            {attributes.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="">{item.label}</div>
                <div className="">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  bg-[#F5F5F5] p-[20px] rounded-[20px] text-justify border border-solid border-[#DCDCDC] mb-[20px]">
          <div className="text-bold  text-[22px] text-[#222222]  mb-[10px]">模型说明</div>
          <div className="text-[16px] text-[#666666] flex flex-col  gap-[15px]">
            {description.map((item, index) => (
              <div key={index} className="">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  mb-[10px] flex justify-between items-center">
          <div className="text-bold  text-[22px] text-[#222222]  mb-[10px]">店铺其他作品</div>
          <div className="">
            <Button size="large" type="link" variant="text" onClick={() => navigate("/home/author?id=" + 878)}>
              {"查看更多>>"}
            </Button>
          </div>
        </div>
        <ModelList searchParams={{ author: id }} showPagination={false} />
      </div>
    </>
  )
}

export default ModelDetail
