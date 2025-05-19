import * as THREE from "three"
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js"

// 创建辅助场景
const helperScene = new THREE.Scene()
// helperScene.background = new THREE.Color(0xc3d3ef)
helperScene.background = null
// helperScene.rotation.x = -Math.PI / 2

// 定义相机的初始尺寸
const aspect = 1 * 1.3
const w = aspect
const helperCamera = new THREE.OrthographicCamera(-w, w, w, -w, 0.1, 100)
helperCamera.position.set(0, 0, 10) //  x
helperCamera.lookAt(0, 0, 0)
// helperCamera.up.set(0, 0, 1) // 设置 z 轴为 "up"
// helperCamera.updateProjectionMatrix()
// 坐标轴辅助工具
// 创建一个组来包含坐标轴和文字
const axesGroup = new THREE.Group()

const axesHelper = new THREE.AxesHelper(1)
axesGroup.add(axesHelper)

// 创建字体加载器
const fontLoader = new FontLoader()

fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font) => {
  // 创建文字几何体的函数
  function createText(text: string, color: number) {
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: 0.1, // 字体大小
      depth: 0.02, // 字体深度
    })
    const textMaterial = new THREE.MeshBasicMaterial({ color }) // 使用 MeshBasicMaterial 确保不受光照影响
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textGeometry.computeBoundingBox() // 计算边界盒
    const boundingBox = textGeometry.boundingBox
    if (boundingBox) {
      const offset = boundingBox.getCenter(new THREE.Vector3()).negate() // 中心居中
      textGeometry.translate(offset.x, offset.y, offset.z) // 将文字几何体居中
    }
    return textMesh
  }

  // 创建坐标轴辅助器
  // const axesHelper = new THREE.AxesHelper(0.5)
  // helperScene.add(axesHelper)

  // 添加 X 轴标记
  const xText = createText("X", 0xff0000) // 红色
  xText.position.set(1.1, 0, 0) // X 轴末端
  axesGroup.add(xText)

  // 添加 Y 轴标记
  const yText = createText("Y", 0x00ff00) // 绿色
  yText.position.set(0, 1.1, 0) // Y 轴末端
  axesGroup.add(yText)

  // 添加 Z 轴标记
  const zText = createText("Z", 0x0000ff) // 蓝色
  zText.position.set(0, 0, 1.1) // Z 轴末端
  axesGroup.add(zText)
})
// 将组添加到辅助场景
helperScene.add(axesGroup)

export { axesGroup, helperCamera, helperScene }
