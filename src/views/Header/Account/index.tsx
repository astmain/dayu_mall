import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { useGlobalStore } from "@store/global"
import { useUserStore } from "@store/user"
import type { MenuProps } from "antd"
import { Dropdown, message, Space } from "antd"
import { useTranslation } from "react-i18next"

import { LoginOutData } from "@/network/api/login"
import { wait } from "@/utils/wait"

// import { cs } from '@/utils'
import AccountStyle from "./index.module.scss"

function Account() {
  const changeIndex = useGlobalStore((state) => state.changeIndex)

  // 个人中心切换变量
  const { setIsInformation } = usePersonalcenterStore((state) => state)

  // 引入全局控制加载变量--把布尔值注入进去和控制加载标题的变量
  // const { setLoadingLqh, setTipTitleLqh } = useLoginStore((state) => state)

  const { setIsMerchant } = useMerchantcenterStoreStore((state) => state)

  // 密码登录的变量全局控制加载变量--把布尔值注入进去和控制加载标题的变量
  const { setIsLoginPwdreg, setLoadingLqh, setTipTitleLqh } = useLoginStore((state) => state)

  const { t } = useTranslation()
  const navigate = useNavigate()
  const listArr = [
    { icon: "dingdan", label: "myorder", path: "/order" },
    { icon: "qianbao", label: "mywallet", path: "/wallet" },
    { icon: "renzheng2", label: "merchant", path: "/merchantcenter" },
    { icon: "zhanghao", label: "personal", path: "/personalcenter" },
    { icon: "shoucang", label: "myfavorite", path: "/home/favorite" },
    { icon: "shanghu", label: "myworks", path: "/merchantcenter" },
  ]

  // setToken
  const { resetUser, token, userInfo } = useUserStore((state) => state)

  // 退出登录
  const logOut = async () => {
    setLoadingLqh(true)
    setTipTitleLqh("正在退出...")
    const startTime = Date.now()
    // 退出接口
    try {
      const res: any = await LoginOutData()
      if (res.code == 200) {
        const endTime = Date.now()
        const waitTime = endTime - startTime
        if (waitTime < 3000) {
          await wait(3000 - waitTime) //
        }
        setLoadingLqh(false) //关闭加载
        // 提示用户退出成功
        message.success("退出成功")
        // 退出成功应该回到登录页跳转到登录页面
        // navigate("/login")
      } else {
        // 提示用户登出失败
        message.error(res.message)
      }
    } catch (error) {
      console.log(error, "退出失败情况")
    } finally {
      resetUser()
      // 原先代码跳回首页
      // navigate("/")
      // lqh-3.17改为退出成功跳回登录页
      navigate("/login")
      // 然后显示密码登录才对,而不是显示验证码登录
      setIsLoginPwdreg(0)
      setLoadingLqh(false) //关闭加载
    }
  }

  // const navigateTo = (path: string) => {
  //   console.log(path, "path")

  //   changeIndex(-1)
  //   navigate(path, { replace: true })
  //   console.log("TCL: navigateTo -> path", path)
  // }

  const navigateTo = (path: string, label: string) => {
    changeIndex(-1)
    navigate(path, { replace: true })

    // 新增代码
    if (path == "/personalcenter") {
      // 切回当前个人信息页
      setIsInformation(0)
    }
    // 新增代码--判断点击我上传的作品-跳到商户中心--我上传的作品页面-- // 点其他的跳回商户中心--商户首页页面
    setIsMerchant(label == "myworks" ? 1 : 0)
  }

  const listStyle = {
    display: "flex",
    cursor: "pointer",
    fontWeight: 400,
    fontSize: "16px",
    padding: "0 5px",
    lineHeight: "40px",
    // margin: '0 20px',
  }
  const itemsList: MenuProps["items"] = listArr.map((item, index) => {
    return {
      key: index + 1,
      style: { padding: "3px 12px" },
      label: (
        <div
          key={index}
          className={AccountStyle.listitem}
          style={listStyle}
          onClick={() => navigateTo(item.path, item.label)}
        >
          <i className={"iconfont icon-" + item.icon} style={{ color: "#999999", fontSize: "18px" }}></i>
          <div style={{ marginLeft: "6px", color: "#222222" }}>{t("header.account." + item.label)}</div>
        </div>
      ),
    }
  })
  itemsList.push({
    key: 221,
    style: { padding: "3px 12px" },
    label: (
      <div className={AccountStyle.listitem} style={listStyle} onClick={logOut}>
        <i className="iconfont icon-tuichu" style={{ color: "#999999", fontSize: "18px" }}></i>
        <div style={{ marginLeft: "6px", color: "#222222" }}>{t("header.account.logout")}</div>
      </div>
    ),
  })

  const [isOpen, setIsOpen] = useState(false)
  const onStatusChange = (open: boolean) => {
    setIsOpen(open)
  }

  const handleLogin = () => {
    navigate("/login")
    // 然后显示密码登录才对,而不是显示验证码登录
    setIsLoginPwdreg(0)
    // setToken("8756670000000")
    // // 执行登录逻辑（假设已登录
    // const from = location?.state?.from?.pathname || "/" // 如果没有来源路径则重定向到首页
    // navigate(from, { replace: true })
  }
  if (token) {
    return (
      <Dropdown menu={{ items: itemsList }} placement="bottomRight" arrow onOpenChange={onStatusChange}>
        <a onClick={(e) => e.preventDefault()} className=" w-[122px]  cursor-pointer " style={{ color: "#000" }}>
          <Space>
            <div className="max-w-[85px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {userInfo?.name}
            </div>
            {isOpen ? <DownOutlined /> : <UpOutlined />}
          </Space>
        </a>
      </Dropdown>
    )
  } else {
    return (
      <div className={AccountStyle.tologin} onClick={handleLogin}>
        {t("login.btn")}
      </div>
    )
  }
}

export default Account
