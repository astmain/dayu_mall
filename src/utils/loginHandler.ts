// 引入登录接口

import { message } from "antd"

// 引入验证码登录接口和获取验证码接口
import { LoginData, VerificationCodeLoginData } from "@/network/api/login"
import { LoginRes } from "@/network/api/login/api-res-model"

import { wait } from "./wait"
interface ValuesAType {
  phone: string
  verificationCode: string
}
interface ValuesBtype {
  username: string //账号名
  password: string
}

interface ValuesCtype {
  phone: string
  code: string
}

export const loginHandler = async (
  values: ValuesAType | ValuesBtype,
  setLoading: (loading: boolean) => void,
  handler: (data: LoginRes) => void,
  isCode = false,
) => {
  console.log("Finish:", values)
  setLoading(true) // 开始加载
  const startTime = Date.now()
  // 传验证码登录表单参数给后端--status状态成功200 关闭弹框
  let data: ValuesBtype | ValuesCtype
  if ("phone" in values) {
    const { phone, verificationCode } = values
    data = {
      phone,
      code: verificationCode,
    }
  } else {
    const { username, password } = values
    data = {
      username,
      password,
    }
  }
  try {
    const res = isCode ? await LoginData(data as ValuesBtype) : await VerificationCodeLoginData(data as ValuesCtype)
    if (res.code == 200) {
      // 验证码登录成功,设定用户信息和token--清空表单--
      const { data, message: msg } = res
      console.log(msg)

      // 提示用户登录成功--自己封装的提示组件
      message.success("登录成功,正在进入首页")

      const endTime = Date.now()
      const waitTime = endTime - startTime
      if (waitTime < 3000) {
        await wait(3000 - waitTime) //
      }

      setLoading(false), //关闭加载
        handler(data)
    } else {
      // 提示用户登录失败
      message.error(res?.message)
    }
  } catch (error) {
    console.log(error, "错误的情况")
  } finally {
    setLoading(false)
  }
}
