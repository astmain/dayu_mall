import "./scroll.css"

import { Button, Checkbox } from "antd"

import ModalLqh2 from "@/components/ModalLqh2/index"

interface AgreeProps {
  onCheckboxChange?: (e: any) => void
  isThin?: boolean
}

//  模拟后端返回数据
const Agreements = [
  { title: "打印须知", content: "3D扫描下单前请确认以下事项" },
  { title: "3d模型设计规范", content: "请仔细阅读并同意保密协议" },
  { title: "售后说明", content: "请仔细阅读并同意售后说明" },
]
const XzzAgree: React.FC<AgreeProps> = ({ isThin = false }) => {
  const [open, setOpen] = useState(false)
  const { setIsAgree } = usePrintCartStore((state) => state)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openAgreement = (index: number) => {
    setCurrentIndex(index)
    setOpen(true)
  }

  return (
    <>
      <div className="flex items-center text-[15px]">
        {isThin ? (
          ""
        ) : (
          <Checkbox className="mr-[4px]" onChange={(e) => setIsAgree(e.target.checked)}>
            我已阅读并同意
          </Checkbox>
        )}
        <div className="flex items-center justify-around">
          {Agreements.map((item, index) => (
            <div
              key={index}
              className={
                isThin ? "text-[#1366F0] cursor-pointer w-[100px]  text-[14px]" : "text-[#1366F0] cursor-pointer"
              }
              onClick={() => openAgreement(index)}
            >
              {isThin ? item.title : `《${item.title}》`}
            </div>
          ))}
        </div>
      </div>
      <ModalLqh2
        width="1200px"
        title="客户指引"
        open={open}
        closable={false}
        classname="custom-modal-user"
        content={
          <div className=" max-w-[1200px] p-[30px] h-[100%]">
            <div className="flex w-[100%]">
              <ul className="text-center">
                {Agreements.map((item, index) => {
                  return (
                    <li
                      onClick={() => setCurrentIndex(index)}
                      key={index}
                      style={{
                        background: currentIndex == index ? "#1366F0" : "",
                        color: currentIndex == index ? "#ffffff" : "",
                      }}
                      className="w-[150px] text-[16px] bg-white h-[56px] leading-[56px] rounded-[10px] my-[20px] mt-[0] cursor-pointer border border-[#DCDCDC]"
                    >
                      {item.title}
                    </li>
                  )
                })}
              </ul>
              <div className="px-[30px]">
                <div className="w-[1px]  bg-[#DCDCDC] h-[100%]"></div>
              </div>
              <div className="flex w-[100%] flex-col h-[100%] " style={{ width: "calc(100% - 180px)" }}>
                <div className="text-[20px] text-[#222222] mb-[19px]">{Agreements[currentIndex].title}</div>
                <ul className="  overflow-auto min-h-[60vh]">
                  <li className="mb-[30px] text-[16px]">{Agreements[currentIndex].content}</li>
                </ul>
                <Button
                  onClick={() => setOpen(false)}
                  className="w-[180px] h-[56px] text-[20px] self-center"
                  type="primary"
                >
                  我已知悉
                </Button>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}

export default XzzAgree
