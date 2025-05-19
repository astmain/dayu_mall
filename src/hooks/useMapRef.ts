//  增强map数据的使用

export function useMap(initialState: Iterable<readonly [unknown, unknown]> | null | undefined) {
  const mapRef = useRef(new Map(initialState))
  const [, reRender] = useReducer((x) => x + 1, 0)

  mapRef.current.set = (...args) => {
    Map.prototype.set.apply(mapRef.current, args)
    reRender()
    return mapRef.current
  }

  mapRef.current.clear = (...args) => {
    Map.prototype.clear.apply(mapRef.current, args)
    reRender()
  }

  mapRef.current.delete = (...args) => {
    const res = Map.prototype.delete.apply(mapRef.current, args)
    reRender()

    return res
  }

  return mapRef.current
}
