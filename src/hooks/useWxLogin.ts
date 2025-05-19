export const useWxLogin = () => {
  useEffect(() => {
    const s = document.createElement("script")
    s.type = "text/javascript"
    s.src = "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
    const wxElement = document.body.appendChild(s)
    wxElement.onload = function () {
      // @ts-expect-error 上面全局挂载了WxLogin
      const obj = new WxLogin({
        self_redirect: false,
        id: "weixinLogin", // 需要显示的容器id
        appid: "wxfcddbb227afa4d1d", // 微信开放平台appid wx*******/home
        scope: "snsapi_login", // 网页默认即可/login         跳转到微信扫码注册页面
        redirect_uri: encodeURIComponent("http://localhost:4100/login/wechatregistercom"), // 授权成功后回调的url
        state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
        style: "black", // 提供"black"、"white"可选。二维码的样式
        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7bWFyZ2luLXRvcDowO30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30=", // 外部css文件url，需要https
      })

      //   obj.show()

      console.log("xzz2021: wxElement.onload -> ", obj)
    }
    return () => {
      document.body.removeChild(wxElement)
    }
  }, [])
}
