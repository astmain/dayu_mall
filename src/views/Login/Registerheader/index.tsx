import { useMemo } from "react"

// 引入自定义封装的loading组件
// import Loadinglqh from "@/components/loadinglqh"
import Emailregistrationpage from "../Emailregistrationpage"
import Mobileregistrationpage from "../Mobileregistrationpage"

// 定义手机注册方式的类型
interface RegistrationMethod {
  id: number
  title: string
}

// 密码登录验证码登录数据
const Registratio_METHODS: RegistrationMethod[] = [
  {
    id: 0,
    title: "手机注册",
  },
  {
    id: 1,
    title: "邮箱注册",
  },
]
function RegisterheaderLqh() {
  const { isClickregister, setIsisClickregister } = useRegisterStore((state) => state)

  // 使用 useMemo 缓存渲染逻辑
  const RegisterMethodButtons = useMemo(
    () =>
      Registratio_METHODS.map((method) => (
        <div
          key={method.id}
          style={{
            cursor: "pointer",
            fontSize: "22px",
            position: "relative",
          }}
          onClick={() => setIsisClickregister(method.id)}
          className={isClickregister === method.id ? "selected" : ""}
        >
          {method.title}
        </div>
      )),
    [isClickregister, setIsisClickregister],
  )

  // 引入全局控制加载变量--把布尔值注入进去
  // const { loadingLqh } = useLoginStore((state) => state)

  return (
    // <Loadinglqh tip="正在注册..." loading={loadingLqh}>
    <div>
      <div className="mb-[30px]">
        <div className="flex justify-around w-[430px] pb-[6px]">{RegisterMethodButtons}</div>
      </div>

      <div>
        <div style={{ display: isClickregister === 0 ? "block" : "none" }}>
          <Mobileregistrationpage />
        </div>
        {/* {isClickregister == 0 && (
          
          )} */}
        <div style={{ display: isClickregister === 1 ? "block" : "none" }}>
          <Emailregistrationpage />
        </div>
      </div>
    </div>
    // </Loadinglqh>
  )
}

export default RegisterheaderLqh
