import { Spin } from "antd"
import React from "react"
import { createPortal } from "react-dom"

import ModalStyle from "./index.module.scss"

interface TagProps {
  title: string
}
const XzzLoading: React.FC<TagProps> = () => {
  const { isLoading } = useGlobalStore((state) => state)
  if (isLoading) {
    document.body.style.overflow = "hidden"
    return createPortal(
      <div className={ModalStyle.overlay}>
        <div className={ModalStyle.content}>
          {/* <Spin tip="加载中..." size="large">
            <div style={{ padding: 50, borderRadius: 4 }} />
          </Spin> */}
          <Spin size="large"></Spin>
        </div>
      </div>,
      document.body,
    )
  } else {
    document.body.style.overflow = "auto"
    return null
  }
}

export default XzzLoading
