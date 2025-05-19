import TagXzz from "@/components/XzzTag"

import Uploader from "./uploader"

export default function Attachment() {
  return (
    <>
      <div className="flex flex-col gap-[10px]">
        <TagXzz title="附件" />
        <div className="flex items-center gap-[10px]">
          <div>打孔/拆件示意图:</div>
          <Uploader />
        </div>

        <div className="flex items-center gap-[10px]">
          <div>附件：</div>
          <Uploader />

          <div className="text-[#999999] text-[12px] w-[265px] h-[34px]">
            为了实现更好的产品效果，您可以上传详细的说明 支持图片、视频、文档
          </div>
        </div>
      </div>
    </>
  )
}
