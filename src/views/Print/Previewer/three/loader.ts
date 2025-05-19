import { message } from "antd"
import * as THREE from "three"
import { Rhino3dmLoader } from "three/addons/loaders/3DMLoader.js"
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader.js"
import { PDBLoader } from "three/examples/jsm/loaders/PDBLoader.js"
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader.js"
import { VRMLLoader } from "three/examples/jsm/loaders/VRMLLoader.js"
import { XYZLoader } from "three/examples/jsm/loaders/XYZLoader.js"

// 自动选择相应 加载器
export const chooseLoader = (type: string) => {
  let loader
  switch (type.toLowerCase()) {
    case "gltf":
    case "glb":
      loader = new GLTFLoader()
      break
    case "obj":
      loader = new OBJLoader()
      break
    case "fbx":
      loader = new FBXLoader()
      break
    case "stl":
      // case 'x_t':
      loader = new STLLoader()
      break
    case "ply":
      loader = new PLYLoader()
      break
    case "collada":
    case "dae":
      loader = new ColladaLoader()
      break
    case "3ds":
      loader = new TDSLoader()
      break
    case "3dm":
      {
        loader = new Rhino3dmLoader()
        loader.setLibraryPath("https://cdn.jsdelivr.net/npm/rhino3dm@8.0.1/")
      }
      break
    case "svg":
      loader = new SVGLoader()
      break
    case "vrml":
    case "wrl":
      loader = new VRMLLoader()
      break
    case "pcd":
      loader = new PCDLoader()
      break
    case "xyz":
      loader = new XYZLoader()
      break
    case "pdb":
      loader = new PDBLoader()
      break
    case "ktx2":
      loader = new KTX2Loader()
      break
    case "json":
      loader = new THREE.MaterialLoader()
      break
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

export const LoadStep = async (fileUrl: string) => {
  // init occt-import-js   已全局引入
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const occt = await occtimportjs()
  // console.log("TCL: LoadStep -> occt", occt)
  const response = await fetch(fileUrl)
  const buffer = await response.arrayBuffer()
  // read the imported step file
  const fileBuffer = new Uint8Array(buffer)
  const result = occt.ReadStepFile(fileBuffer, null)
  // process the geometries of the result
  const resultMesh = result.meshes[0]
  const geometry = new THREE.BufferGeometry()

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(resultMesh.attributes.position.array, 3))
  if (resultMesh.attributes.normal) {
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(resultMesh.attributes.normal.array, 3))
  }
  const index = Uint32Array.from(resultMesh.index.array)
  geometry.setIndex(new THREE.BufferAttribute(index, 1))

  let material = null
  if (resultMesh.color) {
    const color = new THREE.Color(resultMesh.color[0], resultMesh.color[1], resultMesh.color[2])
    material = new THREE.MeshPhongMaterial({ color: color })
  } else {
    //  side 属性很重要  用于剖面空心状态的显示
    // material = new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.BackSide })
    material = new THREE.MeshPhongMaterial({ color: 0xcccccc })
  }
  return { geometry, material }
}

export const LoadIges = async (fileUrl: string) => {
  // init occt-import-js   已全局引入
  // eslint-disable-next-line no-undef, @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const occt = await occtimportjs()
  // download a step file
  const response = await fetch(fileUrl)
  const buffer = await response.arrayBuffer()
  // read the imported step file
  const fileBuffer = new Uint8Array(buffer)
  // let igesResult = occt.ReadIgesFile(fileBuffer, null);
  const result = occt.ReadIgesFile(fileBuffer, null)
  if (result.success) {
    const mergedGeometry = new THREE.BufferGeometry()
    const positionArray: any = []
    const normalArray: any = []
    const indexArray: any = []

    let offset = 0

    result.meshes.forEach((mesh: any) => {
      positionArray.push(...mesh.attributes.position.array)
      if (mesh.attributes.normal) {
        normalArray.push(...mesh.attributes.normal.array)
      }
      if (mesh.index) {
        mesh.index.array.forEach((index: number) => {
          indexArray.push(index + offset)
        })
        offset += mesh.attributes.position.array.length / 3
      }
    })
    const positions = new Float32Array(positionArray)
    mergedGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    if (normalArray.length > 0) {
      const normals = new Float32Array(normalArray)
      mergedGeometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3))
    }
    if (indexArray.length > 0) {
      const indices = new Uint32Array(indexArray)
      mergedGeometry.setIndex(new THREE.BufferAttribute(indices, 1))
    }
    mergedGeometry.computeBoundingBox()
    mergedGeometry.computeBoundingSphere()
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    return { geometry: mergedGeometry, material }
  } else {
    console.error("IGES文件加载失败")
  }
}

