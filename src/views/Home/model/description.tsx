import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"

import DividerXzz from "@/components/divider"

import AuthorizationModal, { AuthorizationModalMethods, AuthorizationTypeType } from "./authorization"
import Image from "./image"
import PackageModal, { PackageModalMethods } from "./package"

const Description = () => {
  const authorization = ["个人", "企业", "企业扩展"]
  const [currentAuthorization, setCurrentAuthorization] = useState<AuthorizationTypeType>("个人")
  const authorizationRef = useRef<AuthorizationModalMethods>(null)
  const packageRef = useRef<PackageModalMethods>(null)
  return (
    <>
      <div className="w-full grid grid-cols-2 gap-[30px]">
        <Image />
        <div className="w-full flex flex-col gap-[20px] text-left">
          <div className="text-[36px] text-[#000000] font-bold">switch卡通风格场景渲染</div>
          <div className="flex  items-center text-[16px] text-[#999999] gap-[20px]">
            <div>发布人: DAYU-3D</div>
            <div className="text-[#1366F0]">已实名认证</div>
            <div>发布时间: 2024-11-11 15:26:30</div>
          </div>
          <div className="flex items-center gap-[20px]">
            <Button color="default" variant="outlined" disabled className="text-[#000]">
              下载次数(1500)
            </Button>
            <Button color="default" variant="outlined">
              取消收藏
            </Button>
            <Button color="default" variant="outlined">
              +关注
            </Button>
            <Button variant="outlined" color="primary">
              进入店铺
            </Button>
          </div>
          <div className="text-[16px] text-[#666666]">
            <div className="text-[#222222] text-[22px] font-bold mb-[10px]">文件详情</div>
            <div className="flex  gap-[20px]">
              <div>压缩包大小: 2.0G</div>
              <div>文件格式: glb</div>
              <div
                className="text-[#1366F0] text-[18px] underline cursor-pointer"
                onClick={() => packageRef.current && packageRef.current.handleOpenModal("glb")}
              >
                查看压缩包详情
              </div>
            </div>
            <div className="flex  gap-[20px]">
              <div>压缩包大小: 1.6G</div>
              <div>文件格式: 3dmax</div>
              <div
                className="text-[#1366F0] text-[18px] underline cursor-pointer"
                onClick={() => packageRef.current && packageRef.current.handleOpenModal("3dmax")}
              >
                查看压缩包详情
              </div>
            </div>
          </div>
          <div className="">
            <div className="text-[#222222] text-[20px] font-bold mb-[10px]">商品支持</div>
            <div className="grid grid-cols-3 gap-[10px] w-[70%]">
              <div className="h-[52px]   bg-[#f5f5f5] text-[#999] rounded-[8px]  gap-[4px] flex items-center justify-center">
                <div>有绑定</div>
                <CheckCircleOutlined style={{ color: "#1366F0" }} />
              </div>
              <div className="h-[52px]   bg-[#f5f5f5] text-[#999] rounded-[8px]  gap-[4px] flex items-center justify-center">
                <div>有动画</div>
                <CheckCircleOutlined style={{ color: "#1366F0" }} />
              </div>
              <div className="h-[52px]   bg-[#f5f5f5] text-[#999] rounded-[8px]  gap-[4px] flex items-center justify-center">
                <div>有贴图</div>
                <CloseCircleOutlined />
              </div>
              <div className="h-[52px]   bg-[#f5f5f5] text-[#999] rounded-[8px]  gap-[4px] flex items-center justify-center">
                <div>有材质</div>
                <CheckCircleOutlined style={{ color: "#1366F0" }} />
              </div>
              <div className="h-[52px]   bg-[#f5f5f5] text-[#999] rounded-[8px]  gap-[4px] flex items-center justify-center">
                <div>未塌陷</div>
                <CloseCircleOutlined />
              </div>
              <div className="h-[52px]   bg-[#f5f5f5] text-[#999] rounded-[8px]  gap-[4px] flex items-center justify-center">
                <div>可打印</div>
                <CheckCircleOutlined style={{ color: "#1366F0" }} />
              </div>
            </div>
          </div>
          <div className="text-[16px] text-[#666666]">
            <div className="text-[#222222] text-[22px] font-bold mb-[10px]">授权类型</div>
            <div className="flex items-center gap-[30px]">
              {authorization.map((item, index) => (
                <Button
                  key={index}
                  color={currentAuthorization === item ? "primary" : "default"}
                  size="large"
                  variant="outlined"
                  onClick={() => setCurrentAuthorization(item as AuthorizationTypeType)}
                >
                  {item}授权
                </Button>
              ))}
            </div>
          </div>
          <DividerXzz marginY="0px" />
          <div className="flex flex-col h-[120px] justify-around">
            <div className="price flex items-center gap-[20px] ">
              <div className="text-[#F05113] text-[22px] font-bold]">￥1000</div>
              <div className="w-[1px] h-[20px] bg-[#E0E0E0]"></div>
              <div>已选：个人授权</div>
              <div
                className="text-[#999999] underline cursor-pointer"
                onClick={() => authorizationRef.current && authorizationRef.current.handleOpenModal()}
              >
                授权范围
              </div>
            </div>
            <div className="operation flex items-center gap-[30px]">
              <Button size="large" danger className="h-[56px] w-[220px]">
                加入购物车
              </Button>
              <Button size="large" type="primary" className="h-[56px] w-[220px]">
                立即购买
              </Button>
            </div>
          </div>
        </div>
        <AuthorizationModal ref={authorizationRef} type={currentAuthorization} />
        <PackageModal ref={packageRef} />
      </div>
    </>
  )
}

export default Description
