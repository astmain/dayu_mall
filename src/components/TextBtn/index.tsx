import React from "react"

interface XzzBtnProps {
  children: React.ReactNode
  onClick?: () => void
  style?: any
}
const TextBtnXzz: React.FC<XzzBtnProps> = (props: XzzBtnProps) => {
  const { children, style = {}, ...rest } = props
  const btnStyle: any = {
    borderRadius: "8px",
    fontFamily: "Microsoft YaHei",
    fontWeight: 400,
    color: "#1366F0",
    cursor: "pointer",
    fontSize: "16px",
    // padding: "2px 5px",
    padding: "2px 10px",
    ...style,
  }

  return (
    <div style={btnStyle} {...rest} className="text-btn-xzz">
      {children}
    </div>
  )
}

export default TextBtnXzz
