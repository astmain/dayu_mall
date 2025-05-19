import { request } from "@/network/axios"

import {
  GetBindPhoneNumberData,
  GetBindPhoneNumberLoginData,
  GetCheckLogin,
  GetEmailNumRetrievalData,
  GetEmailNumRetrievalUpdateData,
  GetLoginData,
  GetMobilePhoneRetrieval,
  GetMobilePhoneRetrievalUpdateData,
  GetRegistrationData,
  GetRegistrationEemailData,
  getSetpasswordData,
  GetVerificationCodeBindPhoneNumber,
  GetVerificationCodeData,
  GetVerificationCodeLogin,
  GetVerificationData,
  GetVerificationEmaliData,
  GetWechatCheckBind,
  GetWechatCodeRegister,
} from "./api-params-moudle"
import {
  BindPhoneNumberRes,
  GetBindPhoneNumberDataRes,
  GetCheckUserLoginRes,
  GetWechatCheckBindRes,
  GetWechatRegDataRes,
  LoginRes,
  RegisterEmailRes,
  RegPhoneRes,
  ResponseTemp,
  RetrieveEmailPasswordRes,
  RetrieveMobileEmailRes,
  RetrieveMobilePhoneRes,
  RetrievePhonePasswordRes,
  SetpasswordRes,
  VerificationCodeBindPhoneNumberRes,
  VerificationCodeLoginRes,
  VerificationCodeRes,
  VerificationEmailRes,
  VerificationRes,
} from "./api-res-model"

/** 这里枚举定义所有接口 */
enum APIS {
  //   登录页--密码登录
  // auth/login
  LoginApi = "user/login",

  // 检查用户是否有多个账号接口 user/check_login
  CheckLoginApi = "user/check_login",

  // 登录页--微信扫码注册 wechat/register
  wechatRegApi = "wechat/register",

  // 登录页--微信检查是否绑定 wechat/check_bind
  wechatCheckBindApi = "wechat/check_bind",

  //-------登录页--验证码登录--接口代码系列
  //登录页--验证码登录--获取验证码-----用户
  // VerificationCodeApi = "sms/send",
  //登录页--验证码登录
  VerificationLoginApi = "sms/login",

  // ----------登录页手机注册接口代码系列--------
  // 登录页--手机注册--获取验证码--用户
  // VerificationApi = "sms/send",
  VerificationApi = "sms/send",

  // 登录页--手机注册--用户
  // RegisterApi = "auth/register",
  RegisterApi = "sms/register",

  // ---------登录页邮箱注册接口代码系列---------
  // 登录页--邮箱注册--获取验证码--用户
  VerificationEmailApi = "sms/sendemail",

  // 登录页--邮箱注册--用户
  RegisterEmailApi = "auth/registeremail",

  // -----登录页--忘记密码接口代码系列-----
  // 忘记密码--用手机找回--获取验证码--
  // MobilePhoneRetrievalApi = "sms/send",

  // 忘记密码--用手机找回--确认修改--/sms/change_password
  MobilePhoneRetrievalUpdateApi = "sms/change_password",

  // 忘记密码--用邮箱找回--获取验证码--GetEmailNumRetrievalData
  MobileEmailRetrievalApi = "sms/sendemailretrieval",

  //忘记密码--用邮箱找回--确认修改GetEmailNumRetrievalUpdateData
  EmailRetrievalUpdateApi = "auth/forgotupdatepassword",

  // ---登录页--绑定手机号---接口代码系列---------- GetVerificationCodeBindPhoneNumber
  //登录页--绑定手机号--获取验证码接口
  // VerificationBindPhoneNumApi = "sms/sendbindphonenum",

  // 登录页--绑定手机号--绑定手机号并登录接口 GetBindPhoneNumberData
  BindPhoneNumberApi = "wechat/bind",

  // 登录页--绑定手机号--绑定登录接口 GetBindPhoneNumberLoginData
  BindPhoneNumberLoginApi = "wechat/login",

  // 修改密码
  SetpasswordApi = "auth/set_password",

  // 手机号码获取验证手机短信验证码 /get_sms_code
  PhoneVerificationApi = "auth/get_sms_code",

  // 修改用户信息
  UpdateuserApi = "auth/update_user",

  // 退出登录 user/logout
  LogoutApi = "user/logout",

  // 更改密码 /sms/change_password
  // ChangePwdApi = "sms/change_password",
}

// 退出登录 -- logoutApi
export const LoginOutData = () => request.post(APIS.LogoutApi, { userid: 1 })

