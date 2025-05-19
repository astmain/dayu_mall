import { Button, message } from "antd"
import { ButtonProps } from "antd"
import { ConfigProvider } from "antd"
import React from "react"

/*
使用示例
<XzzCopyBtn title="测试" value="777777" />
title为提示信息  value为需要复制的值
*/
interface XzzCopyBtn extends ButtonProps {}
const XzzCopyBtn: React.FC<XzzCopyBtn> = (props: XzzCopyBtn) => {
  // const copyProps = { ...props }
  const btnStyle: any = {
    width: "56px",
    height: "28px",
    borderRadius: "4px",
    fontFamily: "Microsoft YaHei",
  }
  const { title, value } = props
  const onCopy = () => {
    // message.error("请先绑定需要复制的值到value")
    // !value && (title = value)
    const aaa = value || title
    value && navigator.clipboard.writeText(aaa as string)
    message.success(`已复制${title}到剪切板`)
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1366F0",
        },
      }}
    >
      <div>
        <Button style={btnStyle} {...props} color="primary" variant="outlined" onClick={onCopy}>
          <div className="text-[14px] ">复制</div>
        </Button>
      </div>
    </ConfigProvider>
  )
}

export default XzzCopyBtn
