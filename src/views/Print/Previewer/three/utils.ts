import * as THREE from "three"

import initialThree from "./initial"
export const clearScene = (scene: THREE.Scene) => {
  // 遍历场景中的所有Mesh对象
  while (scene.children.length > 0) {
    // 获取第一个子对象
    const object = scene.children[0] as THREE.Mesh
    // scene.background = null
    // geometry（几何体）或material（材质）可以在3D物体之间共享,所以THREE不会主动移除
    if (object.isMesh) {
      // 如果Mesh使用了几何体，释放几何体
      if (object.geometry) {
        object.geometry.dispose()
      }
      // 如果Mesh使用了材料，释放材料
      if (object.material) {
        if (Array.isArray(object.material)) {
          // 对于数组材料，遍历并释放每个材料
          object.material.forEach((material: any) => material.dispose())
        } else {
          // 对于单个材料，直接释放
          object.material.dispose()
        }
      }
    }

    // 从场景中移除对象
    scene.remove(object)
  }

  // 可选：如果有需要，也可以清理其他资源，如纹理
}

export const addLight = (scene: THREE.Scene, cameraLight: any) => {
  scene.add(cameraLight)

  // 添加灯光
  const strength = 1
  //  环境光 会影响 模型的颜色
  const ambientLight = new THREE.AmbientLight(0x7c7c7c, strength)
  scene.add(ambientLight)

  // return {
  //   cameraLight,
  //   ambientLight,
  // }
}

export const getWH = () => {
  const dom = document.getElementById("threecontainer")
  const width = dom?.clientWidth || 800
  const height = dom?.clientHeight || 500
  // console.log('TCL: getWH -> height', height)
  return { width, height }
}
const setOriginPosition = (mesh: THREE.Mesh) => {
  // mesh.userData.rawPosition = mesh.userData.rawPosition || mesh.position.clone()

  // mesh.position.set(mesh.userData?.rawPosition?.x, mesh.userData?.rawPosition?.y, mesh.userData?.rawPosition?.z)
  const box = new THREE.Box3().setFromObject(mesh)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const { x, y, z } = mesh.position
  const offset = 0
  const x2 = x - center.x + size.x / 2 + offset
  const y2 = y - center.y + size.y / 2 + offset
  const z2 = z - center.z + size.z / 2 + offset

  const originPosition = { x2, y2, z2 } // 基于原点的适配位置
  mesh.userData.originPosition = originPosition

  // const centerMarker = new THREE.Points(geometry, material)
  //  要显示中心原点  需要先行设置 透明属性 为false
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material) => {
      material.transparent = false
      // material.opacity = 0.5
    })
  } else {
    mesh.material.transparent = false
    // mesh.material.opacity = 0.5
  }
  // 高亮显示中心点
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32) // 小球代表中心
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, depthTest: false }) // depthWrite: false , depthTest: false #646464 0x00ff00
  const centerMarker = new THREE.Mesh(sphereGeometry, sphereMaterial)
  // // 确保内部模型始终在外部模型前面渲染
  // centerMarker.renderOrder = 0

  return { originPosition, size, centerMarker }
}
export const initialStatus = (mesh: THREE.Mesh, occupancy: any) => {
  // console.log("TCL: initialStatus -> occupancy", occupancy)
  // const { box, center, size } = getMeshSize(mesh)
  // const { width } = getWH()
  const { size, originPosition, centerMarker } = setOriginPosition(mesh)
  const { x2, y2, z2 } = originPosition

  const place = occupancy.place
  const x3 = x2 + (place == "x" ? occupancy.x : 0)
  const y3 = y2
  const z3 = z2 + (place == "z" ? occupancy.z : 0)
  mesh.position.set(x3, y3, z3) //  重置模型的位置
  const { x, y, z } = size
  mesh.userData.size = { x, y, z }

  const box = new THREE.Box3().setFromObject(mesh)
  const center = box.getCenter(new THREE.Vector3())
  centerMarker.position.copy(center)
  mesh.userData.centerMarker = centerMarker //  中心圆点
  mesh.userData.isSelected = true

  // camera.zoom = width / Math.max(x, y, z)
  // // camera.position.set(x + y, y, z)
  // camera.position.set(0, 0, 2000)
  // camera.updateProjectionMatrix()
}

