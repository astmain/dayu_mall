import Deregister from "./deregister"
import PasswordOperation from "./password"
import PhoneOperation from "./phone"
function AccountsecurityLqh() {
  return (
    <div className="w-[920px] h-[677px] bg-[#fff] rounded-[10px] border border-[#dcdcdc] p-[30px] flex flex-col max-w-[920px] 2xl:w-[920px] xl:w-[65vw] lg:w-[58vw] md:w-[56vw] sm:w-[53vw]">
      <div className="text-left text-[20px]">
        <span>账号安全</span>
      </div>

      <PhoneOperation />

      <PasswordOperation />

      <PasswordOperation isPay={true} />

      <Deregister />
    </div>
  )
}

export default AccountsecurityLqh
