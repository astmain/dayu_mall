// import * as THREE from "three"
// import { CSG } from "three-csg-ts"

// // 创建带有壁厚的外壳
// export const createShell = (mesh: THREE.Mesh, _thickness: number = 0.002): THREE.Mesh => {
//   // 将原始模型转换为 CSG 对象
//   // 创建偏移后的几何体
//   // 获取原始几何体的尺寸
//   // const box = new THREE.Box3().setFromObject(mesh)
//   // const size = new THREE.Vector3()
//   // box.getSize(size)
//   // const width = size.x
//   // const height = size.y
//   // const depth = size.z

//   // // 计算内缩后的几何体
//   // const innerGeometry = new THREE.BoxGeometry(
//   //   width - thickness * 0.002, // 每个方向缩小的尺寸（2mm）
//   //   height - thickness * 0.002,
//   //   depth - thickness * 0.002,
//   // )

//   // // 内缩几何体的 Mesh
//   // const innerMesh = new THREE.Mesh(innerGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }))

//   // // 使用 CSG 进行减法操作，创建抽壳效果
//   // const originalCSG = CSG.fromMesh(mesh)
//   // const innerCSG = CSG.fromMesh(innerMesh)
//   // const resultCSG = originalCSG.subtract(innerCSG) // 从原始模型中减去内缩的几何体

//   // // 将减法结果转化为 Mesh 并返回
//   // const resultMesh = CSG.toMesh(resultCSG, mesh.matrix)
//   // return resultMesh

//   const newMesh = mesh.clone()
//   // newMesh.geometry.scale(scaleFactor, scaleFactor, scaleFactor)
//   // newMesh.geometry.computeBoundingBox() // 更新几何体边界
//   const geometry = newMesh.geometry.clone()
//   // 避免污染原模型
//   const scaleFactor = 0.5
//   geometry.scale(scaleFactor, scaleFactor, scaleFactor) // 等比例缩放几何体
//   geometry.computeBoundingBox() // 更新几何体边界
//   newMesh.geometry = geometry
//   // return newMesh

//   newMesh.position.copy(mesh.position) // 确保对齐
//   mesh.updateMatrix()
//   newMesh.updateMatrix()
//   console.log("xzz2021: newMesh", newMesh)
//   // const originalCSG = CSG.fromMesh(mesh)
//   // const innerCSG = CSG.fromMesh(newMesh)
//   // const resultCSG = originalCSG.subtract(innerCSG) // 从原始模型中减去内缩的几何体
//   const resultCSG = CSG.subtract(mesh, newMesh) // 从原始模型中减去内缩的几何体
//   console.log("xzz2021: resultCSG", resultCSG)
//   const resultMesh = new THREE.Mesh(resultCSG.geometry, mesh.material)
//   return resultMesh
// }

// // 偏移几何体的函数，沿法线方向移动顶点
// // function expandGeometry(mesh: THREE.Mesh, thickness: number): THREE.Mesh {
// //   const geometry = mesh.geometry.clone()

// //   const positions = geometry.attributes.position.array
// //   const normals = geometry.attributes.normal.array

// //   // 沿法线方向偏移顶点
// //   for (let i = 0; i < positions.length; i += 3) {
// //     const x = positions[i]
// //     const y = positions[i + 1]
// //     const z = positions[i + 2]

// //     const nx = normals[i]
// //     const ny = normals[i + 1]
// //     const nz = normals[i + 2]

// //     // 偏移顶点位置
// //     positions[i] = x + nx * thickness
// //     positions[i + 1] = y + ny * thickness
// //     positions[i + 2] = z + nz * thickness
// //   }

// //   geometry.attributes.position.needsUpdate = true

// //   return new THREE.Mesh(geometry, mesh.material)
// // }
