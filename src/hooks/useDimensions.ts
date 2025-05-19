import { SetStateAction } from "react"

import debounce from "@/utils/debounce"

function useDimensions(liveMeasure = true, delay = 250, initialDimensions = {}, effectDeps = []) {
  const [dimensions, setDimensions] = useState(initialDimensions)
  const [node, setNode] = useState(null)

  const ref = useCallback((newNode: SetStateAction<null>) => {
    setNode(newNode)
  }, [])

  useLayoutEffect(() => {
    // need ref to continue
    if (!node) {
      return
    }

    const measure = () => {
      window.requestAnimationFrame(() => {
        const newDimensions = (node as HTMLElement).getBoundingClientRect()
        setDimensions(newDimensions)
      })
    }
    // invoke measure right away
    measure()

    if (liveMeasure) {
      const debounceMeasure = debounce(measure, delay)

      if ("ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(debounceMeasure)
        resizeObserver.observe(node)
        window.addEventListener("scroll", debounceMeasure)

        return () => {
          resizeObserver.disconnect()
          window.removeEventListener("scroll", debounceMeasure)
        }
      }
      ;(window as Window).addEventListener("resize", debounceMeasure)
      ;(window as Window).addEventListener("scroll", debounceMeasure)

      return () => {
        window.removeEventListener("resize", debounceMeasure)
        window.removeEventListener("scroll", debounceMeasure)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, liveMeasure, node, ...effectDeps])

  return [ref, dimensions, node]
}

export default useDimensions
