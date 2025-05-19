import { Popconfirm, PopconfirmProps } from "antd"
import React from "react"

// 定义 Props 类型
interface CustomPopconfirmProps extends PopconfirmProps {
  children: React.ReactNode // 用于承载触发 Popconfirm 的元素（比如按钮）
}

// 自定义 Popconfirm 组件，接受 PopconfirmProps 作为扩展
const CustomPopconfirmLqh: React.FC<CustomPopconfirmProps> = ({
  title = "确定执行此操作吗？",
  onConfirm,
  onCancel,
  okText = "确定",
  cancelText = "取消",
  children,
  ...rest
}) => {
  return (
    <Popconfirm
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      {...rest} // 传递其他属性给 Popconfirm
    >
      {children}
    </Popconfirm>
  )
}

export default CustomPopconfirmLqh
