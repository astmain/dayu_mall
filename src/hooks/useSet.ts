import { useCallback, useState } from "react"

const useSet = (initialValue = new Set()) => {
  const [set, setSet] = useState(initialValue)

  const add = useCallback((value: any) => {
    setSet((prev) => {
      const newSet = new Set(prev)
      newSet.add(value)
      return newSet
    })
  }, [])

  const remove = useCallback((value: any) => {
    setSet((prev) => {
      const newSet = new Set(prev)
      newSet.delete(value)
      return newSet
    })
  }, [])

  const clear = useCallback(() => {
    setSet(new Set())
  }, [])

  const has = useCallback((value: any) => set.has(value), [set])

  return { set, add, remove, clear, has }
}

export default useSet
