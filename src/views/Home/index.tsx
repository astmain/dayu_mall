import SearchMain from "@/components/searchBar/index"

// import XzzBtn from "@/components/XzzBtn"
// import useCountdown from "@/hooks/useCountdown"
import ModelMain from "./components/model"
import SwiperXzz from "./components/swiper"

function Home() {
  // const { remainingTime, startCountdown } = useCountdown(60, "countdown")

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SwiperXzz />
      {/* <XzzBtn onClick={startCountdown} disabled={remainingTime > 0} className="text-2xl font-bold text-red-500 ">
        <div>{remainingTime || "获取验证码"}</div>
      </XzzBtn> */}

      <div className="">
        <SearchMain />
        <ModelMain />
      </div>
    </div>
  )
}

export default Home
