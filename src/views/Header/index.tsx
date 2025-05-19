import { useTranslation } from "react-i18next"

// import useLocalStorage from "@/hooks/useLocalStorage"
import Account from "./Account"
import Cart from "./Cart"
import HeaderStyle from "./index.module.scss"

function HeaderXzz() {
  const location = useLocation()

  const navigate = useNavigate()
  // const { itemIndex, changeIndex } = useGlobalStore((state) => state)
  const { currentNavigation, changeNavigation } = useNavigationStore((state) => state)
  // console.log("TCL: HeaderXzz -> itemIndex", itemIndex)
  // const [itemIndex, changeIndex] = useLocalStorage("menuIndex", -1)
  useEffect(() => {
    changeNavigation(location.pathname)
  }, [changeNavigation, location.pathname])
  const { t, i18n } = useTranslation()

  interface Item {
    label: string
    path: string
  }
  const items = [
    { label: "commodity", path: "/home" },
    { label: "print", path: "/print" },
    { label: "scan", path: "/scan" },
    { label: "modeling", path: "/model" },
    // { label: "cnc", path: "/cnc" },
    // { label: "lamination", path: "/lamination" },
    { label: "about", path: "/about" },
  ]

  const changeItem = (item: Item) => {
    if (location.pathname === item.path) return
    changeNavigation(item.path)
    navigate(item.path)
  }
  return (
    <div className={HeaderStyle.header}>
      <div className={HeaderStyle.leftbox}>
        <div
          className={HeaderStyle.logo}
          onClick={() => changeItem({ label: "home", path: "/" })}
          style={{ cursor: "pointer" }}
        >
          DAYU 3D
        </div>
        <div className={HeaderStyle.allitem}>
          {items.map((item, index) => {
            return (
              <div
                className={`${HeaderStyle.eachitem} ${currentNavigation === item.path ? HeaderStyle.active : ""}`}
                style={{ fontSize: i18n.language === "en" ? "14px" : "18px" }}
                key={index}
                onClick={() => changeItem(item)}
              >
                {t("header.menu." + item.label)}
              </div>
            )
          })}
        </div>
      </div>
      <div className={HeaderStyle.rightbox}>
        <Cart />
        <Account />
      </div>
    </div>
  )
}

export default HeaderXzz
