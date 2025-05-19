import { message } from "antd"
import * as THREE from "three"
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js"
import { KTX2Exporter } from "three/examples/jsm/exporters/KTX2Exporter.js"
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js"
import { PLYExporter } from "three/examples/jsm/exporters/PLYExporter.js"
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js"
// 引入所有threejs 导出器

// 自动选择相应 导出器
export const chooseExporter = (type: string) => {
  let loader
  switch (type.toLowerCase()) {
    case "gltf":
    case "glb":
      loader = new GLTFExporter()
      break
    case "obj":
      loader = new OBJExporter()
      break
    // case "fbx":
    //   loader = new FBXExporter()
    //   break
    case "stl":
      // case 'x_t':
      loader = new STLExporter()
      break
    case "ply":
      loader = new PLYExporter()
      break
    // case "collada":
    // case "dae":
    //   loader = new ColladaExporter()
    //   break
    // case "3ds":
    //   loader = new TDSExporter()
    //   break
    // case "3dm":
    //   {
    //     loader = new Rhino3dmExporter()
    //     loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/")
    //   }
    //   break
    // case "svg":
    //   loader = new SVGLoader()
    //   break
    // case "vrml":
    // case "wrl":
    //   loader = new VRMLExporter()
    //   break
    // case "pcd":
    //   loader = new PCDExporter()
    //   break
    // case "xyz":
    //   loader = new XYZExporter()
    //   break
    // case "pdb":
    //   loader = new PDBExporter()
    //   break
    case "ktx2":
      loader = new KTX2Exporter()
      break
    // case "json":
    //   loader = new THREE.MaterialLoader()
    //   break
    default:
      console.error("不支持的文件:", type)
      return
  }
  if (!loader) {
    message.error(`当前的文件格式 "${type}" 暂不支持,请更换文件后重试!`)
    throw new Error("Loader not found")
  }
  return loader
}

export const exportGLTFModel = (mesh: THREE.Object3D) => {
  const exporter = new GLTFExporter()
  exporter.parse(
    mesh,
    (result: ArrayBuffer | object) => {
      if (result instanceof ArrayBuffer) {
        saveBlob(result, mesh.userData.name)
      } else {
        const output = JSON.stringify(result, null, 2)
        saveString(output, mesh.userData.name)
      }
    },
    (error) => {
      console.error("导出GLTF模型失败:", error)
    },
    { binary: true },
  )
}

// 保存字符串文件
const saveString = (text: string, filename: string) => {
  saveBlob(text, filename)
}

// 保存文件
const saveBlob = (buffer: ArrayBuffer | string, filename: string) => {
  let blob
  if (typeof buffer === "string") {
    blob = new Blob([buffer], { type: "text/plain" })
  } else {
    blob = new Blob([buffer], { type: "application/octet-stream" })
  }

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

export const exportSTLModel = (mesh: THREE.Object3D) => {
  const exporter = new STLExporter()
  const stlData = exporter.parse(mesh, { binary: true })
  saveBlob(stlData as unknown as ArrayBuffer, mesh.userData.name)
}
