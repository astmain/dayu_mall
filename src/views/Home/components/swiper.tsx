// Import Swiper React components
// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/autoplay"
import "./index.scss"

// import "swiper/css/parallax"
import { Autoplay, Navigation, Virtual } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import banner1 from "@/assets/home/banner-1.jpg"
import banner2 from "@/assets/home/banner-2.jpg"
import banner3 from "@/assets/home/banner-3.jpg"
const bannerList = [banner1, banner2, banner3, banner1, banner2, banner3]
const SwiperXzz = () => {
  return (
    <div style={{ width: "100%", margin: "30px 0" }} className="home-swiper">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.5}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1800}
        loop={true}
        navigation={true}
        modules={[Autoplay, Navigation, Virtual]}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        allowSlideNext={true} // 允许在动画未完成时切换到下一张
        allowSlidePrev={true} // 允许在动画未完成时切换到上一张
      >
        {bannerList.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt="" className="h-[100%] w-[100%] rounded-[16px]  cursor-pointer" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default SwiperXzz
