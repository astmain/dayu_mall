import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import "./index.scss"

import { Navigation, Virtual } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import img1 from "@/assets/model/model-1.jpg"
import img2 from "@/assets/model/model-2.jpg"
import img3 from "@/assets/model/model-3.jpg"
import img4 from "@/assets/model/model-4.jpg"
import img5 from "@/assets/model/model-5.jpg"
import img6 from "@/assets/model/model-6.jpg"

const images = [img1, img2, img3, img4, img5, img6]

const Image = () => {
  const [currentImg, setCurrentImg] = useState(images[0])
  return (
    <div className="w-full">
      <div className="h-[590px]  bg-[#F5F5F5]  rounded-[20px]  overflow-hidden">
        <img src={currentImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-full m-[10px_0] flex justify-center ">
        <div className="w-full model-detail-swiper">
          <Swiper
            spaceBetween={10}
            slidesPerView={5}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={1800}
            loop={true}
            navigation={true}
            modules={[Navigation, Virtual]}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index} onClick={() => setCurrentImg(item)}>
                <img src={item} alt="" className="h-[100%] w-[100%] rounded-[10px] cursor-pointer shadow-md" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Image
