/**文档说明
 * @Description: 接口返回值类型声明文档
 * @author liuJie
 * @Email 1547698569@qq.com
 * @date 2022/1/13 11:35
 */

/** 定义基本的接口返回体  每个业务 公司可能定义的后端返回体不一样 这里大都需要修改*/
export interface resBaseInfo<DataModel> {
  rsCode: string
  rsCause: string
  data: DataModel
}

export interface BaseRes<DataModel> {
  data: DataModel
}

/** 一个示例 表示返回 */
export interface GetCityTotalNumberModel {
  city: string
  peoplesOfLogin: number
}

// 假设后端返回的登录值类型
export interface GetLoginData {
  accountNumber: string
  password: string
}

// 假设后端返回的检查用户是否有多个账号返回的数据类型
// export interface GetCheckUserLogin<T> {
//   data: T
//   code: number
//   message: string
// }

export interface GetCheckUserLoginRes {
  user_type: number
  username: string
  phone: string
}

// 假设后端返回的微信注册值类型
// export interface GetWechatRegData<T> {
//   // openid: string
//   // sessionKey: string
//   // unionid: string
//   data: T
//   code: number
//   message: string
// }

export interface GetWechatRegDataRes {
  // data里面的数据
  access_token: string
  email: string
  name: string
  openid: string
}

// // 假设后端返回的微信检查绑定GetWechatCheckBindRes
// export interface GetWechatCheckBindData<T> {
//   data: T
//   code: number
//   message: string
// }

// GetWechatCheckBindRes
export interface GetWechatCheckBindRes {
  id: number
  email: string
  name: string
  openid: boolean
  phone: string
  token: string
}
export type GetCityTotal = GetCityTotalNumberModel[]

// 假设这是后端返回的登录页--密码登录值类型-------------
export interface ResponseTemp<T> {
  code: number
  data: T
  message: string
}
export interface LoginRes {
  id: number
  token: string //token
  name: string //用户名
  email: string //邮箱
  phone: string //手机号
}

// --------登录页--验证码登录接口代码系列-------------
export interface VerificationCodeLoginRes {
  code: string //验证码
  id: number
  phone: string
  token: string
  name: string
  email: string
}

// VerificationCodeLoginRes

// 假设这是后端返回的验证码登录的获取验证码数据类型
export interface VerificationCodeRes {
  msg: string
  successful: boolean
  data: any
}
// -------------登录页--忘记密码--用手机找回接口代码系列--------
// 假设这是后端返回的忘记密码用手机找回的获取验证码数据类型
export interface RetrieveMobilePhoneRes {
  msg: string
  successful: boolean
  data: any
}

export interface RetrievePhonePasswordRes {
  code: string
  id: number
  phone: string | null
}

// -------------登录页--忘记密码--用邮箱找回接口代码系列--------
// 假设这是后端返回的忘记密码用邮箱找回的获取验证码数据类型
export interface RetrieveMobileEmailRes {
  msg: string
  successful: boolean
  data: any
}

// 假设这是后端返回的忘记密码用邮箱找回的确认修改密码的数据类型
export interface RetrieveEmailPasswordRes {
  msg: string
  successful: boolean
  data: any
}

// ---------登录页--绑定手机号---接口代码系列---------
// 假设这是后端返回的绑定手机号--获取验证码的数据类型
// export interface VerificationCodeBindPhoneNumberData<T> {
//   message: string
//   code: number
//   data: T
// }

export interface VerificationCodeBindPhoneNumberRes {
  BizId: string
  RequestId: string
}
// 假设这是后端返回的绑定手机号--绑定手机号的数据类型
// export interface GetBindPhoneNumData<T> {
//   code: number
//   data: T
//   message: string
// }

// GetBindPhoneNumberDataRes
export interface GetBindPhoneNumberDataRes {
  id: number
  token: string //token
  name: string //name
  phone: string //phone
  email: string //邮箱
}
// 绑定手机登录数据--后端返回的数据字段
// export interface BindPhoneNumberData<T> {
//   code: number
//   message: string
//   data: T
// }

export interface BindPhoneNumberRes {
  code: number
  message: string
}

// ----------------登录页--手机注册接口代码系列-------------
// 获取登录页--手机注册验证码后端返回回来的数据类型
// export interface VerificationRes {
//   msg: string
//   successful: boolean
//   data: any
// }
export interface VerificationRes {
  msg: string
  successful: boolean
  data: any
}

// 假设后端返回的登录页--手机注册类型数据 RegisterRes
// export interface RegisterRes<T> {
//   code: number
//   message: string
//   data: T
// }

export interface RegPhoneRes {
  token: string //token
  name: string //用户名
}

// --------------登录页邮箱注册接口代码系列-------------------------
// 假设后端返回的登录页--邮箱注册类型数据 --RegisterEmailRes
export interface RegisterEmailRes {
  msg: string
  successful: boolean
  data: any
}
// 假设后端返回的登录页--邮箱注册验证码后端返回回来的数据类型
export interface VerificationEmailRes {
  msg: string
  successful: boolean
  data: any
}

// 假设后端返回的修改密码类型数据
export interface SetpasswordRes {
  msg: string
  successful: boolean
  user_info: any
  token: string
}

// 假设后端返回的通过手机号码获取验证手机短信验证类型数据
export interface PhoneVerificationRes {
  msg: string
  successful: boolean
  user_info: any
}
