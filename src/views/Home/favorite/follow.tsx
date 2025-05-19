import avatar from "@/assets/miniProgram.png"
import img1 from "@/assets/model/model-1.jpg"
import img2 from "@/assets/model/model-2.jpg"
import img3 from "@/assets/model/model-3.jpg"
import DividerXzz from "@/components/divider"

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const mockList = new Array(21).fill(0).map((_item, index) => {
  return {
    avatar,
    username: `DAYU-3D-${index}`,
    age: randomInt(18, 30),
    gender: index % 2 == 0 ? "女" : "男",
    works: randomInt(100, 1000),
    followers: randomInt(10, 200),
    gallery: [img1, img2, img3],
  }
})

console.log("xzz2021: mockList", mockList)
const Follow = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4  2xl:grid-cols-5  gap-5 ">
        {mockList.map((item, index) => (
          <div
            key={index}
            className=" flex  flex-col items-center bg-[#fff] rounded-[15px] border border-1 border-[#DCDCDC] p-[10px]"
          >
            <img
              src={item.avatar}
              alt=""
              className="w-[100px] h-[100px] rounded-[50%] m-[10px_0] cursor-pointer"
              onClick={() => {
                navigate(`/home/author?id=` + randomInt(1, 1000))
              }}
            />
            <div className="text-[16px] font-bold">{item.username}</div>
            <div className="text-[14px] text-[#999999] flex gap-[10px] m-[10px_0]">
              <div>年龄{item.age}岁</div>
              <div>性别{item.gender}</div>
            </div>
            <DividerXzz marginY="10px" />
            <div className="text-[18px] text-[#222] flex gap-[20px] items-center m-[10px_0]">
              <div>作品{item.works}</div>
              <div>粉丝{item.followers}</div>
            </div>
            <div className="grid grid-cols-3 gap-[10px]">
              {item.gallery.map((img, index) => (
                <img
                  src={img}
                  alt=""
                  className=" h-[76px]  rounded-[10px] cursor-pointer"
                  key={index}
                  onClick={() => {
                    navigate(`/home/model?id=` + randomInt(1, 1000))
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Follow
