import { LeftOutlined } from "@ant-design/icons"

// color="default" variant="link"
const BackBtn = () => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(-1)}
      className="flex items-center text-[#999] gap-[2px] rounded-[8px] p-[5px] cursor-pointer hover:bg-[#f5f5f5] transition-all duration-300"
    >
      <LeftOutlined />
      <span>返回</span>
    </div>
  )
}

export default BackBtn
