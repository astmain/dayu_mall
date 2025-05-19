import * as THREE from "three"

export function highlightThinWalls(mesh: THREE.Mesh, scene: THREE.Scene) {
  mesh.traverse(function (child: any) {
    if (child.isMesh) {
      const geometry = child.geometry
      geometry.computeVertexNormals() // 计算顶点法线
      const thinAreas = findThinWallsByNormal(geometry, child)
      if (thinAreas.length > 0) {
        createHighlight(thinAreas, child, scene)
      }
    }
  })
}

function findThinWallsByNormal(geometry: THREE.BufferGeometry, mesh: THREE.Mesh) {
  console.log("xzz2021: findThinWallsByNormal -> geometry", geometry)
  //   return []
  const positions = geometry.attributes.position.array
  const normals = geometry.attributes.normal.array
  const thinAreas = []

  // 使用射线检查法线方向上的最短距离
  for (let i = 0; i < positions.length; i += 3 * 50) {
    const x = positions[i]
    const y = positions[i + 1]
    const z = positions[i + 2]
    const nx = normals[i]
    const ny = normals[i + 1]
    const nz = normals[i + 2]

    // 构建射线起点和方向（法线方向）
    const rayOrigin = new THREE.Vector3(x, y, z)
    const rayDirection = new THREE.Vector3(nx, ny, nz).normalize()
    const ray = new THREE.Ray(rayOrigin, rayDirection)

    // 碰撞检测
    const distance = checkRayToSurface(ray, mesh)
    if (distance < 0.0002) {
      // 如果距离小于2mm
      thinAreas.push({ x, y, z })
    }
  }

  return thinAreas
}

function checkRayToSurface(ray: THREE.Ray, mesh: THREE.Mesh) {
  //   const intersects = []
  //   const geometry = mesh.geometry
  const raycaster = new THREE.Raycaster(ray.origin, ray.direction)

  // 使用Raycaster检测射线与模型的交点
  const intersects = raycaster.intersectObject(mesh, true) // true表示穿透检查

  if (intersects.length > 0) {
    let steps = 0
    for (const intersect of intersects) {
      if (steps >= 2) break // 限制最大碰撞次数
      steps++
      return intersect.distance
    }
  }

  return 1000 // 如果没有碰撞，返回最大值
}

function createHighlight(thinAreas: any[], mesh: THREE.Mesh, scene: THREE.Scene) {
  thinAreas.forEach((area) => {
    const geometry = new THREE.SphereGeometry(0.1) // 小球形状
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 1 })
    const sphere = new THREE.Mesh(geometry, material)
    const offsetX = mesh.position.x
    const offsetY = mesh.position.y
    const offsetZ = mesh.position.z
    sphere.position.set(offsetX + area.x, offsetY + area.y, offsetZ + area.z)
    scene.add(sphere) // 将高亮区域添加到场景中

    // Optional: 使用物体材质的透明度
    sphere.material.transparent = true
    sphere.material.opacity = 0.7
  })
}
