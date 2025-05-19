import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"

import ModalXzz2 from "@/components/ModalXzz2"

const list = [
  { label: "学习、教学、研究", value: true },
  { label: "作为非核心内容的个人作品、毕业设计、参赛、演绎", value: true },
  { label: "个人自媒体、视频、直播、教程", value: true },
  { label: "企业自媒体、短视频、直播、培训、课堂等", value: false },
  { label: "企业广告、宣传的展示", value: false },
  { label: "赛事、会议、演出、展会等", value: false },
  { label: "电影、综艺、纪录片、电视剧等影视作品或栏目", value: false },
  { label: "游戏、应用程序、软件、软件等载体中的内容内置", value: false },
  { label: "App皮肤、主题、壁纸(主题或转售)", value: false },
  { label: "商品外包装设计（包括但不限于商品、促销商品或赠品）", value: false },
]
export interface AuthorizationModalMethods {
  handleOpenModal: () => void
}

export interface AuthorizationModalProps {
  type: AuthorizationTypeType
}
export type AuthorizationTypeType = "个人" | "企业" | "企业扩展"
// const authorizationType: AuthorizationTypeType[] = ["个人", "企业", "企业扩展"]
const AuthorizationModal = forwardRef<AuthorizationModalMethods, AuthorizationModalProps>(({ type }, ref) => {
  const generateList = (type: AuthorizationTypeType) => {
    if (type === "个人") {
      return list
    } else if (type === "企业") {
      return list.map((item, index) => ({
        ...item,
        value: index < 7 ? true : false,
      }))
    } else if (type === "企业扩展") {
      return list.map((item) => ({
        ...item,
        value: true,
      }))
    } else {
      return []
    }
  }
  const [visible, setVisible] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpenModal = () => {
    setVisible(true)
  }
  const handleClose = () => {
    setVisible(false)
  }
  // 使用 useImperativeHandle 暴露方法
  useImperativeHandle(ref, () => ({
    handleOpenModal,
  }))
  return (
    <>
      <ModalXzz2 title="授权类型" isOpen={visible} onClose={handleClose} showClose={true}>
        <div className="flex flex-col gap-[20px] w-[600px] mb-[20px]">
          <div className="text-[22px] text-[#222] font-bold bg-[#F5F5F5] h-[80px] text-left leading-[80px] pl-[20px]">
            {type}授权范围
          </div>
          {generateList(type).map((item) => (
            <div key={item.label} className="flex  items-center gap-[20px] pl-[20px]">
              {item.value ? <CheckCircleOutlined style={{ color: "#1366F0" }} /> : <CloseCircleOutlined />}
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </ModalXzz2>
    </>
  )
})

export default AuthorizationModal
