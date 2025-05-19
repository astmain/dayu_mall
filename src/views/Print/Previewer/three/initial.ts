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
import { axesGroup, helperCamera, helperScene } from "./auxiliaryAxis"
export const imgMap = [img1, img2, img3, img4, img5, img6]

const getWH = () => {
  const canvasDom = document.getElementById("threecontainer")
  // console.log("TCL: init -> canvasDom", canvasDom)
  const width = canvasDom!.clientWidth || 800
  const height = canvasDom!.clientHeight || 500
  return { width, height }
}

const updateRendererSize = () => {
  const { width, height } = getWH()
  const width1 = document.fullscreenElement ? window.innerWidth : width // 全屏时使用窗口宽度，恢复时使用默认宽度
  const height1 = document.fullscreenElement ? window.innerHeight : height // 全屏时使用窗口高度，恢复时使用默认高度
  return { width1, height1 }
}
const initialThree = (() => {
  let scene: THREE.Scene | null, camera: any, renderer: any, controls: any, raycaster: any, mouse: any
  let isRender = true
  const init = () => {
    const { width, height } = getWH()
    // console.log("TCL: init -> scene", scene)
    if (!scene) {
      // 初始化核心对象
      console.log("TCL: startThree ===============-> startThree")
      //  初始化 threejs加载环境  创建场景
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x8f8aff) //  设置场景的背景色0x8c8aff  #c3d3ef
      //  初始化renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
        logarithmicDepthBuffer: true,
      })
      // scene.scale.z = 1 // 镜像功能
      // scene.rotation.x = Math.PI / 2 // 绕 X 轴旋转 90 度
      // scene.rotation.y = Math.PI // 绕 X 轴旋转 90 度
      // scene.rotation.y = Math.PI / 2 // 绕 X 轴旋转 90 度
      // scene.rotation.x = -Math.PI / 2 // 绕 X 轴旋转 -90 度
      // 定义相机的初始尺寸
      const aspect = width / height
      const frustumSize = 1000 // 定义视椎体的大小，可以根据模型大小调整
      renderer.userData = {
        width,
        height,
      }
      renderer.setSize(width, height)
      renderer.shadowMap.enabled = true // 启用阴影
      renderer.shadowMap.type = THREE.PCFSoftShadowMap // 柔和阴影
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setViewport(0, 0, width, height) //主场景视区
      renderer.autoClear = false //【scene.autoClear一定要关闭】
      renderer.autoClearDepth = true // 确保深度清晰
      // renderer.context.enable(renderer.context.DEPTH_TEST)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1
      const canvasDom = document.getElementById("threecontainer")

      canvasDom && canvasDom.appendChild(renderer.domElement)
      // renderer.setClearColor(0x000000, 1)
      camera = new THREE.OrthographicCamera(
        (frustumSize * aspect) / -2, // left
        (frustumSize * aspect) / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        100000,
      ) //  直接展示物体每个面的真实 映射  眼 = 物体
      // const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 1, 10000) //  直接展示物体每个面的真实 映射  眼 = 物体
      //  根据模型大小和canvas大小动态缩放
      // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.lookAt(0, 0, 0)
      // camera.up.set(0, 1, 0)

      controls = new ArcballControls(camera, renderer.domElement, scene)
      controls.setMouseAction("ROTATE", THREE.MOUSE.RIGHT)
      controls.setMouseAction("PAN", THREE.MOUSE.MIDDLE)
      // controls.setMouseAction("FOV", THREE.MOUSE.LEFT)

      controls.unsetMouseAction(THREE.MOUSE.LEFT)

      controls.enableZoom = true
      controls.enablePan = true
      controls.setGizmosVisible(false) // 隐藏坐标轴控件
      controls.rotateSpeed = 2.0
      controls.minDistance = 0.1
      controls.maxDistance = 1000
      // 配置鼠标按键：将右键设置为旋转
      // controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE

      const axesHelper = new THREE.AxesHelper(1000)
      scene.add(axesHelper)

      //  stp 文件无法接收 环境贴图 光效  必须使用灯光
      // 添加环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // 白色光，强度为0.6
      scene.add(ambientLight)

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

      // Initialize Raycaster and Mouse
      raycaster = new THREE.Raycaster()
      mouse = new THREE.Vector2()

      // 响应窗口大小变化
      window.addEventListener("resize", () => {
        const { width1, height1 } = updateRendererSize()
        camera.aspect = width1 / height1
        camera.updateProjectionMatrix()
        renderer.setSize(width1, height1)
        // renderer.setPixelRatio(window.devicePixelRatio)
      })

      const animate = () => {
        window.requestAnimationFrame(animate)
        if (camera && isRender) {
          controls.update()
          // 渲染主场景
          const { width1, height1 } = updateRendererSize()
          renderer.setViewport(0, 0, width1, height1)
          renderer.render(scene, camera)

          // 假设辅助场景是关于 Y 轴进行镜像
          const mirrorCameraRotation = new THREE.Euler()

          // 复制主摄像机的旋转
          mirrorCameraRotation.copy(camera.rotation)

          // 如果是关于 Y 轴镜像，反转绕 Z 和 X 轴的旋转
          mirrorCameraRotation.x = -mirrorCameraRotation.x
          mirrorCameraRotation.y = -mirrorCameraRotation.y
          // mirrorCameraRotation.z = -mirrorCameraRotation.z

          // 将旋转应用到辅助摄像机
          axesGroup.rotation.copy(mirrorCameraRotation)

          // 同步主摄像机的旋转到辅助摄像机
          // axesGroup.quaternion.copy(camera.quaternion)
          // axesGroup.rotation.copy(camera.rotation)
          // 同步辅助相机的位置和方向
          // helperCamera.rotation.copy(camera.rotation)
          // 渲染辅助场景到左下角
          renderer.clearDepth() // 清除深度缓冲区以渲染辅助场景
          renderer.setScissorTest(true)
          renderer.setScissor(0, 0, 200, 200) // 定义左下角视口
          renderer.setViewport(0, 0, 200, 200)
          renderer.render(helperScene, helperCamera)
          renderer.setScissorTest(false)
        }
      }
      animate()
    }
  }

  return {
    getInitialData: () => {
      init()
      return { scene, camera, renderer, controls, raycaster, mouse }
    },
    resetData: () => {
      // 删除 scene: THREE.Scene, camera: any, renderer: any, controls
      scene = null
      camera = null
      renderer = null
      controls = null
      isRender = false
      raycaster = null
      mouse = null
    },
  }
})()

export default initialThree
