import React from "react"

interface TagProps {
  title: string
  fontSize?: number
}
const TagXzz: React.FC<TagProps> = ({ title = "", fontSize = 20 }) => {
  return (
    <div className="flex  items-center">
      <div className="w-[6px] h-[18px] bg-[#1366F0] mr-[10px] rounded-[3px]"></div>
      <div className="title" style={{ fontSize, color: "#222222" }}>
        {title}
      </div>
    </div>
  )
}

export default TagXzz
