import LoginAgree from "@/components/LoginAgree"
import { useWxLogin } from "@/hooks/useWxLogin"

// 引入微信扫码注册接口
// import { WechatRegData } from "@/network/api/login/index"

function WechatLoginLqh() {
  // const [code, setCode] = useState<string | null>(null)
  // const navigate = useNavigate()
  // const location = useLocation()

  // const [messageApi, contextHolder] = message.useMessage()
  // // const imgBaseUrl = "http://yun3d.com/frontend/public/test/"
  // const { setToken, setUserInfo } = useUserStore((state) => state)
  useWxLogin()
  // 声明一个变量用来获取微信Code
  // const [wechatCode, setWechatCode] = useState(null)
  const { setCurrentComponent } = useLoginStore((state) => {
    return state
  })

  return (
    <div>
      <div>
        <div className="text-[22px] text-center text-[#222222] font-normal mb-[30px]">
          <span>微信扫码登录/注册</span>
        </div>

        <div className="w-[346px] h-[346px] mx-auto mb-[30px] pt-[30px]" style={{ border: "1px solid #dcdcdc" }}>
          <div id="weixinLogin" className="flex justify-center items-center"></div>
        </div>

        <div className="text-center mb-[56px]">
          <span className="cursor-pointer text-[#1366f0] text-[18px]" onClick={() => setCurrentComponent("login")}>
            账号密码登录
          </span>
        </div>

        <div className="text-center text-[16px]">
          <LoginAgree />
        </div>
      </div>
    </div>
  )
}

export default WechatLoginLqh
