import { create } from "zustand"

interface ThreeStore {
  meshArr: any[]
  initialData: any
  occupancy: { x: number; z: number; place: string }
  selectedMesh: any[] // add current mesh for interaction  用来添加当前所操作的模型  接收一个模型的实例
  fnSwitch: { chooseMesh: boolean } // add fnSwitch state  用来添加功能开关  接收一个功能的 key 和 boolean 值
  isFirstLoad: boolean
  setIsFirstLoad: (bool: boolean) => void
  addMesh: (mesh: any) => void
  updateInitialData: (data: any) => void // update initial data for three.js scene and camera settings  用来更新 three.js场景和相机设置  接收一个新的初始数据
  resetData: () => void // reset data to initial state
  toggleMeshVisible: (index: any) => void // toggle mesh visibility by index  用来切换模型的可见性  接收一个模型的 index
  toggleMeshSelected: (index: any) => void // toggle mesh selected by index  用来切换模型的选择状态  接收一个模型的 index
  updateOccupancy: (x2: number, z2: number) => void // update occupancy position by x and z  用来更新模型占用位置  接收 x 和 z 值
  // addSelectedMesh: (mesh: any) => void // add current mesh for interaction  用来添加当前所操作的模型  接收一个模型的实例
  setSelectedMesh: (meshs: any[]) => void // set current mesh for interaction  用来设置当前所操作的模型  接收一个模型的实例
  getSelectedMesh: () => any[] // get selected mesh for interaction  用来获取当前所操作的模型  返回一个模型的实例数组
  updateSelectedMesh: () => void // update selected mesh for interaction  用来更新当前所操作的模型  接收一个模型的实例
  toggleFnSwitch: (key: keyof ThreeStore["fnSwitch"]) => void // update fnSwitch state  用来更新功能开关  接收一个功能的 key 和 boolean 值
  cloneMesh: () => any[] // clone mesh for interaction  用来克隆模型  接收一个模型的实例数组
}
export const useThreeStore = create<ThreeStore>((set, get) => ({
  meshArr: [],
  initialData: {},
  occupancy: { x: 0, z: 0, place: "z" },
  selectedMesh: [],
  fnSwitch: {
    chooseMesh: false,
  },
  isFirstLoad: true,
  setIsFirstLoad: (bool: boolean) => set(() => ({ isFirstLoad: bool })),
  addMesh: (mesh: any) =>
    set((state) => ({
      meshArr: [...state.meshArr, mesh],
      selectedMesh: [...state.selectedMesh, mesh],
    })),
  toggleMeshVisible: (index: number | boolean) =>
    set((state) => {
      const meshArr = [...state.meshArr]
      if (typeof index === "number") {
        meshArr[index].visible = !meshArr[index].visible
        meshArr[index].userData.centerMarker.visible = !meshArr[index].userData.centerMarker.visible
      } else {
        meshArr.forEach((item) => {
          item.visible = index
          item.userData.centerMarker.visible = index
        })
      }
      return { meshArr } // { ...state, meshArr }  这里会自动合并state
    }),
  toggleMeshSelected: (index: number | boolean) =>
    set((state) => {
      const meshArr = [...state.meshArr]
      if (typeof index === "number") {
        meshArr[index].userData.isSelected = !meshArr[index].userData.isSelected
      } else {
        meshArr.forEach((item) => {
          item.userData.isSelected = index
        })
      }
      console.log("xzz2021: meshArr", meshArr)
      get().updateSelectedMesh()
      return { meshArr }
    }),
  setSelectedMesh: (meshs: any[]) =>
    set((state) => {
      if (!meshs.length) return {}
      const meshArr = [...state.meshArr]
      meshArr.map((item) => {
        // item.userData.isSelected = meshs.includes(item)
        item.userData.isSelected = meshs.some((mesh) => mesh.id == item.id)
      })
      state.updateSelectedMesh()
      return { meshArr }
    }),
  // other methods and state updates...
  updateInitialData: (data: any) => set(() => ({ initialData: data })),
  resetData: () => set(() => ({ meshArr: [], initialData: {} })), // reset data to initial state
  updateOccupancy: (x2: number, z2: number) =>
    set((state) => {
      const { x, z, place } = state.occupancy
      const newPlace = place == "x" ? "z" : "x"
      if (x == 0) {
        return { occupancy: { x: x + x2, z: z + z2, place: newPlace } }
      }
      return { occupancy: { x: x + (place == "x" ? x2 : 0), z: z + (place == "z" ? z2 : 0), place: newPlace } }
    }), // update occupancy
  // setSelectedMesh: (meshs: any) =>
  // set((state) => {
  //   get().updateSelectedMesh()
  // }),
  // addSelectedMesh: (mesh: any) =>
  //   set((state) => {
  //     // if (!mesh.isMesh) return {} // 如果点击的是非模型，不做任何操作  否则会报错
  //     // if (state.currentMesh?.id == mesh.id) return {} // 如果点击的是同一个模型，不做任何操作  否则会报错
  //     const meshArr = [...state.meshArr, mesh]
  //     meshArr.map((item) => [
  //       item.userData.centerMarker.material.color.set(0x646464), //  0x00ff00
  //     ])
  //     mesh.userData.centerMarker.material.color.set(0x00ff00) //
  //     return { meshArr, selectedMesh: mesh }
  //   }),
  updateSelectedMesh: () =>
    set((state) => {
      const meshArr = [...state.meshArr]
      const selectedMesh: any[] = []
      meshArr.map((item) => {
        const isSelected = item.userData.isSelected
        isSelected && selectedMesh.push(item)
        item.userData.centerMarker.material.color.set(isSelected ? 0x00ff00 : 0x646464) //  0x00ff00
      })
      return { meshArr, selectedMesh }
    }),
  cloneMesh: () => {
    const meshs = get().getSelectedMesh()
    meshs.forEach((mesh) => {
      const newMesh = mesh.clone()
      get().addMesh(newMesh)
    })
    get().updateSelectedMesh()
    return meshs
  },
  getSelectedMesh: () => {
    const meshArr = [...get().meshArr]
    return meshArr.filter((item) => item.userData.isSelected)
  },
  toggleFnSwitch: (key: keyof ThreeStore["fnSwitch"]) => {
    set((state) => ({
      fnSwitch: {
        ...state.fnSwitch,
        [key]: !state.fnSwitch[key],
      },
    }))
  },
}))
