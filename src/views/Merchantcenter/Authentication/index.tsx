import { Button } from "antd"

const imgUrl = import.meta.env.VITE_API_IMG_BASE_URL

function AuthenticationLqh() {
  const navigate = useNavigate()

  return (
    <div className="w-[100%] pt-[30px]">
      <div className="mb-[50px]">
        <div className="flex w-[1665px] mx-auto">
          <div onClick={() => navigate("/merchantcenter")} className="cursor-pointer flex justify-start items-center">
            <div className="flex justify-center items-center">
              <img className="w-[11px] h-[20px] mr-[10px]" src={imgUrl + "backleft.png"} alt="" />
            </div>
            <div>
              <span className="text-[18px] text-[#999999]">返回</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-[94px]">
          <div className="text-[32px] text-[#222222] mb-[9px]">
            <span>认证中心</span>
          </div>

          <div className="text-[#999999] text-[16px]">
            <p>【个人认证】与【企业认证】只能选其中一种认证</p>
          </div>
        </div>

        <div className="flex justify-center items-center mb-[120px]">
          <div className="w-[300px] h-[388px] bg-[#f5f5f5] rounded-[20px] mr-[50px] pt-[30px] flex justify-center">
            <div className="mb-[20px]">
              <div className="mb-[20px] flex justify-center">
                <img className="w-[92px]" src={imgUrl + "gerenrenzheng1.png"} alt="" />
              </div>

              <div className="text-[22px] text-[#222222] mb-[24px]">
                <p>个人认证</p>
              </div>

              <div className="w-[237px] font-normal text-[16px] text-[#666666] mb-[29px]">
                <p>适用于个人用户:请使用您的身份 证件(如身份证、护照等)完成认 证，验证个人身份。</p>
              </div>

              <div>
                <Button
                  onClick={() => navigate("/merchantcenter/personalauthentication")}
                  className="w-[130px] h-[56px] text-[18px]"
                  type="primary"
                >
                  去认证
                </Button>
              </div>
            </div>
          </div>

          <div className="w-[300px] h-[388px] bg-[#f5f5f5] rounded-[20px] flex justify-center pt-[30px]">
            <div className="mb-[30px]">
              <div className="mb-[20px] flex justify-center">
                <img className="w-[92px]" src={imgUrl + "qiyerenz2.png"} alt="" />
              </div>

              <div className="text-[22px] text-[#222222] mb-[24px]">
                <p>企业认证</p>
              </div>

              <div className="w-[237px] font-normal text-[16px] text-[#666666] mb-[29px]">
                <p>适用于企业、机构或组织:请提供 官方注册证明文件进行认证，确 认企业或机构身份。</p>
              </div>

              <div>
                <Button
                  onClick={() => navigate("/merchantcenter/enterprisecertification")}
                  className="w-[130px] h-[56px] text-[18px]"
                  type="primary"
                >
                  去认证
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationLqh
