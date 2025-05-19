import { Modal } from "antd"

import DividerXzz from "@/components/divider"
import NumberInputXzz from "@/components/NumberInput"
import XzzBtn from "@/components/XzzBtn"

import Attachment from "./attachment"
import Material from "./material"
import Process from "./process"
export default function Specification() {
  const { isEditModalOpen, setOpenEditModal, currentItem, updateCurrentItem } = usePrintCartStore((state) => state)
  const closeEditModal = () => {
    setOpenEditModal(false)
  }
  return (
    <>
      <Modal
        title="修改规格"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={null}
        width={1000}
        style={{ padding: 0 }}
        centered={true}
      >
        <div className="overflow-y-auto h-[calc(90vh-100px)]">
          <div className=" flex gap-[10px]">
            {/* 上中下    上-左右   中-divider  下-提交 */}
            <Material />
          </div>
          <Process />
          <Attachment />
          <DividerXzz />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div>数量: </div>
            <NumberInputXzz
              defaultValue={currentItem.qty}
              onChange={(value) => {
                updateCurrentItem({ ...currentItem, qty: value })
              }}
            />
          </div>
          <div className="flex items-center gap-[10px]">
            <div>预估金额: </div>
            <div className="text-red-500">￥{currentItem.price * currentItem.qty}</div>
            <XzzBtn type="primary" variant="outlined" style={{ height: "40px" }}>
              确认
            </XzzBtn>
          </div>
        </div>
      </Modal>
    </>
  )
}
