// import { useRouteError } from 'react-router-dom'
import { useGlobalStore } from "@store/global"
import { useTranslation } from "react-i18next"

import NotFoundStyle from "./404.module.scss"

export default function Page404() {
  // const error = useRouteError()
  // console.log('TCL: ErrorPage -> error', error)
  const { t } = useTranslation()

  const navigate = useNavigate()
  const changeIndex = useGlobalStore((state) => state.changeIndex)
  const handleGoBack = () => {
    navigate("/", { replace: true })
    changeIndex(-1)
  }
  return (
    <div
      id="error-page"
      style={{ minHeight: "calc(-320px + 100vh)", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className={NotFoundStyle.errorContent}>
        <h1 className={NotFoundStyle.errorCode}>404!</h1>
        <p className={NotFoundStyle.errorMessage}>{t("error.notfound")}</p>
        <p className={NotFoundStyle.errorDescription}>{t("error.404")}</p>
        <button className={NotFoundStyle.backHomeButton} onClick={handleGoBack}>
          {t("error.backhome")}
        </button>
        <div>
          <button className={NotFoundStyle.backHomeButton} onClick={() => navigate("/test", { replace: true })}>
            测试页
          </button>
        </div>
      </div>
    </div>
  )
}
