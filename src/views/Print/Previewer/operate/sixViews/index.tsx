// import { useThree } from './hooks'

import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { Dropdown, MenuProps, Space } from "antd"
import { t } from "i18next"

import { changeFace } from "../../three/utils"
const SixViews = () => {
  const listArr = [
    { icon: "icon3d-shitufushitu", label: "topview" },
    { icon: "icon3d-shituyangshitu", label: "bottomview" },
    { icon: "icon3d-shituzhushitu", label: "frontview" },
    { icon: "icon3d-shituhoushitu", label: "backview" },
    { icon: "icon3d-shituzuoshitu", label: "rightview" },
    { icon: "icon3d-shituzuoshitu", label: "leftview" },
    { icon: "icon3d-shitudongnanshitu", label: "homeview" },
  ]
  const listStyle = {
    display: "flex",
    padding: "0 5px",
    // lineHeight: "40px",
    justifyContent: "space-between",
    alignItems: "center",
    // margin: '0 20px',
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const changeItem = (index: number) => {
    setCurrentIndex(index)
    changeFace(index)
  }

  const itemsList: MenuProps["items"] = listArr.map((item, index) => {
    return {
      key: index + 1,
      label: (
        <div key={index} style={listStyle} onClick={() => changeItem(index)}>
          <i className={"iconfont " + item.icon} style={{ color: index == currentIndex ? "blue" : "black" }}></i>
          <div style={{ marginLeft: "6px", color: index == currentIndex ? "blue" : "black" }}>
            {t("three.sixview." + item.label)}
          </div>
        </div>
      ),
    }
  })

  const [isOpen, setIsOpen] = useState(!false)
  const onStatusChange = (open: boolean) => {
    setIsOpen(open)
  }
  return (
    <>
      <Dropdown menu={{ items: itemsList }} placement="bottomRight" onOpenChange={onStatusChange}>
        <div className="absolute top-[80px] right-[20px] z-[20]  w-[80px] h-[40px] ">
          <a onClick={(e) => e.preventDefault()} style={{ color: "#fff", cursor: "pointer" }}>
            <Space>
              <i className="iconfont icon3d-baozhatu" style={{ color: "#fff", fontSize: "30px" }}></i>
              {/* <i className="iconfont icon-xia" style={{ fontSize: "10px" }}></i> */}
              {isOpen ? <DownOutlined /> : <UpOutlined />}
            </Space>
          </a>
        </div>
      </Dropdown>
    </>
  )
}

export default SixViews
