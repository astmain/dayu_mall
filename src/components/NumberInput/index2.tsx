import React from "react"

interface XzzNumberProps {
  defaultValue: number
  onChange: (value: number) => void
}
const NumberInputXzz: React.FC<XzzNumberProps> = ({ defaultValue = 1, onChange }) => {
  const [count, setCount] = React.useState(defaultValue)
  const leftBtnStyle: React.CSSProperties = {
    width: "20px",
    fontFamily: "monospace",
  }

  const rightBtnStyle: React.CSSProperties = {
    width: "20px",
    fontFamily: "monospace",
  }
  const handleLeftBtnClick = () => {
    if (count > 1) {
      setCount(count - 1)
      onChange(count - 1)
    }
  }
  const handleRightBtnClick = () => {
    if (count >= 99) {
      return
    }
    setCount(count + 1)
    onChange(count + 1)
  }
  return (
    <>
      <div className="flex flex-1 text-[16px] justify-center ">
        <div
          className={count <= 1 ? "cursor-not-allowed text-[#DCDCDC]" : "cursor-pointer hover:text-[#4096ff]"}
          style={leftBtnStyle}
          onClick={handleLeftBtnClick}
        >
          -
        </div>
        <div className=" w-[30px]   text-[#F05113]  ">{count}</div>
        <div
          className={count >= 99 ? "cursor-not-allowed text-[#DCDCDC]" : "cursor-pointer hover:text-[#4096ff]"}
          style={rightBtnStyle}
          onClick={handleRightBtnClick}
        >
          +
        </div>
      </div>
    </>
  )
}

export default NumberInputXzz
