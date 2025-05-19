import React from "react"

interface XzzNumberProps {
  defaultValue: number
  onChange: (value: number) => void
  height?: number
}
const NumberInputXzz: React.FC<XzzNumberProps> = ({ defaultValue = 1, onChange, height = 30 }) => {
  const [count, setCount] = React.useState(defaultValue)
  const leftBtnStyle: React.CSSProperties = {
    width: "35px",
    height: height + "px",
    lineHeight: height + "px",
    background: "#F1F6FF",
    borderRadius: "4px 0px 0px 4px",
    border: "1px solid #DCDCDC",
    marginLeft: 10,
    // cursor: "pointer",
    textAlign: "center",
  }

  const centerStyle = {
    borderTop: "1px solid #DCDCDC",
    borderBottom: "1px solid #DCDCDC",
    padding: "0 10px",
    height: height + "px",
    lineHeight: height + "px",
  }

  const rightBtnStyle: React.CSSProperties = {
    width: "35px",
    height: height + "px",
    lineHeight: height + "px",
    background: "#F1F6FF",
    borderRadius: "0px 4px 4px 0px",
    border: "1px solid #DCDCDC",
    marginRight: 10,
    // cursor: "pointer",
    textAlign: "center",
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
      <div className="flex ">
        <div
          className={count <= 1 ? "cursor-not-allowed" : "cursor-pointer"}
          style={leftBtnStyle}
          onClick={handleLeftBtnClick}
        >
          -
        </div>
        <div className="centerCount w-[40px]  text-[18px] text-[#F05113]  text-center " style={centerStyle}>
          {count}
        </div>
        <div
          className={count >= 99 ? "cursor-not-allowed" : "cursor-pointer"}
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
