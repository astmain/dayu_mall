// import * as THREE from "three"

// const toggleCrossSection = (renderer: THREE.WebGLRenderer, mesh: THREE.Mesh | any, scene: THREE.Scene) => {
//   const flag = isOpenCrossSection.value
//   // 启用或关闭全局剪裁平面
//   renderer.localClippingEnabled = !flag

//   if (!flag) {
//     if (!crossSectionArr.length) {
//       const { crossSectionItems, gui, planes } = crossSection(mesh, scene)
//       crossSectionArr = crossSectionItems
//       currentGui.value = gui
//       currentPlanes = planes
//     }
//     mesh &&
//       mesh.traverse(function (child: any) {
//         if (child.isMesh) {
//           // 外部材质
//           child.material = new THREE.MeshStandardMaterial({
//             color: 0xffffff,
//             side: THREE.FrontSide,
//             clippingPlanes: currentPlanes,
//             transparent: false,
//             opacity: 1,
//             depthWrite: true, //  此处一定要开启  不然会有穿透
//             depthTest: true, // 启用深度测试
//             // clipShadows: true
//           })
//         }
//       })
//     currentGui.value.show(true)
//     crossSectionArr.map((item: any) => {
//       scene.add(item)
//     })
//   } else {
//     // 关闭全局剪裁平面
//     currentGui.value.show(false)
//     mesh &&
//       mesh.traverse(function (child: any) {
//         if (child.isMesh) {
//           // 外部材质
//           child.material = new THREE.MeshStandardMaterial({
//             color: 0xffffff,
//             metalness: 0.3,
//             roughness: 0.3,
//             transparent: true,
//           })
//         }
//       })
//     crossSectionArr.map((item: any) => {
//       scene.remove(item)
//     })
//   }
//   isOpenCrossSection.value = !flag
// }
