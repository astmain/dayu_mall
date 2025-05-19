import * as THREE from "three"

export const toggleLabel = (mesh: THREE.Mesh[], scene: THREE.Scene) => {
  if (!mesh) return
  mesh.forEach((item) => {
    const showLabel = item.userData?.showLabel || false
    if (!showLabel) {
      item.userData.labelArr.map((item: THREE.Object3D<THREE.Object3DEventMap>) => {
        scene.add(item)
      })
    } else {
      item.userData.labelArr.map((item: THREE.Object3D<THREE.Object3DEventMap>) => {
        scene.remove(item)
      })
    }
    item.userData.showLabel = !item.userData.showLabel
  })
}

export const screenshot = async (selectedMesh: THREE.Mesh[]) => {
  const download = (mesh: THREE.Mesh) => {
    const imgurl = mesh.userData.imgUrl
    const imgName = mesh.userData.name
    if (!imgurl) return
    // 下载
    const a = document.createElement("a")
    a.href = imgurl
    a.download = `${imgName}.jpg`
    a.click()
  }
  selectedMesh.map((mesh: any) => {
    download(mesh)
  })
}

const toggle = (mesh: THREE.Mesh, isFlag?: boolean) => {
  const flag = isFlag == undefined ? mesh.userData?.transparent || false : isFlag
  const newTransparent = !flag

  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material: any) => {
      material.transparent = newTransparent
      material.opacity = flag ? 1 : 0.5
      material.depthWrite = !newTransparent // 关闭深度写入对于透明材质是必要的
      material.side = THREE.DoubleSide // 确保前面可见
    })
  } else {
    mesh.material.transparent = newTransparent
    mesh.material.opacity = flag ? 1 : 0.5
    mesh.material.depthWrite = !newTransparent // 关闭深度写入对于透明材质是必要的
    mesh.material.side = THREE.DoubleSide // 确保前面可见
  }
  isFlag == undefined && (mesh.userData.transparent = newTransparent)
}

const closeTransparent = (meshArr: THREE.Mesh[]) => {
  meshArr.map((mesh: THREE.Mesh) => {
    toggle(mesh, true)
  })
}
export const toggleTransparent = (meshArr: THREE.Mesh[], selectedMesh: THREE.Mesh[]) => {
  // 全部取消透明
  closeTransparent(meshArr)
  // 选中应用透明
  selectedMesh.map((mesh: THREE.Mesh) => {
    toggle(mesh)
  })
}
