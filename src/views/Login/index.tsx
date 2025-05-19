// import { Button } from "antd"

// import ForgotpasswordCom from "./ForgotpasswordCom"
// 忘记密码头部组件
// 绑定手机号组件

// import { Spin } from "antd"

import Bindphonenumber from "./Bindphonenumber"
import Forgotpasswordheader from "./Forgotpasswordheader"
// 引入头部切换组件
import LoginHeader from "./loginHeader"
// import Bindphonenumber from "./Bindphonenumber"
// Registerheader
import Registerheader from "./Registerheader"
import WechatloginCom from "./WechatloginCom"

function Login() {
  const { currentComponent } = useLoginStore((state) => {
    return state
  })

  const getComponent = () => {
    let currentCom = <></>
    switch (currentComponent) {
      case "login":
        currentCom = <LoginHeader></LoginHeader>
        break
      case "resetpwd":
        currentCom = <Forgotpasswordheader></Forgotpasswordheader>
        break

      case "Bindphonenumber":
        currentCom = <Bindphonenumber></Bindphonenumber>
        break
      case "Registerheader":
        currentCom = <Registerheader></Registerheader>
        break
      case "wechatLogin":
        currentCom = <WechatloginCom></WechatloginCom>
        break

      default:
        break
    }
    return currentCom
  }

  return (
    // <Spin spinning={loading} tip="正在处理,请稍等..." size="large">
    <div className="flex items-center h-[650px]">{getComponent()}</div>
    // </Spin>
  )
}

export default Login
