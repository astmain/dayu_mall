import { Button } from "antd"
import { useState } from "react"

import ModalLqh2 from "@/components/ModalLqh2"
import { DeRegisterApi } from "@/network/api/user"
import { useUserStore } from "@/store/user"

const Deregister = () => {
  const { userInfo, resetUser } = useUserStore((state) => state)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const confirm = async () => {
    console.log("确认注销账号--调用注销账号接口")
    const res = await DeRegisterApi({ id: userInfo.id })
    console.log("✨ 🍰 ✨ xzz2021: res", res)
    if (res.code === 200) {
      // 注销成功关闭弹框
      setIsOpen(false)
      // 注销成功后重置用户信息
      resetUser()
      // 跳转到登录页面
      navigate("/login")
    }
  }
  return (
    <>
      <div className="mt-[auto]">
        <span className="text-[#999999] text-[14px] cursor-pointer" onClick={() => setIsOpen(true)}>
          注销账号
        </span>
      </div>
      <ModalLqh2
        width="920px 2xl:w-[100vw] xl:w-[72vw] lg:w-[72vw] md:w-[90vw] sm:w-[93vw]"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        title="注销账号"
        classname="custom-modal-grenzx"
        closable={false} //不显示右上角关闭按钮 />
        content={
          <div className="p-[30px] w-[100%] h-[498px]  flex justify-center items-center flex-col max-w-[920px] 2xl:w-[100vw] xl:w-[72vw] lg:w-[72vw] md:w-[90vw] sm:w-[93vw]">
            <div className="w-[100%] max-w-[660px] text-[20px] text-[#222222]">
              <p>
                在您即将离开的时刻，我们想提醒您，注销账号将永久删除您的所有信息和
                历史记录。如您确定需要注销，请继续操作。如您有任何疑问或顾虑，随时 联系我们的客服支持。
              </p>
            </div>

            <div className="mt-[auto]">
              <Button onClick={() => setIsOpen(false)} className="w-[160px] h-[56px] text-[20px] mr-[20px]">
                取消
              </Button>
              <Button onClick={confirm} type="primary" className="w-[160px] h-[56px] text-[20px] mr-[20px]">
                确认注销
              </Button>
            </div>
          </div>
        }
      />
    </>
  )
}

export default Deregister
