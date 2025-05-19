// eslint-disable-next-line simple-import-sort/imports
import loginModal from "./index.module.scss"

// import PasswordloginCom from "../PasswordloginCom"

// import VerificationcodeloginCom from "../VerificationcodeloginCom"

// 密码登录验证码登录数据
// const pwdLoginList = [
//   {
//     id: 1,
//     title: "密码登录",
//   },
//   {
//     id: 2,
//     title: "验证码登录",
//   },
// ]
function getComponentLqh() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { isPwdLogin, setIsPwdLogin } = useLoginStore((state) => state)

  // const passwordLoginBtn = (value: number) => {
  //   // setIsPwdLogin(value)
  // }
  return (
    <div>
      <div className={loginModal.loginContent}>
        <div className={loginModal.loginTitle}>
          {/* {pwdLoginList.map((item, index) => {
            return (
              <div
                style={{ cursor: "pointer", fontSize: "22px", position: "relative" }}
                key={index}
                onClick={() => passwordLoginBtn(index)}
                className={isPwdLogin == index ? loginModal.selected : ""}
              >
                {item.title}
              </div>
            )
          })} */}
          {/* <div onClick={() => passwordLoginBtn(true)} className={loginModal.password}>
            <span>密码登录</span>
            {isPwdLogin == true && <div className={loginModal.border}></div>}
          </div>
          <div onClick={() => passwordLoginBtn(false)} className={loginModal.yanzhengcode}>
            <span>验证码登录</span>
            {isPwdLogin == false && <div className={loginModal.border}></div>}
          </div> */}
        </div>
      </div>
      {/* <div>
        {isPwdLogin == 0 && (
          // 密码登录组件
          <PasswordloginCom />
        )}
        {isPwdLogin == 1 && (
          // 验证码登录组件
          <VerificationcodeloginCom />
        )}
      </div> */}
    </div>
  )
}

export default getComponentLqh
