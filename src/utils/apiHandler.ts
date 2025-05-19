// 引入登录接口

import { message } from "antd"

// 引入验证码登录接口和获取验证码接口
import { LoginData, VerificationCodeLoginData } from "@/network/api/login"
import { LoginRes } from "@/network/api/login/api-res-model"

interface ValuesBtype {
  username: string //账号名
  password: string
}

interface ValuesCtype {
  phone: string
  code: string
}

export const loginHandler = async (
  data: ValuesCtype | ValuesBtype,
  setLoading: (loading: boolean) => void,
  handler: (data: LoginRes) => void,
  isCode = false,
) => {
  try {
    const startTime = Date.now()
    const res = isCode ? await LoginData(data as ValuesBtype) : await VerificationCodeLoginData(data as ValuesCtype)
    if (res.code == 200) {
      // 验证码登录成功,设定用户信息和token--清空表单--
      const { data, message: msg } = res
      console.log(msg)

      setTimeout(() => {
        // 提示用户登录成功
        message.success("登录成功,正在进入首页")
      }, 3000)
      handler(data)

      const endTime = Date.now()
      const waitTime = endTime - startTime
      if (waitTime < 3000) {
        setTimeout(
          () => setLoading(false), //关闭加载
          3000 - waitTime,
        )
      }
    } else {
      message.error(res?.message)
    }
  } catch (error) {
    console.log(error, "错误的情况")
  } finally {
    setLoading(false)
  }
}
