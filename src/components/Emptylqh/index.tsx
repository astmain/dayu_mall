import "./index.css" // 如果需要样式自定义

import { Empty } from "antd"
import React from "react"

// 定义要传的自定义属性
interface CustomEmptyProps {
  description?: React.ReactNode // 自定义描述文字
  className?: string // 自定义类名
}

const CustomEmpty: React.FC<CustomEmptyProps> = ({
  description = "", // 默认描述文字

  className = "",
}) => {
  return (
    <Empty
      className={`custom-empty ${className}`} // 支持自定义类名
      description={description}
    />
  )
}

export default CustomEmpty
