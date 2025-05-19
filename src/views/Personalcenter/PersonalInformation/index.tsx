import { Button, DatePicker, Form, Input, message, Radio, Space } from "antd"
import dayjs from "dayjs"
import { useState } from "react"

import { UpdateUserInfoApi } from "@/network/api/user"
import { UpdateUserInfoData } from "@/network/api/user/type"
// 邮箱校验
import { emailNumberChange } from "@/utils/validators"

function PersonalInformationLqh() {
  // 生日变量
  const [birthday, setBirthday] = useState("")

  const onChangeDate = (_date: any, dateString: any) => {
    // 选完日期然后把日期的值给声明的生日变量
    setBirthday(dateString)
  }
  const [form] = Form.useForm()

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }

  // 年月格式
  const dateFormat = "YYYY/MM/DD"

  const [value, setValue] = useState(1)

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value)
    setValue(e.target.value)
  }

  const { setIsInformation } = usePersonalcenterStore((state) => state)

  // 验证邮箱

  // 获取用户信息   初始化展示
  const userInfo = useUserStore((state) => state.userInfo)

  useEffect(() => {
    const { phone, name, email, birthday, gender } = userInfo
    form.setFieldsValue({
      phone: phone,
      name: name,
      email: email,
      birthday: birthday,
      gender: gender,
    })
  }, [])

  const onFinish = async (data: UpdateUserInfoData) => {
    const res = await UpdateUserInfoApi({ ...data, id: userInfo.id, birthday })
    console.log("✨ 🍰 ✨ xzz2021: onFinish -> res", res)
    if (res?.code == 200) {
      message.success("修改成功")
    }
  }

  return (
    <div className="h-[100%] w-[920px] bg-[#ffffff] rounded-[10px] border border-[#dcdcdc] pt-[30px] pl-[30px] pb-[30px] pr-[30px] flex flex-col max-w-[920px] 2xl:w-[100%] xl:w-[98%] lg:w-[97%] md:w-[94%] sm:w-[100%]">
      <div className="text-left  text-[#222222] mb-[30px] 2xl: text-[20px] xl: text-[18px]">
        <span>个人信息</span>
      </div>
      <div>
        <div className="flex text-left relative">
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 6 }}
            className="2xl:w-[41%] xl:w-[46%] lg: w-[65%] md: w-[67%]"
            form={form}
          >
            <Form.Item
              label={
                <span className="text-[18px] text-[#666666] 2xl:text-[18px]  xl:text-[18px]  lg:text-[18px]  md:text-[14px]  sm:text-[0.70rem]">
                  手机号
                </span>
              }
              name="phone"
              className="leading-[56px]"
              rules={[
                {
                  required: true,
                  message: "请输入手机号",
                },
                {
                  validator: (_, value) => {
                    const is11 = value.replaceAll(" ", "") // 校验11位手机号
                    if (!/^1[3456789]\d{9}$/.test(is11)) {
                      return Promise.reject(new Error("电话号码无效"))
                    }
                    return Promise.resolve()
                  },
                },
              ]}
            >
              <Input
                className="h-[56px] text-[18px] text-[#dcdcdc] 2xl:w-[250px]  xl:w-[16.34vw] lg:w-[21.34vw] md:w-[19.34vw] sm:w-[17.34vw] h-[30px]"
                placeholder="请输入手机号"
                disabled
                maxLength={11}
                onChange={(e) => form.setFieldValue("phone", e.target.value.replaceAll(" ", ""))}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-[18px] text-[#666666] 2xl:text-[18px]  xl:text-[18px]  lg:text-[18px]  md:text-[14px]  sm:text-[0.70rem]">
                  账号名
                </span>
              }
              name="name"
              className="leading-[56px]"
              rules={[
                {
                  required: true,
                  message: "请输入账号名",
                },
              ]}
            >
              <Input
                className="h-[56px] text-[18px] text-[#dcdcdc] 2xl:w-[250px] xl:w-[16.34vw] lg:w-[21.34vw] md:w-[19.34vw] sm:w-[17.34vw]"
                placeholder="请输入账号名"
                onChange={(e) => form.setFieldValue("name", e.target.value.replaceAll(" ", ""))}
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-[18px] text-[#666666] 2xl:text-[18px]  xl:text-[18px]  lg:text-[18px]  md:text-[14px]  sm:text-[0.70rem]">
                  邮箱
                </span>
              }
              name="email"
              required
              className="leading-[56px]"
              rules={[
                {
                  validator: (_, value) => emailNumberChange(value),
                },
              ]}
            >
              <Input
                className="h-[56px] text-[18px] text-[#dcdcdc] 2xl:w-[250px] xl:w-[16.34vw] lg:w-[21.34vw] md:w-[19.34vw] sm:w-[17.34vw] text-[16px]"
                placeholder="请输入邮箱"
                maxLength={255}
                onChange={(e) => form.setFieldValue("email", e.target.value.replaceAll(" ", ""))}
              />
            </Form.Item>

            <Form.Item
              className="leading-[56px]"
              label={
                <span className="text-[18px] text-[#666666] 2xl:text-[18px]  xl:text-[18px]  lg:text-[18px]  md:text-[14px]  sm:text-[0.70rem]">
                  生日
                </span>
              }
              name="birthday"
            >
              <Space direction="vertical" size={12}>
                <DatePicker
                  onChange={onChangeDate}
                  className="custom-datepicker-placeholderBrithday text-[18px] h-[56px] text-[#dcdcdc] 2xl:w-[250px] xl:w-[16.34vw] lg:w-[21.34vw] md:w-[19.34vw] sm:w-[17.34vw]"
                  defaultValue={birthday ? dayjs(birthday, dateFormat) : ""}
                  placeholder="请选择生日"
                />
              </Space>
            </Form.Item>

            <Form.Item
              label={
                <span className="text-[18px] text-[#666666] 2xl:text-[18px]  xl:text-[18px]  lg:text-[18px]  md:text-[14px]  sm:text-[0.70rem]">
                  性别
                </span>
              }
              name="gender"
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio className="text-[18px] text-[#222222]" value="male">
                  男
                </Radio>

                <Radio className="text-[18px] text-[#222222]" value="female">
                  女
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <div className="flex w-[920px] max-w-[1200px] 2xl:w-[920px] justify-center xl: w-[50vw] lg: w-[48.7vw] md:w-[47vw] sm:w-[40vw]">
                <Button className="w-[160px] h-[56px] text-[18px]" type="primary" htmlType="submit">
                  保存
                </Button>
              </div>
            </Form.Item>
          </Form>

          <div className="flex justify-center items-center h-[56px] md: flex-wrap">
            <p className="2xl:text-[16px] xl:text-[16px]">
              点击
              <span className="text-[#1366F0] cursor-pointer" onClick={() => setIsInformation(8)}>
                账号安全
              </span>
              修改手机号
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInformationLqh
