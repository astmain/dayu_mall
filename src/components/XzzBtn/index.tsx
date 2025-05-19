import { Button } from "antd"
import { ButtonProps } from "antd"
import React from "react"

interface XzzBtnProps {
  style?: any
}
const XzzBtn: React.FC<XzzBtnProps & ButtonProps> = (props: XzzBtnProps & ButtonProps) => {
  const { children, type = "default", style, loading, ...rest } = props
  const btnStyle: any = {
    height: "56px",
    borderRadius: "8px",
    fontFamily: "Microsoft YaHei",
    fontWeight: 400,
  }
  if (type == "primary") {
    btnStyle.background = "#1366F0"
  }
  return (
    <Button type={type} style={{ ...btnStyle, ...style }} {...rest} loading={loading}>
      <div className="text-[18px]">{children}</div>
    </Button>
  )
}

export default XzzBtn
