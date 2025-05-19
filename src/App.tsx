import "dayjs/locale/zh-cn"

// import { ConfigProvider } from "antd"
import { ConfigProvider } from "antd"
// 引入loading加载
import { Spin } from "antd"
import zhCN from "antd/locale/zh_CN"
// 这个是全局的页面 还可以做一些其他的操作
import { AnimatePresence, motion } from "framer-motion"
import { Outlet } from "react-router-dom"

import Footer from "@/views/Footer"
import Header from "@/views/Header"
// import HeaderMobile from "@/views/HeaderMobile"

// import useDevice from "./hooks/useDevice"

// import XzzLoading from "./components/XzzLoading"
const excludePath = ["/order"]
export default function App() {
  const { loadingLqh, tipTitleLqh } = useLoginStore((state) => state)
  // const isMobile = useDevice()
  // useEffect(() => {}, [])
  // const nodeRef = useRef(null)
  const location = useLocation()
  // console.log("TCL: App -> location", location)

  // 页面过渡动画设置
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.8,
    },
  }
  return (
    <ConfigProvider locale={zhCN}>
      {/* <AntdApp> */}
      {/* ✅ 这是 AntD 的上下文 App 包裹 */}
      <div className="max-w-[1800px] mx-auto ">
        {/* {isMobile ? <HeaderMobile /> : <Header />} */}
        <Header />
        {/* 引入全局加载效果 */}
        <Spin tip={tipTitleLqh} spinning={loadingLqh}>
          {/* popLayout */}
          <AnimatePresence mode="wait">
            <div>
              <motion.div
                key={location.key}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.6 }}
                style={{ minHeight: "calc(100vh - 320px)" }}
                className="flex justify-center items-center px-[10px]"
              >
                <Outlet />
              </motion.div>
            </div>
          </AnimatePresence>
        </Spin>
        {excludePath.includes(location.pathname) || <Footer />}
        {/* <XzzLoading title={""} /> */}
      </div>
      {/* </AntdApp> */}
    </ConfigProvider>
  )
}
