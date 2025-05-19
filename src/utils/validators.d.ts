declare module "@/utils/validators" {
  /**
   * Validate password strength and length
   * @param value Password to validate
   * @returns Promise resolving if valid, rejecting with error message if invalid
   */
  export function validatePassword(value: string): Promise<void>

  /**
   * Validate phone number format
   * @param value Phone number to validate
   * @returns Promise resolving if valid, rejecting with error message if invalid
   */
  export function validatePhoneNumber(value: string): Promise<void>

  /**
   * Validate verification code format
   * @param value Verification code to validate
   * @returns Promise resolving if valid, rejecting with error message if invalid
   */
  export function validateVerificationCode(value: string): Promise<void>

  // 3.22:lqh添加验证邮箱和银行账号验证身份证号统一社会信用代码
  export function emailNumberChange(value: string): Promise<void>
  // 证件号码
  export function validateIDCard(value: string): Promise<void>

  // 统一社会信用代码
  export function validateUSCI(value: string): Promise<void>
  // 开户行账号
  export function openingbankaccountNumberChange(value: string): Promise<void>

  // 授权子账号
  export function validateAuthorizedAccountNum(value: string): Promise<void>

  // 手机账号
  export function validatePhoneNumberlqh(value: string): Promise<void>

  // 真实姓名--提现
  export function validateRealname(value: string): Promise<void>

  // 收款账号--提现
  export function validateAccountnumber(value: string): Promise<void>

  // 我的钱包--设置支付密码8-12位
  export function validatetransactionSetPaymentPwd(value: string): Promise<void>

  // 我的钱包--对公转账--验证银行账号

  export function validateVerificationBankAccountNumber(value: string): Promise<void>
}
