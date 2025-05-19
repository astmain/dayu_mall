import { useTranslation } from "react-i18next"

const Copyright = () => {
  const { currentLanguage, changeLanguage } = useLanguageStore()
  const { t, i18n } = useTranslation()
  const onLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
    changeLanguage(lang)
  }
  const languageList = [
    {
      label: "简体中文",
      value: "zh",
    },
    {
      label: "繁体中文",
      value: "tw",
    },
    {
      label: "English (US)",
      value: "en",
    },
  ]
  return (
    <div className="block sm:flex  justify-between items-center h-[80px] sm:h-[50px] bg-[#333] w-full px-[20px] box-border py-[10px] sm:py-[0px]">
      <div style={{ fontSize: currentLanguage === "en" ? "12px" : "14px" }} className="text-[#999999] ">
        {t("footer.copyright")} © {t("footer.company")}
      </div>
      <div className="flex gap-[10px] text-[#fff] text-[14px] justify-center">
        {languageList.map((item) => (
          <div
            className={`cursor-pointer ${currentLanguage === item.value ? "text-[#fff]" : "text-[#999999]"}`}
            key={item.value}
            onClick={() => onLanguageChange(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="text-[#fff] text-[14px]">{t("footer.support")}</div>
    </div>
  )
}

export default Copyright
