import { useMemo } from "react"

// 引入自定义封装的loading组件
import PasswordloginCom from "../PasswordloginCom"
import VerificationcodeloginCom from "../VerificationcodeloginCom"

// 定义登录方式的类型
interface LoginMethod {
  id: number
  title: string
}

// 密码登录验证码登录数据
const LOGIN_METHODS: LoginMethod[] = [
  { id: 0, title: "密码登录" },
  { id: 1, title: "验证码登录" },
]

// 组件要大写
function LoginHeader() {
  const { isClickPwdreg, setIsLoginPwdreg } = useLoginStore((state) => state)

  // 使用 useMemo 缓存渲染逻辑
  const loginMethodButtons = useMemo(
    () =>
      LOGIN_METHODS.map((method) => (
        <div
          key={method.id}
          style={{
            cursor: "pointer",
            fontSize: "22px",
            position: "relative",
            fontWeight: isClickPwdreg === method.id ? "bold" : "normal",
          }}
          onClick={() => setIsLoginPwdreg(method.id)}
          className={isClickPwdreg === method.id ? "selected" : ""}
        >
          {method.title}
        </div>
      )),
    [isClickPwdreg, setIsLoginPwdreg],
  )

  return (
    // 自己封装的loading加载组件 -spinning 是否为加载中状态
    // <Loadinglqh tip="登录中..." loading={loadingLqh}>
    <div>
      <div className="mb-[30px]">
        <div className="flex justify-around w-[430px] pb-[6px]">{loginMethodButtons}</div>
      </div>
      <div>
        {/* 使用条件渲染并保持两个表单的状态 */}
        <div style={{ display: isClickPwdreg === 0 ? "block" : "none" }}>
          <PasswordloginCom />
        </div>
        <div style={{ display: isClickPwdreg === 1 ? "block" : "none" }}>
          <VerificationcodeloginCom />
        </div>
      </div>
    </div>
    // </Loadinglqh>
  )
}

export default LoginHeader
