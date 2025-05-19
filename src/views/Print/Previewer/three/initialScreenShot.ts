import * as THREE from "three"
import { ArcballControls } from "three/examples/jsm/Addons.js"

import img2 from "../environmentMap/1/nx.png"
import img4 from "../environmentMap/1/ny.png"
import img6 from "../environmentMap/1/nz.png"
// const testUrl =..import.meta.env.VITE_API_TEST_BASE_URL
// const mapArr = .."px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]
import img1 from "../environmentMap/1/px.png"
import img3 from "../environmentMap/1/py.png"
import img5 from "../environmentMap/1/pz.png"
export const imgMap = [img1, img2, img3, img4, img5, img6]

const initialScreenShot = (() => {
  let scene: THREE.Scene | null, camera: any, renderer: any, controls: any
  const init = () => {
    // console.log("TCL: init -> scene", scene)
    const width = 200
    const height = 200
    if (!scene) {
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xc3d3ef)
      //  初始化renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        logarithmicDepthBuffer: true,
      })
      // 定义相机的初始尺寸
      const aspect = width / height
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true // 启用阴影
      renderer.shadowMap.type = THREE.PCFSoftShadowMap // 柔和阴影
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setViewport(0, 0, width, height) //主场景视区
      renderer.autoClear = false //【scene.autoClear一定要关闭】
      renderer.autoClearDepth = true // 确保深度清晰
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1
      const canvasDom = document.getElementById("screenshotcontainer")

      canvasDom && canvasDom.appendChild(renderer.domElement)
      // 创建相机
      // const fov = 75
      // const near = 0.1
      // const far = 1000
      // camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      // camera.position.z = 50
      // camera.lookAt(0, 0, 0)
      const frustumSize = 200 // 定义视椎体的大小，可以根据模型大小调整
      camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2, // left
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        100000,
      )
      camera.position.z = 50

      controls = new ArcballControls(camera, renderer.domElement, scene)

      controls.enableZoom = true
      controls.enablePan = true
      controls.setGizmosVisible(false) // 隐藏坐标轴控件
      controls.rotateSpeed = 2.0
      controls.minDistance = 0.1
      controls.maxDistance = 1000

      //  stp 文件无法接收 环境贴图 光效  必须使用灯光
      // 添加环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 白色光，强度为0.6
      scene.add(ambientLight)

      // const axesHelper = new THREE.AxesHelper(1000)
      // // axesHelper.userData.isAXes = true
      // scene.add(axesHelper)
      // 添加半球光
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5) // 天空色为白色，地面色为灰色，强度为0.6
      hemisphereLight.position.set(0, 1, 0)
      scene.add(hemisphereLight)

      // 添加方向光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8) // 白色光，强度为0.8
      directionalLight.position.set(105, 105, 105) // 光源位置
      directionalLight.castShadow = true // 启用阴影
      scene.add(directionalLight)
      directionalLight.shadow.mapSize.width = 2048
      directionalLight.shadow.mapSize.height = 2048
      directionalLight.shadow.camera.near = 0.5
      directionalLight.shadow.camera.far = 50
      directionalLight.shadow.bias = -0.0001 // 解决阴影条纹问题

      // const gridHelper = new THREE.GridHelper(100, 100)
      // scene.add(gridHelper)

      const cubeTextureLoader = new THREE.CubeTextureLoader()
      const environmentMap = cubeTextureLoader.load(imgMap)
      // environmentMap.encoding = THREE.sRGBEncoding
      scene.environment = environmentMap

      const animate = () => {
        window.requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()
    }
  }

  return {
    getInitialData: () => {
      init()
      return { scene, camera, renderer }
    },
    resetData: () => {
      // 删除 scene: THREE.Scene, camera: any, renderer: any, controls
      scene = null
      camera = null
      renderer = null
    },
  }
})()

export default initialScreenShot

// {x: 3243, y: 8097, z: 6456}   找到对象xyz中数值最大的 返回key
const findMaxArea = (size: { x: number; y: number; z: number }) => {
  const { x, y, z } = size
  const max = Math.max(x, y, z)
  return max
}

const findMinAXies = (size: { x: number; y: number; z: number }) => {
  const { x, y, z } = size
  const min = Math.min(x, y, z)
  return min === x ? "x" : min === y ? "y" : "z"
  // 轴向最短的 即为相机垂直面对的轴
}
export const screenshot = async (mesh: THREE.Mesh) => {
  const newMesh = mesh.clone()
  const { scene, camera, renderer } = initialScreenShot.getInitialData()
  // 1. 调整mesh 自适应渲染区  获取size
  const box = new THREE.Box3().setFromObject(newMesh)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const { x, y, z } = newMesh.position
  newMesh.position.set(x - center.x, y - center.y, z - center.z) // 设置 偏移量  保证中心点在原点
  // newMesh.position.set(0, 0, 0)
  // camera.lookAt(center.x, center.y, center.z)
  if (mesh.up) {
    const { y } = mesh.up
    if (y == 1) {
      camera.up.set(0, 0, 1)
    }
  }
  camera.position.set(0, 0, 0)
  // 先确定相机朝向
  const minAxies = findMinAXies(size)
  //  计算足够的偏移量  使模型恰好被渲染区容纳
  const maxAxies = findMaxArea(size)
  camera.zoom = 200 / (maxAxies + 10)
  console.log("xzz2021: screenshot -> camera.zoom", camera.zoom)
  camera.position[minAxies] = size[minAxies] * 2
  camera.updateProjectionMatrix()
  scene && scene.add(newMesh)

  await new Promise((resolve) => setTimeout(resolve, 100))
  renderer.render(scene, camera)
  const imageUrl = renderer.domElement.toDataURL("image/jpeg")
  mesh.userData.imgUrl = imageUrl
  scene && scene.clear()
}
