export function useClickAway(cb: any) {
  const ref = useRef(null)
  const refCb = useRef(cb)

  useLayoutEffect(() => {
    refCb.current = cb
  })

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current as HTMLElement | null
      if (element && !element.contains(e.target as Node)) {
        refCb.current(e)
      }
    }

    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [])

  return ref
}