export const initialCamera = (occupancy: any, camera: THREE.OrthographicCamera) => {
  const { x, z } = occupancy
  const offeset = 100

  const x4 = x * 2 + offeset
  const y4 = offeset * 2
  const z4 = z * 2 + offeset
  const { width } = getWH()
  camera.zoom = (width / z4) * 2
  camera.position.set(x4, y4, z4)
  camera.userData.position = { x: x4, y: y4, z: z4 }
  camera.updateProjectionMatrix()
}
//  变换视角
export const changeFace = (i: number) => {
  const { camera } = initialThree.getInitialData()
  // console.log("TCL: changeFace -> i", i)
  //   0     1     4     5     3     2
  // +蓝z   -蓝z  +红x  -红x  -绿y   +绿y
  const distanceToOrigin = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
  const positionArr = [
    new THREE.Vector3(0, 0, distanceToOrigin), // 正上方
    new THREE.Vector3(0, 0, -distanceToOrigin), // 正下方
    new THREE.Vector3(0, -distanceToOrigin, 0), // 正左方
    new THREE.Vector3(0, distanceToOrigin, 0), // 正右方
    new THREE.Vector3(distanceToOrigin, 0, 0), // 正前方
    new THREE.Vector3(-distanceToOrigin, 0, 0), // 正后方
    new THREE.Vector3(-distanceToOrigin, distanceToOrigin, distanceToOrigin), // zuo后方
  ]
  camera.position.copy(positionArr[i] || positionArr[0])
}

// export const createRulers000 = (scene: THREE.Scene) => {
//   // 添加刻度尺
//   const scaleGroup = new THREE.Group() // 用于存储所有刻度对象
//   scene.add(scaleGroup)

//   // 刻度尺创建函数
//   function createRuler(scaleFactor: number) {
//     // 清空旧刻度
//     while (scaleGroup.children.length > 0) {
//       scaleGroup.remove(scaleGroup.children[0])
//     }

//     const rulerLength = 10 // 刻度总长度
//     const step = scaleFactor // 刻度间隔

//     for (let i = -rulerLength / 2; i <= rulerLength / 2; i += step) {
//       const material = new THREE.LineBasicMaterial({ color: 0x00ff00 })
//       const points = [new THREE.Vector3(i, 0, 0), new THREE.Vector3(i, 0.2, 0)]
//       const geometry = new THREE.BufferGeometry().setFromPoints(points)
//       const line = new THREE.Line(geometry, material)
//       scaleGroup.add(line)

//       // 添加刻度数字
//       const canvas = document.createElement("canvas")
//       const context = canvas.getContext("2d")
//       context.font = "20px Arial"
//       context.fillStyle = "white"
//       context.fillText(i.toFixed(1), 20, 30)

//       const texture = new THREE.CanvasTexture(canvas)
//       const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
//       const sprite = new THREE.Sprite(spriteMaterial)
//       sprite.position.set(i, 0.5, 0)
//       sprite.scale.set(0.5, 0.5, 1)
//       scaleGroup.add(sprite)
//     }
//   }

//   // 初始刻度尺
//   createRuler(1)

//   // 鼠标缩放事件
//   let scaleFactor = 1
//   window.addEventListener("wheel", (event) => {
//     console.log("TCL: createRulers -> wheel")
//     if (event.deltaY < 0) {
//       scaleFactor = Math.max(0.1, scaleFactor - 0.1) // 缩小
//     } else {
//       scaleFactor += 0.1 // 放大
//     }
//     createRuler(scaleFactor)
//   })
// }

//  添加轮廓线
export const showContourlines = (mesh: THREE.Mesh) => {
  if (!mesh) return
  mesh.traverse((child: THREE.Object3D<THREE.Object3DEventMap>) => {
    if (child instanceof THREE.Mesh) {
      const edges = new THREE.EdgesGeometry(child.geometry, 80)
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
      const wireframe = new THREE.LineSegments(edges, lineMaterial)
      wireframe.name = "wireframe"
      child.add(wireframe)
    }
  })
}

