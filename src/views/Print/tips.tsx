import XzzAgree from "@/components/XzzAgree"

function Tips() {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center p-[20px]">
      <div className="text-[#999] text-[12px] mb-[10px]">大宇3D打印将对您的文件绝对保密,保护您的知识产权</div>
      <XzzAgree isThin={true} />
    </div>
  )
}

export default Tips
