// import { AuthorizationTypeType } from "./authorization"

import ModalXzz2 from "@/components/ModalXzz2"

export interface PackageModalMethods {
  handleOpenModal: (item: any) => void
}

const tempItem = {
  fileName: "switch卡通风格场景渲染.zip",
  fileSize: "398.23MB",
  platform: "3DMAX",
  previewImg: [
    { fileName: "S_SKY_022 副本 s.JPG", fileSize: "0.52MB" },
    { fileName: "znzmoModel-1128021489-0001.jpg", fileSize: "0.36MB" },
    { fileName: "znzmoModel-1128021489-0002.jpg", fileSize: "0.41MB" },
    { fileName: "znzmoModel-1128021489-0003.png", fileSize: "0.01MB" },
    { fileName: "znzmoModel-1128021489-0004.png", fileSize: "0.01MB" },
    { fileName: "znzmoModel-1128021489-0005.png", fileSize: "0.01MB" },
    { fileName: "znzmoModel-1128021489-0006.jpg", fileSize: "0.28MB" },
    { fileName: "znzmoModel-1128021489-0007.png", fileSize: "0.01MB" },
    { fileName: "znzmoModel-1128021489-0008.png", fileSize: "0.01MB" },
    { fileName: "znzmoModel-1128021489-0009.jpg", fileSize: "0.32MB" },
  ],
}
const PackageModal = forwardRef<PackageModalMethods>((_props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPackage] = useState(tempItem)
  const [visible, setVisible] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpenModal = (_item: any) => {
    // setCurrentPackage(item)
    setVisible(true)
  }
  // 使用 useImperativeHandle 暴露方法
  useImperativeHandle(ref, () => ({
    handleOpenModal,
  }))
  return (
    <>
      <ModalXzz2 title="压缩包详情" isOpen={visible} onClose={() => setVisible(false)} showClose={true}>
        <div className="flex flex-col gap-[20px] w-[600px] mb-[20px]">
          <div className=" bg-[#F5F5F5] h-[80px] text-left pl-[20px] flex flex-col justify-center">
            <div className="text-[20px] text-[#222] font-bold">{currentPackage.fileName}</div>
            <div className="flex items-center gap-[100px] text-[14px] text-[#999999]">
              <div>{currentPackage.platform}</div>
              <div>{currentPackage.fileSize}</div>
            </div>
          </div>
          {currentPackage.previewImg.map((item) => (
            <div key={item.fileName} className="flex  items-center gap-[20px] pl-[20px]">
              <div>{item.fileName}</div>
              <div>{item.fileSize}</div>
            </div>
          ))}
        </div>
      </ModalXzz2>
    </>
  )
})

export default PackageModal
