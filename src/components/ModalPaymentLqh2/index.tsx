import "./ModalPayment2.css"

import { Modal } from "antd"
import React from "react"

import { usePreventBodyScroll } from "./hooks"

// 定义 ModalProps 类型
interface CustomModalProps {
  open: boolean // Modal 是否可见
  title: string // Modal 的标题
  onCancel: () => void // 取消时的回调
  onOk: () => void // 确认时的回调
  content: React.ReactNode // Modal 内容，可以是任意 React 节点
  width?: string | number // Modal 宽度，可选
  classname: string //高度 可选
  footer?: React.ReactNode // Modal 底部内容，可选
  closable: boolean // close右上角关闭按钮
  zIndex?: number // 弹窗的 z-index，默认为 666
}

const CustomModalLqh: React.FC<CustomModalProps> = ({
  open,
  title,
  onCancel,
  onOk,
  content,
  width, // 默认宽度
  classname,
  footer = null, // 默认无自定义底部
  closable = true, //默认显示右上角关闭按钮
  zIndex = 666, // 弹窗的 z-index，默认为 666
}) => {
  usePreventBodyScroll(open)
  return (
    <Modal
      // style={{ fontSize: "22px", fontWeight: "400", color: "#222222" }}
      title={<span className="text-[22px] font-[400] text-[#222222]">{title}</span>}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      width={width}
      footer={footer}
      closable={closable}
      style={{ padding: "0", zIndex: "1000" }}
      forceRender
      className={classname}
      zIndex={zIndex}
      centered // 使 Modal 垂直居中
    >
      {content}
    </Modal>
  )
}

export default CustomModalLqh
