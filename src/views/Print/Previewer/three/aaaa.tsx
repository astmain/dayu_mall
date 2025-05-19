const DynamicRuler = () => {
  const [scale, setScale] = useState(10) // 初始刻度间距
  const [unit, setUnit] = useState("dm") // 初始单位

  // 处理缩放事件
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -1 : 1 // 向上滚动放大，向下滚动缩小
    const newScale = Math.max(5, Math.min(scale + delta * 2, 50)) // 限制间距范围
    setScale(newScale)

    // 动态调整单位
    if (newScale >= 30) {
      setUnit("cm")
    } else if (newScale >= 15) {
      setUnit("dm")
    } else {
      setUnit("m")
    }
  }

  return (
    <div
      className="relative w-full h-20 bg-gray-200 flex items-center overflow-hidden"
      onWheel={handleWheel} // 滚轮监听
    >
      <div className="flex w-full h-full overflow-hidden">
        {Array.from({ length: 100 }).map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
            style={{ width: `${scale}px` }} // 动态调整刻度间距
          >
            {/* 长刻度 */}
            {index % 10 === 0 ? (
              <>
                <div className="w-0.5 h-8 bg-black"></div>
                <span className="text-xs mt-1">{unit === "cm" ? index * 10 : index}</span>
              </>
            ) : index % 5 === 0 ? (
              <div className="w-0.5 h-6 bg-black"></div>
            ) : (
              <div className="w-0.5 h-4 bg-black"></div>
            )}
          </div>
        ))}
        {/* 单位显示 */}
        <div className="absolute right-2 bottom-2 text-sm">{unit}</div>
      </div>
    </div>
  )
}

export default DynamicRuler
