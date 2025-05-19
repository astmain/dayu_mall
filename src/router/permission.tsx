import { useUserStore } from "@store/user"
import { Navigate } from "react-router-dom"

interface RouterBeforeEachProps {
  children: React.ReactNode
  meta?: any
}

export const RouterBeforeEach: React.FC<RouterBeforeEachProps> = ({ children, meta }) => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) // 滚动到顶部
  }, [location.pathname])

  const { token } = useUserStore()

  const notNeedPermission = !(meta?.permission || false) // 模拟需要权限
  if (token || notNeedPermission) {
    return <>{children}</>
  }

  return <Navigate to="/login" state={{ from: location }} />
}
