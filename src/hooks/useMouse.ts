interface NewStateType {
  x: number
  y: number
  elementX: number
  elementY: number
  elementPositionX: number
  elementPositionY: number
}

export function useMouse() {
  const [state, setState] = useState<NewStateType>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  })

  const ref = useRef<Element | null>(null)

  useLayoutEffect(() => {
    const handleMouseMove = (event: { pageX: number; pageY: number }) => {
      const newState = {
        x: event.pageX,
        y: event.pageY,
      }

      if (ref.current && ref.current.nodeType) {
        const { left, top } = (ref.current as Element).getBoundingClientRect()
        const elementPositionX = left + window.scrollX
        const elementPositionY = top + window.scrollY
        const elementX = event.pageX - elementPositionX
        const elementY = event.pageY - elementPositionY

        Object.assign(newState, {
          elementX,
          elementY,
          elementPositionX,
          elementPositionY,
        })
      }

      setState((s) => {
        return {
          ...s,
          ...newState,
        }
      })
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return [state, ref]
}
