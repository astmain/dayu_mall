/**文档说明
 * @Description: 接口传入参数类型声明文档
 * @author liuJie
 * @Email 1547698569@qq.com
 * @date 2022/1/13 11:35
 */

// import { OrderStatusType, OrderTypeType } from "@/views/order/common"

// 登录页---密码登录代码系列------------------
// 定义密码登录参数getLoginData
export interface GetLoginData {
  username: string
  password: string
}
// 定义更改密码登录参数
// export interface UpdatePasswordData {
//   phone: string
//   code: string
//   password: string
// }

// 退出没有参数不用写

// 检查用户是否有多个账号接口api/user/check_login
export interface GetCheckLogin {
  username: string
}

// 登录页--微信扫码注册登录系列----------------
// 定义微信扫码注册系列
export interface GetWechatCodeRegister {
  code: string
}
// 定义检查微信是否绑定过 GetWechatCheckBind
export interface GetWechatCheckBind {
  openid: string | null
}

// 登录页--绑定手机号接口代码系列-----------------------------
// 定义获取验证码--绑定手机号
export interface GetVerificationCodeBindPhoneNumber {
  // prefix: string //86参数
  phone: string //手机号参数
  // sms_type: "register" | "login" | "reset_password" | "change_phone"
  // sms_conf_id: number
}
// 定义绑定手机号
export interface GetBindPhoneNumberData {
  openid: string //微信openid
  name: string //账户名参数
  phone: string //手机号参数
  code: string //验证码
  password: string //新绑定的密码
  // prefix: string //86参数
}

// 定义绑定手机号--绑定登录
export interface GetBindPhoneNumberLoginData {
  openid: string //微信openid
}

// ---登录页--验证码登录接口代码系列--------------
// 定义获取验证码登录参数 Verification code login
export interface GetVerificationCodeLogin {
  phone: string //手机号
  code: string //验证码
  // prefix: string //+86或+87
}

// 定义获取验证码登录--获取验证码参数
export interface GetVerificationCodeData {
  // prefix: string
  phone: string
  sms_type: "register" | "login" | "reset_password" | "change_phone"
  // sms_conf_id: number
}

// ---登录页--忘记密码--用手机找回接口代码系列---------------
// 定义获取验证码用手机找回参数
export interface GetMobilePhoneRetrieval {
  // prefix: string
  phone: string
  sms_type: "register" | "login" | "reset_password" | "change_phone"
  // sms_conf_id: number
}
// 定义登录页-忘记密码-用手机找回参数
export interface GetMobilePhoneRetrievalUpdateData {
  // prefix: string //86
  phone: string
  code: string //验证码参数
  password: string //新密码
}

// ------登录页--忘记密码--用邮箱找回接口代码系列--------------------
// 定义获取验证码用邮箱找回参数
export interface GetEmailNumRetrievalData {
  email: string //邮箱参数
  sms_type: "register" | "login" | "reset_password" | "change_phone"
  sms_conf_id: number
}
// 定义登录页--忘记密码--用邮箱找回参数
export interface GetEmailNumRetrievalUpdateData {
  email: string //邮箱参数
  EmailRetrievalCode: string //验证码参数
  newpassword: string //新密码
}

// ------------登录页手机注册手机注册接口代码系列------------
// 定义获取-登录页-手机注册用户参数 GetRegistrationData
export interface GetRegistrationData {
  name: string //账号名
  code: string //验证码
  phone: string //电话号
  password: number //密码
}

// 定义获取-手机注册--获取验证码参数 GetVerificationData
export interface GetVerificationData {
  // prefix: string
  phone: string
  sms_type: "register" | "login" | "reset_password" | "change_phone"
  sms_conf_id: number
}

// --------------登录页邮箱注册接口代码系列--------------
// 定义获取--邮箱注册--用户参数
export interface GetRegistrationEemailData {
  name: string //账户名
  dayu_phone_email: string //邮箱号码
  login: string //验证码
  registerPassword: string //邮箱注册密码
}

// 定义获取--邮箱注册--获取验证码参数
export interface GetVerificationEmaliData {
  email: string
  sms_type: "register" | "login" | "reset_password" | "change_phone"
  sms_conf_id: number
}

// 修改密码参数 getSetpasswordData

export interface getSetpasswordData {
  phone: string
  Verification_code: string
  new_password: string
  old_password: string
  prefixPwd: string
}

// 通过手机号码获取验证手机短信验证码参数

export interface getPhoneVerificationParams {
  phone: string
  // sms_type: string
}

// 定义修改用户信息 获取参数phone
