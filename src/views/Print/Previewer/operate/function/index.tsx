import { useStartLoading } from "../../hooks"
import { exportSTLModel } from "../../three/exporter"
import initialThree from "../../three/initial"
import { screenshot, toggleLabel, toggleTransparent } from "./utils"

const FunctionList = () => {
  const listArr = [
    { label: "拆分", icon: "icon3d-chaifen" },
    { label: "测量", icon: "icon3d-celiang" },
    { label: "缩放", icon: "icon3d-suofang" },
    { label: "镜像", icon: "icon3d-jingxiang" },
    { label: "截图", icon: "icon3d-jingxiang" },
    { label: "尺寸", icon: "icon3d-chicun" },
    { label: "透视", icon: "icon3d-celiang" },
    // { label: "尺寸1", icon: "3dicon-chicun1" },
    { label: "减面", icon: "icon3d-jianmian" },
    // { label: "镜像1", icon: "icon-jingxiang1" },
    { label: "爆炸图", icon: "icon3d-baozhatu" },
    // { label: "", icon: "icon-baozhatu1" },
    // { label: "减面", icon: "icon-moxingjianmian" },
    // { label: "", icon: "icon-cfwtubiaoku_baozha" },
    { label: "抽壳", icon: "icon3d-chouke" },
    // { label: "", icon: "icon-chaifen1" },
    { label: "壁厚检测", icon: "icon3d-bihoujiance" },
    { label: "快速拆分", icon: "icon3d-moxingkuaisuchaifen" },
    { label: "布尔计算", icon: "icon3d-bueryunsuan" },
    // { label: "", icon: "icon-bueryunsuan1" },
    { label: "剖视图", icon: "icon3d-jubupoushitu1" },
    { label: "复制", icon: "icon3d-fuzhimoxing" },
    { label: "打孔", icon: "icon3d-dakong-weixuan" },
    { label: "合并零件", icon: "icon3d-hebinglingjian-weixuan" },
    { label: "导出", icon: "icon3d-chouke" },
    { label: "缩放导出", icon: "icon3d-baozhatu" },
    // { label: "", icon: "icon-a-poushixiaoguozhaoxiangyuandian-weixuan" },
    // { label: "", icon: "icon-a-poushixiaoguoyuanliyuandian-weixuan" },
  ]

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null) // 用于跟踪当前悬停的项索引
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const { selectedMesh, meshArr, getSelectedMesh } = useThreeStore((state) => state)

  const { cloneNewMesh } = useStartLoading()
  const addCloneMesh = () => {
    const meshes = getSelectedMesh()
    if (meshes.length > 0) {
      meshes.forEach((mesh: any) => {
        cloneNewMesh(mesh)
      })
    }
  }

  const exportScaleModel = () => {
    const meshes = getSelectedMesh()
    const scaleFactor = 0.5 // 定义缩放比例
    if (meshes.length > 0) {
      // 等比例缩放模型
      meshes.map((mesh: any) => {
        const newMesh = mesh.clone()
        // newMesh.geometry.scale(scaleFactor, scaleFactor, scaleFactor)
        // newMesh.geometry.computeBoundingBox() // 更新几何体边界
        const geometry = newMesh.geometry.clone()
        // 避免污染原模型
        geometry.scale(scaleFactor, scaleFactor, scaleFactor) // 等比例缩放几何体
        geometry.computeBoundingBox() // 更新几何体边界
        newMesh.geometry = geometry
        exportSTLModel(newMesh)
      })
    }
  }

  const toggleFullscreen = () => {
    // const { renderer } = initialThree.getInitialData()
    const canvasDom = document.getElementById("threecontainer")
    if (!document.fullscreenElement) {
      canvasDom?.requestFullscreen()
      // renderer.domElement.requestFullscreen()
    } else {
      // 退出全屏模式
      document.exitFullscreen()
    }
  }

  const onTriggerFn = (label: string) => {
    const { scene } = initialThree.getInitialData()
    if (!scene) return
    switch (label) {
      case "拆分":
        break
      case "缩放":
        toggleFullscreen()
        // 缩放
        break
      case "镜像":
        // 镜像
        break
      case "截图":
        screenshot(selectedMesh)
        break
      case "尺寸":
        toggleLabel(selectedMesh, scene)
        break
      case "透视":
        toggleTransparent(meshArr, selectedMesh)
        break
      case "减面":
        // 减面
        break
      case "复制":
        addCloneMesh()
        break
      case "导出":
        selectedMesh.map((mesh: any) => {
          exportSTLModel(mesh)
        })
        break
      case "缩放导出":
        exportScaleModel()
        break
    }
  }
  return (
    <>
      <div className=" z-[30] h-[30px] absoluteX-center-xzz top-[20px] flex gap-[0px]">
        {listArr.map((item, index) => (
          <div
            className="flex justify-center  items-center h-[30px] w-[30px] cursor-pointer relative"
            key={index}
            onClick={() => onTriggerFn(item.label)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <i className={`iconfont ${item.icon}`} style={{ color: "#fff", fontSize: "20px" }}></i>
            {hoveredIndex === index && (
              <div className="absoluteX-center-xzz top-[-15px] text-[12px] text-[#fff] w-[50px] ">{item.label}</div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default FunctionList
