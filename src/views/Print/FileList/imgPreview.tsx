import { Image } from "antd"
export default function ImgPreview(_item: any) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="text-[12px] text-[#666] text-left flex flex-col gap-[6px] ">
      <div className="size">
        <span>打孔位置:</span>
        <a className="text-[#1366F0] cursor-pointer" onClick={() => setVisible(true)}>
          查看图片
        </a>
        <Image
          preview={{
            visible,
            src: "",
            onVisibleChange: (value) => {
              setVisible(value)
            },
          }}
        />
      </div>
      <div className="size">
        <span>拆件示意图:</span>
        <a className="text-[#1366F0] cursor-pointer" onClick={() => setVisible(true)}>
          查看图片
        </a>
        <Image
          preview={{
            visible,
            src: "",
            onVisibleChange: (value) => {
              setVisible(value)
            },
          }}
        />
      </div>
    </div>
  )
}
