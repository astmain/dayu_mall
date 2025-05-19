import React, { useState } from "react"

import Pre3d from "../Previewer"

const DragAndDropUpload: React.FC = () => {
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragging(true)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setDragging(false)

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const uploadedFiles = event.dataTransfer.files
      setFile(uploadedFiles[0]) // 设置文件状态
      console.log("文件上传:", uploadedFiles) // 上传逻辑
      event.dataTransfer.clearData()
    }
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        backgroundColor: dragging ? "#e6f7ff" : "#fafafa",
        height: "500px",
        position: "relative",
      }}
    >
      <Pre3d />

      {file ? <p>文件已上传: {file.name}</p> : <p>拖拽文件到此处上传</p>}
    </div>
  )
}

export default DragAndDropUpload
