import { Progress } from "antd"

function Loading() {
  const [isModalOpen] = useState(!false)

  return isModalOpen ? (
    <div
      className="w-[200px] h-[200px] bg-[#fff] rounded-[20px] flex justify-center items-center"
      style={{ position: "absolute", top: "calc(50% - 100px)", left: "calc(50% - 100px)" }}
    >
      <Progress
        type="circle"
        percent={75}
        format={(percent) => (
          <>
            <div className="text-[#999] text-3xl/[42px]">{percent}%</div>
            <div className="text-[#999] text-base/[28px]">正在上传</div>
          </>
        )}
      />
    </div>
  ) : null
}

export default Loading
