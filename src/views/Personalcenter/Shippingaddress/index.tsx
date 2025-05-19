import ListLqh from "@/components/addressInfo/list"

function Shippingaddresslqh() {
  const { openEditModal } = useConsigneeStore((state) => state)

  return (
    <div>
      <div className="w-[920px] h-[677px] p-[30px] border border-[#dcdcdc] rounded-[10px]">
        <div className="flex justify-between mb-[22px]">
          <div className="text-[20px] text-[#222222]">
            <span>收货地址</span>
          </div>
          <div className="text-[16px] text-[#1366F0] cursor-pointer" onClick={openEditModal}>
            <span>+新建收货地址</span>
          </div>
        </div>
        <ListLqh />
      </div>
    </div>
  )
}

export default Shippingaddresslqh
