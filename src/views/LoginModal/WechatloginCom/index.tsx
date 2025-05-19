import LoginAgree from "@/components/LoginAgree"

import loginModal from "./index.module.scss"

function WechatLoginLqh() {
  const imgBaseUrl = "http://yun3d.com/frontend/public/test/"

  const { setCurrentComponent } = useLoginStore((state) => {
    return state
  })

  return (
    <div>
      <div>
        <div className={loginModal.wechatLogin}>
          <span>微信扫码登录/注册</span>
        </div>
        <div className={loginModal.wechatCode}>
          <img src={imgBaseUrl + "erweima.png"} alt="" />
        </div>

        <div className={loginModal.usernumber}>
          <a href="#" onClick={() => setCurrentComponent("login")}>
            账号密码登录
          </a>
        </div>

        <div className={loginModal.wechatloginAgree}>
          <LoginAgree />
        </div>
      </div>
    </div>
  )
}

export default WechatLoginLqh
