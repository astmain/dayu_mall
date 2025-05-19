import { Checkbox } from "antd"

const MeshList = () => {
  const { meshArr, toggleMeshVisible, toggleMeshSelected } = useThreeStore((state) => state)

  const onChange = (_e: any, index: number) => {
    // toggleMeshVisible(index)
    toggleMeshSelected(index)
  }
  const onChangeAll = (e: any) => {
    toggleMeshSelected(e.target.checked)
  }
  const onHiddenAll = (e: any) => {
    toggleMeshVisible(e.target.checked)
  }

  return (
    <>
      <div className="absolute text-[12px] z-[30] h-[220px] w-[130px] top-[120px] left-[10px] gap-[0px] bg-[#fff] rounded-[10px] p-[4px] flex flex-col">
        <div className="f">零件列表</div>
        <div className="list flex-1 overflow-auto">
          {meshArr.map((item, index) => (
            <div key={index} className="flex items-center h-[30px] cursor-pointer gap-[2px]">
              <div className="index min-w-[12px]">{index + 1}</div>
              <div className="d mx-[2px]">
                <Checkbox onChange={(e) => onChange(e, index)} checked={item.userData.isSelected}></Checkbox>
              </div>
              <div onClick={() => toggleMeshVisible(index)}>
                <i className="iconfont icon-xianshikejian" style={{ color: item.visible ? "#1366f0" : "#ccc" }}></i>
              </div>
              <div className="text-[10px] text-hidden">{item.userData.name}</div>
            </div>
          ))}
        </div>
        <div className="operation">
          <div>
            <Checkbox onChange={onChangeAll} checked={meshArr.every((item) => item.userData.isSelected)}>
              选择
            </Checkbox>
            <Checkbox onChange={onHiddenAll} checked={meshArr.every((item) => item.visible)}>
              显示
            </Checkbox>
          </div>
        </div>
      </div>
    </>
  )
}

export default MeshList
