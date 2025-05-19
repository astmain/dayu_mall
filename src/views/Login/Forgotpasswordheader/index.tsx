import { useMemo } from "react"

import EmailretrievalCom from "../EmailretrievalCom"
import PhoneBackCom from "../PhoneBackCom"

// 定义用手机找回类型
interface PhoneBackMethod {
  id: number
  title: string
}

// 用手机找回
const PhoneBack_METHODS: PhoneBackMethod[] = [
  {
    id: 0,
    title: "用手机找回",
  },
  {
    id: 1,
    title: "用邮箱找回",
  },
]
function RegisterheaderLqh() {
  const { isfind, setIsfind } = useRegisterStore((state) => state)

  const PhoneBackMethodButtons = useMemo(
    () =>
      PhoneBack_METHODS.map((method) => (
        <div
          key={method.id}
          style={{
            cursor: "pointer",
            fontSize: "22px",
            position: "relative",
          }}
          onClick={() => setIsfind(method.id)}
          className={isfind === method.id ? "selected" : ""}
        >
          {method.title}
        </div>
      )),
    [isfind, setIsfind],
  )

  // const { loadingLqh } = useLoginStore((state) => state) // 控制加载是否显示

  return (
    // 父组件
    // spinning 是否为加载中的状态
    // <Loadinglqh tip="修改中..." loading={loadingLqh}>
    <div>
      <div className="mb-[30px]">
        <div className="flex justify-around w-[430px] pb-[6px]">{PhoneBackMethodButtons}</div>
      </div>
      <div>
        <div style={{ display: isfind === 0 ? "block" : "none" }}>
          <PhoneBackCom />
        </div>

        <div style={{ display: isfind === 1 ? "block" : "none" }}>
          <EmailretrievalCom />
        </div>
      </div>
    </div>
    // </Loadinglqh>
  )
}

export default RegisterheaderLqh
