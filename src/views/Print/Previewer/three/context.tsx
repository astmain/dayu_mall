import React, { createContext, useContext, useEffect, useRef } from "react"
import * as THREE from "three"
import { ArcballControls } from "three/examples/jsm/Addons.js"

import { imgMap } from "./initial"

// 定义 Context 类型
interface ThreeContextType {
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  controls: ArcballControls
  renderer: THREE.WebGLRenderer
}

// 创建 Context
const ThreeContext = createContext<ThreeContextType | null>(null)

// 创建 Provider 组件
export const ThreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scene: THREE.Scene = new THREE.Scene()
  scene.background = new THREE.Color(0x8f8aff) //  设置场景的背景色0x8c8aff  #c3d3ef
  //  初始化renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
    logarithmicDepthBuffer: true,
  })

  const canvasDom = document.getElementById("threecontainer")
  console.log("TCL: init -> canvasDom", canvasDom)
  const width = canvasDom!.clientWidth || 800
  const height = canvasDom!.clientHeight || 500

  // 定义相机的初始尺寸
  const aspect = width / height
  const frustumSize = 1000 // 定义视椎体的大小，可以根据模型大小调整

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
  // renderer.setClearColor(0x000000, 1)
  const camera = new THREE.OrthographicCamera(
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

  const controls = new ArcballControls(camera, renderer.domElement, scene)

  controls.enableZoom = true
  controls.enablePan = !true

  controls.rotateSpeed = 2.0
  controls.minDistance = 0.1
  controls.maxDistance = 1000

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

  const gridHelper = new THREE.GridHelper(100, 100)
  scene.add(gridHelper)

  const cubeTextureLoader = new THREE.CubeTextureLoader()
  const environmentMap = cubeTextureLoader.load(imgMap)
  // environmentMap.encoding = THREE.sRGBEncoding
  scene.environment = environmentMap

  const sceneRef = useRef(scene)
  const cameraRef = useRef<THREE.OrthographicCamera>(camera)
  const controlsRef = useRef(controls)
  const rendererRef = useRef(renderer)
  useEffect(() => {
    // 初始化相机
    // cameraRef.current.position.set(0, 0, 5)
  }, [])

  return (
    <ThreeContext.Provider
      value={{
        scene: sceneRef.current,
        camera: cameraRef.current,
        controls: controlsRef.current,
        renderer: rendererRef.current,
      }}
    >
      {children}
    </ThreeContext.Provider>
  )
}

// 创建一个 Hook 来简化使用 Context
export const useThree = () => {
  const context = useContext(ThreeContext)
  if (!context) {
    throw new Error("useThree must be used within a ThreeProvider")
  }
  return context
}