const createTextSprite = (text: string, scale: number) => {
  const canvas = document.createElement("canvas")

  const context = canvas.getContext("2d")
  if (!context) return null

  // 设置较大的分辨率和字体
  const fontSize = 20 // 增大字体大小
  const padding = 10 // 内边距
  context.font = `Bold ${fontSize}px Arial`
  context.fillStyle = "#e53333"

  // 计算文本宽度，调整canvas大小
  const metrics = context.measureText(text)
  const textWidth = metrics.width

  canvas.width = textWidth + padding * 2 // 加一些填充
  canvas.height = fontSize + padding * 2 // 固定高度

  // 重新绘制文本到调整过大小的canvas上
  context.font = `Bold ${fontSize}px Arial`
  context.fillStyle = "#e53333"
  // canvas.zIndex = 9999999
  context.fillText(text, padding, fontSize + padding)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.renderOrder = 999 // 确保精灵渲染在其他对象之上  ??  不需要

  // 调整比例以适应场景，使用固定的比例
  // const scale = 10 // 固定大小的比例
  sprite.scale.set(scale, scale * (canvas.height / canvas.width), 1)

  return sprite
}
const addSizeLabels = (mesh: THREE.Mesh) => {
  // const size = new THREE.Vector3()
  // box.getSize(size)
  const boxHelper = new THREE.BoxHelper(mesh, 0x3ff94e)
  const box = new THREE.Box3().setFromObject(mesh)
  // scene.add(boxHelper)
  const labelArr: any = [boxHelper]
  const size = box.getSize(new THREE.Vector3())
  //  此处scale 用于获得相机距离模型的距离  从而计算 文本放大比例
  const d = Math.sqrt(size.x * size.x + size.y * size.y)
  const scale = Number((d / 4).toFixed(2))
  const positions = [
    {
      text: `长: ${size.x.toFixed(2)}`,
      position: new THREE.Vector3((box.min.x + box.max.x) / 2, box.min.y, box.min.z),
    },
    {
      text: `宽: ${size.y.toFixed(2)}`,
      position: new THREE.Vector3(box.min.x, (box.min.y + box.max.y) / 2, box.min.z),
    },
    {
      text: `高: ${size.z.toFixed(2)}`,
      position: new THREE.Vector3(box.min.x, box.min.y, (box.min.z + box.max.z) / 2),
    },
  ]

  positions.forEach((dimension) => {
    const sprite = createTextSprite(dimension.text, scale)
    if (!sprite) return labelArr
    sprite.position.copy(dimension.position)
    sprite.material.depthTest = false // 确保文本不被遮挡
    // scene.add(sprite) // 添加到场景中
    labelArr.push(sprite)
  })

  // 调整每个标签的位置，使其位于对应的线条中间
  positions[0].position.set((box.min.x + box.max.x) / 2, box.min.y - 0.1, box.min.z - 0.1) // 长：底部中间
  positions[1].position.set(box.min.x - 0.1, (box.min.y + box.max.y) / 2, box.min.z - 0.1) // 宽：左侧中间
  positions[2].position.set(box.min.x - 0.1, box.min.y - 0.1, (box.min.z + box.max.z) / 2) // 高：前面中间

  positions.forEach((dimension) => {
    const sprite = createTextSprite(dimension.text, scale)
    if (!sprite) return labelArr

    sprite.position.copy(dimension.position)
    // sprite.material.depthTest = false; // 确保文本不被遮挡
    sprite.position.z += 0.1 // 防止与其他对象重叠
    // scene.add(sprite) // 添加到场景中
    labelArr.push(sprite)
  })
  return labelArr
}

export const initialLabel = (mesh: THREE.Mesh) => {
  if (!mesh) return
  mesh.userData.showLabel = false
  mesh.userData.labelArr = addSizeLabels(mesh)
}
// export const toggleLabel = (mesh: THREE.Mesh, scene: THREE.Scene) => {
//   if (!mesh) return
//   const showLabel = mesh.userData?.showLabel || false
//   const ll = mesh.userData?.labelArr ? mesh.userData.labelArr.length : 0
//   if (!showLabel) {
//     if (!ll) {
//       mesh.userData.labelArr = addSizeLabels(mesh, scene)
//     } else {
//       mesh.userData.labelArr.map((item) => {
//         scene.add(item)
//       })
//     }
//     console.log("TCL: toggleLabel ->  mesh.userData", mesh.userData)
//   } else {
//     mesh.userData.labelArr.map((item) => {
//       scene.remove(item)
//     })
//   }
//   mesh.userData.showLabel = !mesh.userData.showLabel
// }

//   ===============壁厚检测=================

export const highlightThinWalls = (model: any, scene: any) => {
  model.traverse(function (child: any) {
    if (child.isMesh) {
      const geometry = child.geometry
      const thinAreas = findThinAreas(geometry)
      if (thinAreas.length > 0) {
        console.log("xzz2021: highlightThinWalls -> thinAreas")
        createHighlight(thinAreas, model, scene)
      }
    }
  })
}

function findThinAreas(geometry: any) {
  console.log("xzz2021: findThinAreas -> geometry", geometry)
  const positions = geometry.attributes.position.array
  const thinAreas = []

  for (let i = 0; i < positions.length; i += 9) {
    const x1 = positions[i]
    const y1 = positions[i + 1]
    const z1 = positions[i + 2]
    const x2 = positions[i + 3]
    const y2 = positions[i + 4]
    const z2 = positions[i + 5]

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2))

    // 记录壁厚小于2mm的位置
    if (distance < 0.02) {
      thinAreas.push({ x1, y1, z1, x2, y2, z2 })
    }
  }

  return thinAreas
}

function createHighlight(thinAreas: any, mesh: any, scene: any) {
  thinAreas.forEach((area: any) => {
    const geometry = new THREE.SphereGeometry(0.1) // 小球形状
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const sphere = new THREE.Mesh(geometry, material)
    const offsetX = mesh.position.x
    const offsetY = mesh.position.y
    const offsetZ = mesh.position.z

    sphere.position.set(
      offsetX + (area.x1 + area.x2) / 2,
      offsetY + (area.y1 + area.y2) / 2,
      offsetZ + (area.z1 + area.z2) / 2,
    )
    scene.add(sphere) // 将高亮区域添加到场景中

    // Optional: 使用物体材质的透明度
    sphere.material.transparent = true
    sphere.material.opacity = 0.7
  })
}

//   ===============壁厚检测=================