// 检查用户是否有多个账户 -- CheckLoginApi
export const CheckLoginData = (data: GetCheckLogin) =>
  request.post<ResponseTemp<GetCheckUserLoginRes>>(APIS.CheckLoginApi, data)

// 登录页面--密码登录接口 /** 一个示例 */
export const LoginData = (data: GetLoginData) => request.post<ResponseTemp<LoginRes>>(APIS.LoginApi, data)

// 登录页面--微信扫码注册接口 wechatLoginApi
export const WechatRegData = (data: GetWechatCodeRegister) =>
  request.post<ResponseTemp<GetWechatRegDataRes>>(APIS.wechatRegApi, data)

// 登录页面--微信检查是否绑定接口 wechatCheckBindApi
export const WechatCheckBindData = (data: GetWechatCheckBind) =>
  request.post<ResponseTemp<GetWechatCheckBindRes>>(APIS.wechatCheckBindApi, data)

//登录页面--验证码登录--获取验证码接口 VerificationCodeApi
export const VerificationCodeNum = (data: GetVerificationCodeData) =>
  request.post<VerificationCodeRes>(APIS.VerificationApi, data)

// 登录页面--验证码登录接口
export const VerificationCodeLoginData = (data: GetVerificationCodeLogin) =>
  request.post<ResponseTemp<VerificationCodeLoginRes>>(APIS.VerificationLoginApi, data)

// 登录页面--忘记密码--用手机找回--获取验证码接口 MobilePhoneRetrievalApi
export const MobilePhoneRetrieval = (data: GetMobilePhoneRetrieval) =>
  request.post<RetrieveMobilePhoneRes>(APIS.VerificationApi, data)

// 登录页面--忘记密码--用手机找回--确认修改接口 MobilePhoneRetrievalUpdateApi

export const MobilePhoneRetrievalUpdateData = (data: GetMobilePhoneRetrievalUpdateData) =>
  request.post<ResponseTemp<RetrievePhonePasswordRes>>(APIS.MobilePhoneRetrievalUpdateApi, data)

// 登录页面--忘记密码--用邮箱找回--获取验证码接口 MobileEmailRetrievalApi
export const MobileEmailRetrievalData = (data: GetEmailNumRetrievalData) =>
  request.post<RetrieveMobileEmailRes>(APIS.MobileEmailRetrievalApi, data)

// 登录页面--忘记密码--用邮箱找回--确认修改接口 EmailRetrievalUpdateApi
export const MobileEmailRetrievalUpdateData = (data: GetEmailNumRetrievalUpdateData) =>
  request.post<RetrieveEmailPasswordRes>(APIS.EmailRetrievalUpdateApi, data)

// 登录页面--绑定手机号--获取验证码
//  VerificationBindPhoneNumApi
export const VerificationBindPhoneNumData = (data: GetVerificationCodeBindPhoneNumber) =>
  request.post<ResponseTemp<VerificationCodeBindPhoneNumberRes>>(APIS.VerificationApi, data)

// 登录页--绑定手机号--绑定并登录 BindPhoneNumberApi

export const BindPhoneNumData = (data: GetBindPhoneNumberData) =>
  request.post<ResponseTemp<GetBindPhoneNumberDataRes>>(APIS.BindPhoneNumberApi, data)

// 登录页--绑定手机号--绑定并登录 BindPhoneNumberLoginApi
export const BindLoginPhoneNumData = (data: GetBindPhoneNumberLoginData) =>
  // BindPhoneNumberRes
  request.post<ResponseTemp<BindPhoneNumberRes>>(APIS.BindPhoneNumberLoginApi, data)

// 登录页--手机注册--获取验证码--用户 sms_send
export const Verification = (data: GetVerificationData) => request.post<VerificationRes>(APIS.VerificationApi, data)

// 登录页--手机注册--用户
export const RegisterData = (data: GetRegistrationData) =>
  request.post<ResponseTemp<RegPhoneRes>>(APIS.RegisterApi, data)

// 登录页--邮箱注册--获取验证码--用户
export const VerificationEmail = (data: GetVerificationEmaliData) =>
  request.post<VerificationEmailRes>(APIS.VerificationEmailApi, data)

// 登录页--邮箱注册--用户
export const RegisterEmailData = (data: GetRegistrationEemailData) =>
  request.post<RegisterEmailRes>(APIS.RegisterEmailApi, data)

// 修改密码
export const SetpasswordData = (data: getSetpasswordData) => request.post<SetpasswordRes>(APIS.SetpasswordApi, data)

// 手机号码获取验证手机短信验证码

// 修改用户信息--个人信息
