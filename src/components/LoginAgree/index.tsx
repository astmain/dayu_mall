import ModalLqh2 from "../ModalLqh2"
// import ModalXzz from "../ModalXzz"

interface AgreeProps {
  // onCheckboxChange: (e: any) => void
}

// eslint-disable-next-line react/prop-types
const LoginAgreeLqh: React.FC<AgreeProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [modalContent, setModalContent] = useState('')

  const openAgreement = () => {
    setIsModalOpen(true)
    // setModalContent(content)
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="flex">
          <span className="text-[16px]">登录即同意</span>
          <span className="text-[16px] text-[#1366F0] cursor-pointer" onClick={openAgreement}>
            《大宇3D用户注册协议和隐私政策》
          </span>
        </div>
      </div>
      {/* <ModalXzz zIndex={2222} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} showClose={true}> */}
      {/* {modalContent} */}
      {/* <div>内容</div>
      </ModalXzz> */}
      {/* 用lqh封装的弹框 */}
      <ModalLqh2
        width="w-[830px] rounded-[20px]"
        open={isModalOpen}
        title=""
        closable={true} //显示右上角关闭按钮 />
        onCancel={() => setIsModalOpen(false)}
        classname="custom-modal-loginxieyi"
        onOk={() => setIsModalOpen(false)}
        content={<div className="w-[350px] h-[20vh] pl-[11px]">内容</div>}
      ></ModalLqh2>
    </>
  )
}

export default LoginAgreeLqh
