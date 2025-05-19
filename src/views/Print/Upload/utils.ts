import { RcFile } from "antd/es/upload/interface"

export const calculateFileHash = async (file: File) => {
  if (!file) return

  const arrayBuffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer)

  // 转为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}
export const uploadSlice: any = async (file: RcFile, currentIndex = 0, uploadId: string) => {
  const sliceSize = 1024 * 1024 * 2 // 每片大小2MB
  const start = currentIndex * sliceSize
  const end = Math.min(start + sliceSize, file.size)
  const totalSlices = Math.ceil(file.size / sliceSize) // 总片数
  const blob = file.slice(start, end)
  const formData = new FormData()
  formData.append("uploadId", uploadId)
  formData.append("code", uploadId)
  formData.append("file", blob)
  formData.append("chunkNumber", currentIndex + "")
  formData.append("totalChunks", totalSlices + "")
  formData.append("fileName", file.name)
  const token: string | null = localStorage.getItem("token")
  const response = await fetch("/api/product_drawing/upload", {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  })
  const res = await response.json()
  if (res?.result?.code === 200) {
    console.log("上传分片:" + currentIndex + "/" + totalSlices)
    currentIndex++
    if (currentIndex < totalSlices) {
      return await uploadSlice(file, currentIndex, uploadId)
    } else {
      return response
      // alert('文件上传且合并成功!');
      const resEnd = await response.json()
      // console.log("🚀 ~ xzz: res", res)
      return resEnd
    }
  } else {
    // ElMessage.error("上传模型失败,请重新尝试!")
    throw new Error("上传分片数据失败")
  }
}
