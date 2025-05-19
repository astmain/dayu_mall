import { useMemo, useState } from "react"

export interface UseSelectionsResult<T> {
  selected: T[] // 当前选中的项
  allSelected: boolean // 是否全选
  noneSelected: boolean // 是否没有选中任何项
  partiallySelected: boolean // 是否半选
  isSelected: (item: T) => boolean // 判断某项是否选中
  toggle: (item: T) => void // 切换某项的选中状态
  toggleAll: () => void // 切换全选/全不选
  clear: () => void // 清空所有选中项
}

const useSelections = <T>(items: T[]): UseSelectionsResult<T> => {
  const [selected, setSelected] = useState<T[]>([])

  // 判断是否选中某项
  const isSelected = (item: T) => selected.includes(item)

  // 切换某项的选中状态
  const toggle = (item: T) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  // 切换全选/全不选
  const toggleAll = () => {
    setSelected((prev) => (prev.length === items.length ? [] : [...items]))
  }

  // 清空所有选中项
  const clear = () => {
    setSelected([])
  }

  // 是否全选
  const allSelected = useMemo(() => selected.length === items.length, [selected, items])

  // 是否没有选中任何项
  const noneSelected = useMemo(() => selected.length === 0, [selected])

  // 是否半选
  const partiallySelected = useMemo(() => !allSelected && !noneSelected, [allSelected, noneSelected])

  return {
    selected,
    allSelected,
    noneSelected,
    partiallySelected,
    isSelected,
    toggle,
    toggleAll,
    clear,
  }
}

export default useSelections

/*

<div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
        <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
          Check all
        </Checkbox>
        <Checkbox checked={hideOdd} onClick={() => setHideOdd((v) => !v)}>
          Hide Odd
        </Checkbox>
      </div>
      <Row style={{ padding: '10px 0' }}>
        {list.map((o) => (
          <Col span={12} key={o}>
            <Checkbox checked={isSelected(o)} onClick={() => toggle(o)}>
              {o}
            </Checkbox>
          </Col>
        ))}
      </Row>


      */