export const loadModel = async (modelUrl: string, fileType: string) => {
  // openLoading() // 开启加载效果
  let loadView
  //  特殊3d文件类型判断, 使用自定义的加载方法, 不走官方loader判断
  if (fileType == "stp" || fileType == "step") {
    loadView = await LoadStep(modelUrl)
  } else if (fileType == "iges" || fileType == "igs") {
    loadView = await LoadIges(modelUrl)
  }
  if (loadView) {
    const { geometry, material } = loadView
    return new THREE.Mesh(geometry, material)
  }
  // 其他常规3d文件走这里   // 获取对应的模型加载器
  const loader = chooseLoader(fileType)!
  if (!loader) return message.error(`当前的文件格式 "${fileType}" 暂不支持,请更换文件后重试!`)
  return await rawLoader(modelUrl, loader, fileType)
}

const rawLoader = async (blobUrl: string, loader: any, fileType: string) => {
  return new Promise((resolve, reject) => {
    loader.load(
      blobUrl,
      (object: any) => {
        if (fileType == "3dm") {
          return object
        }
        const simpleArr = ["obj", "dae", "3ds"]
        const material = new THREE.MeshStandardMaterial({
          metalness: 0.5, // 0.3
          roughness: 0.3, // 0.3
          transparent: true,
        })
        const mesh = simpleArr.includes(fileType) ? object.scene || object : new THREE.Mesh(object, material)
        mesh.castShadow = true // 投射阴影
        mesh.receiveShadow = true // 接收阴影
        // let geometry: THREE.BufferGeometry | null = null
        // // const simpleArr = ['obj', 'dae', '3ds']
        // if ((object as THREE.Mesh).isMesh) {
        //   // 如果 object 是一个 Mesh，则可以直接获取 geometry
        //   geometry = (object as THREE.Mesh).geometry as THREE.BufferGeometry
        // } else if ((object as THREE.Group).isGroup) {
        //   // 如果 object 是一个 Group，尝试从其子元素中获取 geometry
        //   const child = (object as THREE.Group).children[0]
        //   if (child && (child as THREE.Mesh).isMesh) {
        //     geometry = (child as THREE.Mesh).geometry as THREE.BufferGeometry
        //   }
        // } else if ((object as any).scene) {
        //   // 如果 object 包含场景，尝试从场景中获取 geometry
        //   const scene = (object as any).scene
        //   const child = scene.children[0]
        //   if (child && (child as THREE.Mesh).isMesh) {
        //     geometry = (child as THREE.Mesh).geometry as THREE.BufferGeometry
        //   }
        // }
        // const material = new THREE.MeshStandardMaterial({
        //   metalness: 0.3,
        //   roughness: 0.3,
        //   transparent: true,
        // })
        // // const mesh = simpleArr.includes(fileType) ? geometry : new THREE.Mesh(geometry!, material)
        // const mesh = geometry ? new THREE.Mesh(geometry, material) : object
        resolve(mesh)
      },
      undefined,
      (error: any) => {
        message.error("模型加载出错, 出错原因:" + error)
        reject(error)
      },
    )
  })
}
