import * as THREE from "three"

import initialThree from "./initial"

export const boxSelection = (setSelectedMesh: any) => {
  const { scene, renderer, camera } = initialThree.getInitialData()
  // 鼠标框选变量
  let isSelecting = false
  let startPoint = { x: 0, y: 0 }
  let endPoint = { x: 0, y: 0 }
  const selectedObjects: (THREE.Mesh | THREE.Object3D)[] = []

  // 监听鼠标事件
  renderer.domElement.addEventListener("mousedown", (event: MouseEvent) => {
    // 判断是否为左键
    if (event.button === 0) {
      isSelecting = true
      startPoint = { x: event.layerX, y: event.layerY }
    }
  })

  renderer.domElement.addEventListener("mousemove", (event: MouseEvent) => {
    if (isSelecting) {
      endPoint = { x: event.layerX, y: event.layerY }
      drawSelectionRectangle(startPoint, endPoint)
    }
  })

  renderer.domElement.addEventListener("mouseup", (event: MouseEvent) => {
    // 判断是否为左键
    if (event.button === 0) {
      isSelecting = false
      endPoint = { x: event.layerX, y: event.layerY }
      const selectedObjects = selectObjectsInRectangle(startPoint, endPoint)
      setSelectedMesh(selectedObjects)
      clearSelectionRectangle()
    }
  })

  // 单击选择
  renderer.domElement.addEventListener("click", (event: MouseEvent) => {
    const { raycaster, camera, mouse, renderer } = initialThree.getInitialData()
    mouse.x =
      ((event.clientX - renderer.domElement.getBoundingClientRect().left) / renderer.domElement.clientWidth) * 2 - 1
    mouse.y =
      -((event.clientY - renderer.domElement.getBoundingClientRect().top) / renderer.domElement.clientHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(useThreeStore.getState().meshArr, true)
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.isMesh) {
        setSelectedMesh([intersects[i].object])
        break
      }
    }
  })

  // 绘制选择框
  const selectionRectangle = document.createElement("div")
  selectionRectangle.style.position = "absolute"
  selectionRectangle.style.border = "1px dashed blue"
  selectionRectangle.style.pointerEvents = "none"
  const canvasDom = document.getElementById("threecontainer")
  scene && scene.children.length && canvasDom?.appendChild(selectionRectangle)

  function drawSelectionRectangle(start: { x: number; y: number }, end: { x: number; y: number }) {
    const x = Math.min(start.x, end.x)
    const y = Math.min(start.y, end.y)
    const width = Math.abs(start.x - end.x)
    const height = Math.abs(start.y - end.y)
    selectionRectangle.style.left = `${x}px`
    selectionRectangle.style.top = `${y}px`
    selectionRectangle.style.width = `${width}px`
    selectionRectangle.style.height = `${height}px`
    // 显示选择框  放在这里绘制 可以避免显示 上次绘制位置
    selectionRectangle.style.display = "block"
  }

  function clearSelectionRectangle() {
    // 清除选择框
    selectionRectangle.style.width = "0px"
    selectionRectangle.style.height = "0px"
    selectionRectangle.style.display = "none"
    // 当选择框为0时 清除选择框
    // if (selectionRectangle.style.width === "0px" && selectionRectangle.style.height === "0px") {
    //   selectionRectangle.remove()
    // }
  }
  // 选择框选中的对象
  function selectObjectsInRectangle(start: { x: number; y: number }, end: { x: number; y: number }) {
    // 计算框选范围在屏幕坐标中的矩形
    const rect = {
      left: Math.min(start.x, end.x),
      right: Math.max(start.x, end.x),
      top: Math.min(start.y, end.y),
      bottom: Math.max(start.y, end.y),
    }

    selectedObjects.length = 0

    // 创建视锥体
    const frustum = new THREE.Frustum()
    const projScreenMatrix = new THREE.Matrix4()
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projScreenMatrix)

    scene?.traverse((object) => {
      if ((object as THREE.Mesh).isMesh && object.userData.name) {
        const mesh = object as THREE.Mesh
        const boundingBox = new THREE.Box3().setFromObject(mesh)

        // 获取包围盒的中心点和尺寸
        const center = new THREE.Vector3()
        const size = new THREE.Vector3()
        boundingBox.getCenter(center)
        boundingBox.getSize(size)

        // 创建更密集的采样点
        const points: THREE.Vector3[] = []
        const segments = 4 // 每个维度的分段数

        for (let x = 0; x <= segments; x++) {
          for (let y = 0; y <= segments; y++) {
            for (let z = 0; z <= segments; z++) {
              points.push(
                new THREE.Vector3(
                  boundingBox.min.x + (size.x * x) / segments,
                  boundingBox.min.y + (size.y * y) / segments,
                  boundingBox.min.z + (size.z * z) / segments,
                ),
              )
            }
          }
        }

        // 检查是否有任何点在选择框内
        const isSelected = points.some((point) => {
          const screenPosition = point.clone().project(camera)
          const screenX = (screenPosition.x * 0.5 + 0.5) * (canvasDom?.clientWidth ?? 0)
          const screenY = (-screenPosition.y * 0.5 + 0.5) * (canvasDom?.clientHeight ?? 0)
          return (
            screenX >= rect.left &&
            screenX <= rect.right &&
            screenY >= rect.top &&
            screenY <= rect.bottom &&
            frustum.containsPoint(point)
          )
        })

        if (isSelected) {
          selectedObjects.push(object)
        }
      }
    })
    return selectedObjects
    // console.log("Selected Objects:", selectedObjects)
  }
}
