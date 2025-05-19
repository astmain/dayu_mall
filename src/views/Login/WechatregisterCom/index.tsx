import { message } from "antd"
import { useEffect } from "react"

// 引入自定义封装的loading组件
// import Loadinglqh from "@/components/loadinglqh"
// import { useNavigate } from "react-router-dom"
// 引入微信扫码注册接口
import { WechatCheckBindData, WechatRegData } from "@/network/api/login/index"
import { wait } from "@/utils/wait"

// 引入微信登录/注册接口
import WechatloginCom from "../WechatloginCom"

function WechatregisterComLqh() {
  const navigate = useNavigate()

  // 引入全局控制加载变量--把布尔值注入进去
  const { setLoadingLqh, setTipTitleLqh } = useLoginStore((state) => state)

  const { setToken, setUserInfo } = useUserStore((state) => state)
  const { currentComponent, setCurrentComponent } = useLoginStore((state) => {
    return state
  })

  // 获取微信code
  //   const wechatCode = sessionStorage.getItem("wechat_code")
  //   console.log(wechatCode, "wechatCode")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    if (code) {
      //   调用微信注册接口
      getWechatReg(code)
    }
  }, [])

  // 微信扫码注册接口方法
  const getWechatReg = async (code: string) => {
    setLoadingLqh(true) //加载中
    setTipTitleLqh("绑定中...")
    const startTime = Date.now()
    try {
      const res = await WechatRegData({ code })

      const { code: rescode, message: msg, data } = res

      if (rescode === 200) {
        // setTimeout(() => {
        message.success(msg) //提示成功信息

        // }, 3000)
        // 1秒后调用检查微信是否绑定过接口
        const endTime = Date.now()
        const waitTime = endTime - startTime
        if (waitTime < 3000) {
          await wait(3000 - waitTime) //
          // setTimeout(
          //   () => setRegisterLoding(false), //关闭加载
          //   3000 - waitTime,
          // )
        }

        if (data?.openid) {
          getWechatCheckBind(data.openid)
        }
      } else {
        // // 跳转到微信扫码登录/注册页 // 5秒后跳到微信扫码登录/注册页
        setCurrentComponent("wechatLogin")
      }
    } catch (error) {
      console.error("getWechatReg error", error)
    } finally {
      setLoadingLqh(false) //关闭加载
    }
  }
  //   这边调用检查微信是否绑定过接口
  const getWechatCheckBind = async (openid: string) => {
    setLoadingLqh(true) //加载中
    const startTime = Date.now()
    try {
      const res = await WechatCheckBindData({ openid })

      if (res.code != 200) {
        // 先给个提示3秒 --用户还没有做微信绑定--3秒后跳转到绑定手机号页面

        message.error("该用户首次登录,需要绑定手机号,正在进入绑定手机号")

        const endTime = Date.now()
        const waitTime = endTime - startTime
        if (waitTime < 3000) {
          await wait(3000 - waitTime) //
        }
        setLoadingLqh(false) //关闭加载

        // 跳转到绑定手机号页面 openid
        navigate("/login/bindphonenumber", { state: { openid } }) // 绑定页面路径
      } else {
        console.log("该用户已绑定手机号----------")

        const { data } = res

        const { token, ...rest } = data
        //--有做微信绑定的情况,跳转到首页
        message.success("该用户已绑定手机号,正在进入首页")

        const endTime = Date.now()
        const waitTime = endTime - startTime
        if (waitTime < 3000) {
          await wait(3000 - waitTime) //
        }
        //关闭加载
        setLoadingLqh(false)
        setToken(token)
        setUserInfo(rest)
        // 执行登录逻辑（假设已登录
        // const from = location?.state?.from?.pathname || "/" // 如果没有来源路径则重定向到首页

        navigate("/", { replace: true })
      }
    } catch (error) {
      console.log(error, "请求失败")
    } finally {
      setLoadingLqh(false) //关闭加载
    }
  }

  return (
    // <Loadinglqh tip="加载中..." loading={loadingLqh}>
    <div className="w-[100%] flex justify-center flex-col items-center" style={{ margin: "30px" }}>
      {/* 失败的情况--微信登录异常--重新跳回微信扫码登录页面 */}
      {currentComponent == "wechatLogin" && <WechatloginCom />}
    </div>
    // </Loadinglqh>
  )
}

export default WechatregisterComLqh
