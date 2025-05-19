/**
 * Validation utility functions for form inputs
 */

/**
 * Validate password strength and length
 * @param value Password to validate
 * @returns Promise resolving if valid, rejecting with error message if invalid
 */
export const validatePassword = (value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("请输入新密码"))
  }

  if (value.length < 6 || value.length > 12) {
    return Promise.reject(new Error("密码必须为 6-12 个字符！"))
  }

  return Promise.resolve()
}

/**
 * Validate phone number format
 * @param value Phone number to validate
 * @returns Promise resolving if valid, rejecting with error message if invalid
 */
export const validatePhoneNumber = (value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("请输入手机号!"))
  }
  // 验证手机号格式 (中国大陆手机号)
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return Promise.reject(new Error("电话号码无效"))
  }
  return Promise.resolve()
}

/**
 * Validate verification code format
 * @param value Verification code to validate
 * @returns Promise resolving if valid, rejecting with error message if invalid
 */
export const validateVerificationCode = (value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("请输入6位数验证码"))
  }
  // 去除空格
  const trimmedValue = value.trim()
  if (!/^[0-9]{6}$/.test(trimmedValue)) {
    return Promise.reject(new Error("验证码必须是6位数字"))
  }
  return Promise.resolve()
}

//lqh:添加一个邮箱校验方法---------------------
// 验证邮箱
export const emailNumberChange = (value: string): Promise<void> => {
  // setEmailNumber(value)

  if (!value) {
    return Promise.reject(new Error("请输入邮箱!")) // 如果输入为空，返回错误提示
  }
  const emailReg = value.replaceAll(" ", "")
  // 验证邮箱格式
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailReg)) {
    return Promise.reject(new Error("邮箱格式不正确!"))
  }
  return Promise.resolve() // 验证通过
}

//手机账号和邮箱账号
// 手机账号
export const validatePhoneNumberlqh = (value: string): Promise<void> => {
  if (!value) {
    return Promise.reject(new Error("请输入手机账号!"))
  }
  // 验证手机号格式 (中国大陆手机号)
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return Promise.reject(new Error("手机账号无效"))
  }
  return Promise.resolve()
}

// 邮箱账号--邮箱登录还没有--这段代码先不用
// export const emailNumberChangelqh = (value: string) => {
//   // setEmailNumber(value)

//   if (!value) {
//     return Promise.reject(new Error("请输入邮箱账号!")) // 如果输入为空，返回错误提示
//   }
//   const emailReg = value.replaceAll(" ", "")
//   // 验证邮箱格式
//   if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailReg)) {
//     return Promise.reject(new Error("邮箱账号不正确!"))
//   }
//   return Promise.resolve() // 验证通过
// }

// lqh-3.20-新增--我的钱包--真实姓名
export const validateRealname = (value: string) => {
  if (!value) {
    return Promise.reject(new Error("请输入真实姓名!")) // 如果输入为空，返回错误提示
  }

  if (value?.includes(" ")) {
    return Promise.reject("真实姓名不能包含空格！")
  }
  if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
    return Promise.reject("真实姓名必须是中文")
  }
  return Promise.resolve()
}

// lqh-3.20-新增--我的钱包--收款账号
export const validateAccountnumber = (value: string) => {
  if (!value) {
    return Promise.reject(new Error("请输入收款账号!")) // 如果输入为空，返回错误提示
  }

  // 去除空格
  const trimmedValue = value.replaceAll(" ", "") // 校验11位账号既(手机号)
  console.log(trimmedValue)
  if (!/^1[3456789]\d{9}$/.test(trimmedValue)) {
    return Promise.reject(new Error("收款账号无效"))
  }
  return Promise.resolve()
}

// lqh-3.20-新增--我的钱包--交易密码
// 验证交易密码--默认是登录密码

// lqh-3.20-新增--我的钱包--设置支付密码8-12位
export const validatetransactionSetPaymentPwd = (value: string) => {
  if (!value) {
    return Promise.reject(new Error("请输入新密码"))
  }
  if (value.length < 8 || value.length > 12) {
    return Promise.reject(new Error("密码必须为 8-12 个字符！"))
  }
  return Promise.resolve()
}

// lqh-3.21上午添加我的钱包--对公转账--验证银行账号
export const validateVerificationBankAccountNumber = (value: string) => {
  if (!value) {
    return Promise.reject(new Error("请输入银行账号!")) // 如果输入为空，返回错误提示
  }

  const trimmedValue = value.replaceAll(" ", "")

  if (!/^\d{16,19}$/.test(trimmedValue)) {
    return Promise.reject(new Error("请输入16-19位数字银行账号"))
  }
  return Promise.resolve() // 验证通过
}

// lqh-3.21上午添加我的钱包--对公转账--充值单号还不知道要验证几位先放着

// lqh-3.21上午添加个人中心--公司信息--验证开户行账号

export const openingbankaccountNumberChange = (value: string) => {
  console.log(value)
  if (!value) {
    return Promise.reject(new Error("请输入开户行账号!")) // 如果输入为空，返回错误提示
  }

  const is11 = value.replaceAll(" ", "") // 校验16位-19位银行账号既(银行账号)
  if (!/^\d{16,19}$/.test(is11)) {
    return Promise.reject(new Error("开户行账号必须为 16 到 19 位的数字！"))
  }
  return Promise.resolve() //验证通过
}

// lqh3.22添加个人中心--账号授权--新增账号表单系列验证方法代码
// 验证授权账号
export const validateAuthorizedAccountNum = (value: string) => {
  if (!value) {
    return Promise.reject(new Error("请输入授权子账号"))
  }

  const is11 = value.replaceAll(" ", "") // 校验11位手机号--账号
  if (!/^1[3456789]\d{9}$/.test(is11)) {
    return Promise.reject(new Error("授权子账号无效"))
  }
  return Promise.resolve() //验证通过
}

// lqh-3.22添加商户中心--认证中心--个人认证--证件号码校验和企业认证的身份证号码校验代码

export const validateIDCard = (value: string) => {
  if (!value) {
    return Promise.reject(new Error("请输入身份证号码"))
  }
  const idCardRegex = /^[0-9]{17}[0-9Xx]$/
  if (!idCardRegex.test(value)) {
    return Promise.reject(new Error("身份证号码格式不正确"))
  }
  return Promise.resolve() //验证通过
}

// 企业认证--校验统一社会信用代码

export const validateUSCI = (value: string) => {
  if (!value) {
    return Promise.reject(new Error("请输入统一社会信用代码"))
  }
  const usciRegex = /^[0-9A-Z]{18}$/
  if (!usciRegex.test(value)) {
    return Promise.reject(new Error("社会信用代码必须是 18 位大写字母和数字"))
  }
  return Promise.resolve() //验证通过
}
