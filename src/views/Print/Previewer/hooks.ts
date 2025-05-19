// import * as THREE from "three"

import { boxSelection } from "./three/boxSelection"
import initialThree from "./three/initial"
import { screenshot } from "./three/initialScreenShot"
import { loadModel } from "./three/loader"
// import { createShell } from "./three/shell"
// import { highlightThinWalls } from "./three/thinwalls"
import { initialCamera, initialLabel, initialStatus, showContourlines } from "./three/utils"

export const useStartLoading = () => {
  const toggleLoading = useGlobalStore((state) => state.toggleLoading)
  const { addMesh, updateOccupancy, setSelectedMesh, isFirstLoad } = useThreeStore((state) => state)

  const startLoading = async (modelUrl: string, fileType: string, fileName: string) => {
    const { scene, camera } = initialThree.getInitialData()
    if (!scene) {
      console.error("Scene is null")
      return
    }
    const mesh: any = await loadModel(modelUrl, fileType)
    mesh.userData.name = fileName
    // addRawMesh(mesh)
    initialStatus(mesh, useThreeStore.getState().occupancy)
    initialLabel(mesh)
    showContourlines(mesh)
    await screenshot(mesh)

    scene.add(mesh.userData.centerMarker) //   中心原点mesh
    scene.add(mesh)
    console.log("xzz2021: startLoading -> mesh", mesh)
    // const cameraHelper = new THREE.CameraHelper(camera)
    // scene.add(cameraHelper)
    addMesh(mesh)
    // const shellMesh = createShell(mesh)
    // scene.add(shellMesh)

    updateOccupancy(mesh.userData.size.x, mesh.userData.size.z)
    initialCamera(useThreeStore.getState().occupancy, camera)
    // highlightThinWalls(mesh, scene)
    if (isFirstLoad) {
      boxSelection(setSelectedMesh)
    }
  }

  const cloneNewMesh = async (mesh: any) => {
    const { scene, camera } = initialThree.getInitialData()
    if (!scene) {
      return console.error("Scene is null")
    }
    toggleLoading()
    const newMesh = mesh.clone()
    newMesh.userData.name = mesh.userData.name.split(".")[0] + "_clone" + mesh.id + mesh.userData.name.split(".")[1]
    initialStatus(newMesh, useThreeStore.getState().occupancy)
    initialLabel(newMesh)
    scene.add(newMesh.userData.centerMarker) //   中心原点mesh
    scene.add(newMesh)
    addMesh(newMesh)
    updateOccupancy(newMesh.userData.size.x, newMesh.userData.size.z)
    initialCamera(useThreeStore.getState().occupancy, camera)
    toggleLoading()
  }

  return { startLoading, cloneNewMesh }
}
