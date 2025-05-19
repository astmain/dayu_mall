import type { GetProp, UploadFile, UploadProps } from "antd"
import { Image, message, Upload } from "antd"

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const UploadLqh = ({ UploadTitleInfo }: { UploadTitleInfo: { title: string } }) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList)
  // 限制上传格式 & 大小
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("仅支持 JPG/PNG 格式!")
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("图片大小不能超过 2MB!")
      return false
    }
    return true
  }

  return (
    <div>
      <div className="flex w-[245px] ">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple={false}
          className={fileList.length == 0 ? "custom-upload-geren" : "custom-upload-geren custom-upload-geren-none"}
          beforeUpload={beforeUpload}
        >
          <div
            style={{
              width: "245px",
              height: "36px",
              backgroundColor: "#000000",
              marginTop: 8,
              color: "#ffffff",
              borderRadius: "0px 0px 10px 10px",
              opacity: "0.2",
              fontSize: "16px",
              bottom: "0",
              lineHeight: "36px",
              paddingLeft: "5px",
              position: "relative",
              top: "54px",
            }}
          >
            {UploadTitleInfo.title}
          </div>
        </Upload>
      </div>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  )
}

export default UploadLqh
