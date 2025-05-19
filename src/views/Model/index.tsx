import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Image, Input, message, Row, Select, Space, Upload } from "antd"
import { RcFile, UploadProps } from "antd/es/upload/interface"
import React, { useState } from "react"

import NumberInput from "@/components/NumberInput"

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
interface UploadFile {
  uid: string
  name: string
  // status?: UploadFileStatus // 注意：这是严格的类型
  url?: string
  // 其他字段省略
  thumbUrl?: string
}

// const { Option } = Select

const { TextArea } = Input
function ModelLqh() {
  console.log("====================================================")

  const [previewOpen, setPreviewOpen] = useState(false)

  const [previewImage, setPreviewImage] = useState("")

  // 文件列表模拟已有图片链接数组
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "",
      name: "",
      // status: "done",
      url: "",
      thumbUrl: "",
    },
  ])

  // 数量

  const [scanningQuantity, setScanningQuantity] = useState(2)

  const onNumberChange = (value: number) => {
    console.log("TCL: onNumberChange -> value", value)

    setScanningQuantity(value)
  }

  // 传选择单位参数和填长宽高的数值+单位传给后端

  const [selectUnit, setSelectUnit] = useState("cm")

  // 选择单位
  const handleChangeSelect = (value: string) => {
    console.log(typeof value)
    console.log(selectUnit, "selectUnit")

    setSelectUnit(value)
  }

  // 按钮数据
  const modelingDescriptionBtnList = [
    {
      title: "产品信息",
    },
    {
      title: "性能要求",
    },
    {
      title: "生产需求",
    },
  ]

  // 请选择单位列表数据
  const unitList = [
    {
      value: "cm",
      label: "cm",
    },
    {
      value: "mm",
      label: "mm",
    },
  ]

  // 管理选中的数据
  const [chooseIndex, setChooseIndex] = useState(0)

  const modelingDescriptionBtn = (index: number, title: string) => {
    if (!chooseText.includes(title)) {
      setChooseIndex(index)

      setChooseText((chooseText) => chooseText + "\n" + title)
    } else {
      message.open({
        type: "error",
        content: `${title} 已经存在，不能重复添加！`,
      })
    }
  }

  const [chooseText, setChooseText] = useState("")
  const changeTextArea = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setChooseText(e.target.value)
  }

  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log("Form values:", values)
  }

  const modelingTypeList = [
    {
      id: 1,
      label: "建模类型1",
      value: "modelingType1",
    },
    {
      id: 2,
      label: "建模类型2",
      value: "modelingType2",
    },
    {
      id: 3,
      label: "建模类型3",
      value: "modelingType3",
    },
  ]

  // 数据格式数据
  const dataformatList = [
    {
      id: 1,
      label: "IGS",
      value: "igs",
    },
    {
      id: 2,
      label: "STL",
      value: "stl",
    },
  ]

  // 材料类型数据
  const materialTypeList = [
    { id: 1, name: "材料1" },
    { id: 2, name: "材料2" },
  ]
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
  }
  // 处理文件上传的变化
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList as UploadFile[]) // 类型断言为 UploadFile[]
    // console.log(newFileList, "newFileList新图片数据") //thumbUrl
    // setuploadImg(newFileList)
  }

  const uploadButton = (
    <button className="border-0 bg-[none]" type="button">
      <PlusOutlined />
      <div className="mt-[8px]">Upload</div>
    </button>
  )
  // 限制文件格式和大小
  const beforeUpload = (file: RcFile) => {
    const isValidFormat =
      file.type === "video/mp4" ||
      file.type === "audio/mp3" ||
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      file.type === "image/gif" ||
      file.type === "image/bmp"
    if (!isValidFormat) {
      message.error(`${file.name} 格式不支持！`)
    }

    const isLt10MB = file.size / 1024 / 1024 < 10 // 限制文件小于 10MB
    if (!isLt10MB) {
      message.error(`${file.name} 文件大小超过10MB限制！`)
    }

    return isValidFormat && isLt10MB // 符合条件的文件才能上传
  }

  const { Option } = Select

  // 管理选中的建模类型数据
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ismodelingType, setismodelingType] = useState("")

  const hangleChange = (e: any) => {
    // 把选中的建模类型数据给到ismodelingType
    setismodelingType(e)

    setFormData({
      ...formData,
    })
  }
  // 管理数据格式数据
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isdataformatList, setisdataformatList] = useState("")
  // dataformat
  const changedataformatList = (e: any) => {
    setisdataformatList(e)
    setFormData({
      ...formData,
    })
  }

  // 管理材料类型数据 ChangeMaterial
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModelingType, setIsmodelingType] = useState("")

  const ChangeMaterial = (e: any) => {
    setIsmodelingType(e)
    setFormData({
      ...formData,
    })
  }
  // 处理表单字段变化
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 管理表单其他字段的数据
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState({
    // 选择建模--传给form表单
    modelingCategory: "",
    // 选择数据格式
    dataformatList: "",
    // 选择材料类型
    ModelingType: "",
    // 长
    longNum: "",
    // 宽
    widthNum: "",
    // 高
    heightNum: "",
  })

  // 提交数据
  const submitConfirm = () => {
    // modelingCategory
    // form.setFieldsValue({
    //   modelingCategory: "technology", // 设置 username 字段的值
    // })
    const uploadArr: any = []
    // 把要上传的图片链接取出来,然后放在数组里面，传给后端
    fileList.map((item) => {
      uploadArr.push(item.thumbUrl)
    })

    const completeData = {
      // 建模类型
      modelingCategory: ismodelingType,
      // 数据格式
      dataformatList: isdataformatList,
      // 选择材料类型
      ModelingType: isModelingType,

      // 产品尺寸
      productSize: {
        longNum: formData.longNum + selectUnit,
        widthNum: formData.widthNum + selectUnit,
        heightNum: formData.heightNum + selectUnit,
      },
      // 建模描述
      modelingDescriptionObj: {
        modelingDescriptionText: chooseText,
      },
      // 传上传附件:
      upLoadImgSrc: {
        FileList: uploadArr,
      },
      // 数量
      Scanningquantity: {
        scanningQuantity: scanningQuantity,
      },
      // 其他其他字段
      //...formData,

      // productSize
      // 其他其他字段
      //...formData,
    }

    //  // 把completeData数据参数提交给后端接口
    // const params = completeData
    // console.log(params)

    console.log(completeData, "form提交数据")

    // console.log("提交订单")
  }

  return (
    <div>
      <div className="bg-[#ffffff] rounded-[20px] border border-[#dcdcdc] mt-[30px] mb-[51px] pt-[30px] pl-[30px] 2xl:w-[1200px] xl:w-[78vw] lg:w-[75vw] md:w-[70vw] sm:w-[65vw]">
        <Form
          form={form}
          onFinish={onFinish}
          name="basic"
          style={{
            maxWidth: 1200,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label={<span className="text-[20px] text-[#222222]">建模类型</span>}
            name="modelingCategory"
            className="model-entry-custom-select w-[654px] text-[20px] text-left leading-[56px]"
            rules={[
              {
                required: true,
                message: "请选择建模类型",
              },
            ]}
          >
            <div className="sm:w-48 md:w-64 lg:w-96 xl:w-128 2xl:w-[654px]">
              <Select
                allowClear
                className="text-left text-[18px] h-[56px]"
                showSearch={true}
                placeholder="请选择建模类型"
                onChange={hangleChange}
              >
                {modelingTypeList.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className="text-[20px] text-[#222222]">数据格式</span>}
            name="gender"
            className="model-entry-custom-select w-[654px] text-[20px] text-left leading-[56px]"
            rules={[
              {
                required: true,
                message: "请选择数据格式",
              },
            ]}
          >
            <div className="sm:w-48 md:w-64 lg:w-96 xl:w-128 2xl:w-[654px]">
              <Select
                className="text-left text-[18px] h-[56px]"
                allowClear
                placeholder="请选择数据格式"
                onChange={changedataformatList}
              >
                {dataformatList.map((item, index) => {
                  return (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className="text-[20px] text-[#222222]">材料类型</span>}
            name="cailiaoleixing"
            className="model-entry-custom-select w-[654px] text-[20px] text-left leading-[56px]"
            rules={[
              {
                required: true,
                message: "请选择材料类型",
              },
            ]}
          >
            <div className="sm:w-48 md:w-64 lg:w-96 xl:w-128 2xl:w-[654px]">
              <Select
                className="text-left text-[18px] h-[56px]"
                showSearch={true}
                allowClear
                placeholder="请选择材料类型"
                onChange={ChangeMaterial}
              >
                {materialTypeList.map((item, index) => {
                  return (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className="text-[20px] text-[#222222]">产品尺寸</span>}
            name="productSize"
            className="custom-select text-left leading-[56px]"
            rules={[
              {
                required: true,
                message: "请输入长",
              },
            ]}
          >
            <div>
              <Input
                onChange={handleInputChange}
                addonBefore="长"
                className="model-entry-custom-input mb-[10px] mr-[20px]  sm:w-[34%] md:w-[20%] lg:w-[15%] xl:w-[15%] 2xl:w-[20%]"
                classNames={{ input: "h-[56px] text-[18px]" }}
                value={formData.longNum}
                id="longNum"
                name="longNum"
              />
              <Input
                onChange={handleInputChange}
                addonBefore="宽"
                className="model-entry-custom-input mr-[20px] sm:w-[34%] md:w-[20%] lg:w-[15%] xl:w-[15%] 2xl:w-[20%]"
                classNames={{ input: "h-[56px] text-[18px]" }}
                value={formData.widthNum}
                id="widthNum"
                name="widthNum"
              />
              <Input
                onChange={handleInputChange}
                addonBefore="高"
                className="model-entry-custom-input mr-[20px] sm:w-[34%] md:w-[20%] lg:w-[15%] xl:w-[15%] 2xl:w-[20%]"
                classNames={{ input: "h-[56px] text-[18px]" }}
                value={formData.heightNum}
                id="heightNum"
                name="heightNum"
              />

              {/* 改成选泽 cm和mm */}

              <Space wrap>
                <Select
                  onChange={handleChangeSelect}
                  className="w-[120px]"
                  allowClear
                  placeholder="请选择单位"
                  defaultValue={"cm"}
                >
                  {unitList.map((item, index) => {
                    return (
                      <Option key={index} value={item.value}>
                        {item.label}
                      </Option>
                    )
                  })}
                </Select>
              </Space>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className="text-[20px] text-[#222222]">建模描述</span>}
            name="rememberMs"
            className="text-left"
            rules={[
              {
                required: true,
                message: "请选择建模描述",
              },
            ]}
          >
            <div className="bg-[#fff] rounded-[10px] border border-[#dcdcdc] 2xl:w-[1020px] xl:w-[97%] lg:w-[97%] md:w-[97%] sm:w-[97%]">
              <div className="flex justify-start border-b border-[#dcdcdc]">
                <div className="ml-[19px] mr-[20px] mt-[21px] text-[14px] text-[#999999] mb-[20px]">
                  <span>选择插入</span>
                </div>

                <div className="flex flex-wrap mt-[13px]">
                  {modelingDescriptionBtnList.map((item, index) => {
                    return (
                      <div key={index} className="mr-[20px] text-[#999999]">
                        <Button
                          color={modelingDescriptionBtnList[chooseIndex] == item ? "primary" : undefined}
                          variant="dashed"
                          className="text-[14px] mb-[10px] h-[36px] rounded-[18px]"
                          style={{
                            color: modelingDescriptionBtnList[chooseIndex] == item ? "#1677ff" : "#999999",
                          }}
                          onClick={() => modelingDescriptionBtn(index, item.title)}
                        >
                          {item.title}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="m-[20px]">
                <TextArea
                  rows={4}
                  value={chooseText}
                  placeholder="请输入详细的建模需求描述（例如：性能要求、产品具体形状等...）"
                  onChange={changeTextArea}
                />
              </div>
            </div>
          </Form.Item>

          <Form.Item label={<span className="text-[20px] text-[#222222]">上传附件</span>} name="attachment">
            <Row>
              <div className="flex flex-col justify-end ml-[17px] text-[16px] text-[#dcdcdc] text-left">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={beforeUpload}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </Row>
          </Form.Item>

          <Form.Item name="num">
            <div className="flex justify-end items-center 2xl:w-[1168px] xl:w-[100%] lg:w-[95%] md:w-[90%] sm:w-[85%]">
              <div className="text-[18px] text-[#222222]">
                <span>数量:</span>
              </div>

              <Space className="mr-[30px] text-[18px] h-[42px] 2xl:w-[10%] xl:w-[10%] lg:w-[14%] sm:w-[27%]">
                <NumberInput defaultValue={2} onChange={onNumberChange} />
              </Space>

              <div className="w-[150px] h-[56px] rounded-[8px] leading-[56px] text-[18px] text-[#ffffff] mr-[30px] mt-[-7px]">
                <Button
                  type="primary"
                  className="w-[150px] h-[56px] text-[18px]"
                  htmlType="submit"
                  onClick={submitConfirm}
                >
                  提交订单
                </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ModelLqh
