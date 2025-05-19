const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

import EmptyLqh from "@/components/Emptylqh"
function ChooseaccountLqh() {
  //登录用户列表--路由传参的数据
  const userList = [
    {
      user_type: "手机用户",
      username: "15375957593",
      phone: "15375957593",
      imgSrc: imgUrl + "wechatpay.png",
      imgJtSrc: imgUrl + "jtright2.png",
    },
    {
      imgSrc: imgUrl + "wechatpay.png",
      imgJtSrc: imgUrl + "jtright2.png",
      user_type: "微信用户",
      username: "lqh",
      phone: "15375957593",
    },
  ]
  // 数据不存在的情况,跳回密码登录页
  console.log(userList)

  const userListBtn = (value: any) => {
    console.log(value, "value")
    // 传对应的参数调用login接口,调用成功跳转到首页
  }

  return (
    <div className="m-[30px]">
      <div className="text-left mb-[20px] text-[22px] text-[#222222]">
        <p>请选择登录账号类型</p>
      </div>
      <div className="w-[346px]">
        <div className="flex flex-col gap-[20px]">
          {userList.length > 0 && (
            <div className="flex flex-col gap-[20px]">
              {userList.map((item, index) => (
                <div
                  onClick={() => userListBtn(item)}
                  key={index}
                  className="hover:bg-[rgba(224,224,224,0.5)]  cursor-pointer"
                >
                  <div className="flex pt-[5px] pl-[5px]">
                    <div>
                      <img className="w-[56px] h-[56px]" src={item.imgSrc} alt="" />
                    </div>

                    <div
                      className="ml-[21px]  text-left w-[100%] flex justify-between pb-[11px]"
                      style={{ borderBottom: index === userList.length - 1 ? "none" : "1px solid #F5F5F5" }}
                    >
                      <div className="mt-[6px]">
                        <p className="text-[18px] text-[#222222]">{item.username}</p>
                        <p className="text-[14px] text-[#999999]">{item.user_type}</p>
                      </div>
                      <div className="text-[20px] w-[20px] flex justify-center items-center">
                        <img src={item.imgJtSrc} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* 数据为空--暂无账单信息 */}
          {userList.length == 0 && <EmptyLqh description="暂无用户信息" />}
        </div>
      </div>
    </div>
  )
}

export default ChooseaccountLqh
