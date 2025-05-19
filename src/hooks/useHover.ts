export function useHover(): [(node: Element | null) => void, boolean] {
  const [hovering, setHovering] = useState(false)
  const previousNode = useRef<Element | null>(null)

  const handleMouseEnter = useCallback(() => {
    setHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovering(false)
  }, [])

  const customRef = useCallback(
    (node: Element | null) => {
      if (previousNode.current) {
        previousNode.current.removeEventListener("mouseenter", handleMouseEnter)
        previousNode.current.removeEventListener("mouseleave", handleMouseLeave)
      }

      if (node) {
        node.addEventListener("mouseenter", handleMouseEnter)
        node.addEventListener("mouseleave", handleMouseLeave)
      }

      previousNode.current = node
    },
    [handleMouseEnter, handleMouseLeave],
  )

  return [customRef, hovering]
}

export const useHover2 = () => {
  const [value, setValue] = useState(false)

  // Wrap in useCallback so we can use in dependencies below
  const handleMouseOver = useCallback(() => setValue(true), [])
  const handleMouseOut = useCallback(() => setValue(false), [])

  // Keep track of the last node passed to callbackRef so we can remove its event listeners.
  const ref = useRef<Element | null>(null)

  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback(
    (node: Element | null) => {
      if (ref.current) {
        ref.current.removeEventListener("mouseover", handleMouseOver)
        ref.current.removeEventListener("mouseout", handleMouseOut)
      }

      ref.current = node

      if (ref.current) {
        ref.current.addEventListener("mouseover", handleMouseOver)
        ref.current.addEventListener("mouseout", handleMouseOut)
      }
    },
    [handleMouseOver, handleMouseOut],
  )

  return [callbackRef, value]
}
