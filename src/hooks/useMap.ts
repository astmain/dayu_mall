import { useCallback, useState } from "react"

const useMap = (initialValue = new Map()) => {
  const [map, setMap] = useState(initialValue)

  const set = useCallback((key: any, value: any) => {
    setMap((prev) => {
      const newMap = new Map(prev)
      newMap.set(key, value)
      return newMap
    })
  }, [])

  const remove = useCallback((key: any) => {
    setMap((prev) => {
      const newMap = new Map(prev)
      newMap.delete(key)
      return newMap
    })
  }, [])

  const clear = useCallback(() => {
    setMap(new Map())
  }, [])

  const get = useCallback((key: any) => map.get(key), [map])

  return { map, set, remove, clear, get }
}

export default useMap
