// import { PlusOutlined } from "@ant-design/icons"
// import { Button, Form, Input, Radio, Space, Upload } from "antd"

// import ModalXzz2 from "@/components/ModalXzz2"

// import LoginStyle from "./index.module.scss"
// import Bindphonenumber from "./Bindphonenumber"
// import ChangePasswordCom from "./ChangepasswordCom"

// // 引入头部切换组件
// import LoginHeader from "./loginHeader"
// import WechatloginCom from "./WechatloginCom"

// const getBase64 = (file: Blob) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = (error) => reject(error)
//   })

function LoginModal() {
  // 文件列表模拟已有图片链接数组

  // const [isModalOpen, setIsModalOpen] = useState(false)

  // isModalOpenSuccess

  // const setIsPwdLogin = useLoginStore((state) => state.setIsPwdLogin)
  // const showModal = () => {
  //   setIsModalOpen(true)
  // }
  // const handleOk = () => {
  //   setIsModalOpen(false)
  // }

  // const handleCancel = () => {
  //   // 关闭
  //   setIsModalOpen(false)
  //   // 切换到密码登录页
  //   setCurrentComponent("login")
  //   // setIsPwdLogin(0)
  // }

  // const [isPwdLogin, setIsPwdLogin] = useState(true)

  // const { currentComponent } = useLoginStore((state) => {
  //   return state
  // })

  // const { setCurrentComponent } = useLoginStore((state) => {
  //   return state
  // })

  // const getComponent = () => {
  //   let currentCom = <></>
  //   switch (currentComponent) {
  //     case "login":
  //       currentCom = <LoginHeader></LoginHeader>
  //       break
  //     case "resetpwd":
  //       currentCom = <ChangePasswordCom></ChangePasswordCom>
  //       break
  //     case "bindPhoneNum":
  //       currentCom = <Bindphonenumber></Bindphonenumber>
  //       break
  //     case "wechatLogin":
  //       currentCom = <WechatloginCom></WechatloginCom>
  //       break

  //     // case 'cancel':
  //     //   currentCom = <LoginHeader></LoginHeader>
  //     //   break

  //     default:
  //       break
  //   }
  //   return currentCom
  // }

  return (
    // 根节点
    <div>
      {/* <Button type="primary" style={{ marginRight: "20px" }} onClick={showModal}>
        打开弹窗
      </Button> */}
      {/* <Button type="primary" onClick={RequestArefundbtn}>
        申请退款
      </Button> */}

      {/* <Modal width={550} height={630} title="" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel}> */}
      {/* {getComponent()} */}
      {/* <i className={'iconfont icon-shouji'}></i> */}

      {/* 微信扫码div */}
      <div>{/* <WechatloginCom></WechatloginCom> */}</div>
      {/* 更改密码 */}

      <div>{/* <ChangePasswordCom></ChangePasswordCom> */}</div>

      {/* 绑定手机号 */}
      <div>{/* <Bindphonenumber></Bindphonenumber> */}</div>
      {/* </Modal> */}
    </div>
  )
}

export default LoginModal
