// import { useGlobalStore } from '@store/global'

import miniProgram from "@assets/miniProgram.png"
import QRcode from "@assets/QRcode.webp"
import { useTranslation } from "react-i18next"

import Copyright from "./copyright"

const FooterXzz = () => {
  const { t } = useTranslation()
  const { currentLanguage } = useLanguageStore()

  const qrCodelist = [
    {
      img: miniProgram,
      text: t("footer.miniProgram"),
    },
    {
      img: QRcode,
      text: t("footer.follow"),
    },
  ]
  return (
    <>
      <div className="w-full ">
        <div className="block py-[20px] sm:flex mt-[20px] justify-between items-center h-[200px] bg-white box-border border-t border-[#f5f5f5] px-[20px]">
          <div className=" flex  justify-between gap-[20px]">
            <div className="flex flex-col text-left h-[160px]">
              <div className=" text-[24px] text-[#3D3D3D] mb-[10px]">{t("footer.contact")}</div>
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center">
                  <i className="iconfont icon-youxiang  text-[#1A1A1A]" style={{ fontSize: "20px" }}></i>
                  <div className="text-[18px] text-[#767676] ml-[14px]">821538987@qq.com</div>
                </div>
                <div className="flex items-center">
                  <i className="iconfont icon-shouji  text-[#1A1A1A]" style={{ fontSize: "20px" }}></i>
                  <div className="text-[18px] text-[#767676] ml-[14px]">+86 183 5957 9888</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-left h-[160px]">
              <div className="text-left text-[24px] text-[#3D3D3D] font-normal mb-[10px]">{t("footer.service")}</div>
              <div className="text-[18px] text-[#767676] cursor-pointer">{t("footer.material")}</div>
            </div>
          </div>
          <div className="  flex items-center justify-between lg:gap-[120px] md:gap-[60px] hidden sm:flex">
            {qrCodelist.map((item, index) => (
              <div className="flex flex-col items-center" key={index}>
                <img src={item.img} alt="" className="w-[130px] h-[130px]" />
                <div
                  className="text-[#767676]"
                  style={{ fontSize: currentLanguage === "en" ? "12px" : "18px", lineHeight: "27px" }}
                >
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Copyright />
      </div>
    </>
  )
}
export default FooterXzz
