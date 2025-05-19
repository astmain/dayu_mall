import { useState } from "react"

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = () => {
    setValue((prev) => !prev)
  }

  return [value, toggle]
}

export default useToggle

export const useToggle2 = (initial: boolean) => {
  const [open, setOpen] = useState(initial)

  return [open, useCallback(() => setOpen((status) => !status), [])]
}

/*
使用示例：

const [isToggled, toggle] = useToggle();

*/
