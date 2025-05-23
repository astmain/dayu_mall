export function useMeasure() {
  const [dimensions, setDimensions] = useState<{
    width: number | null
    height: number | null
  }>({
    width: null,
    height: null,
  })

  const previousObserver = useRef<ResizeObserver | null>(null)

  const customRef = useCallback((node: Element | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect()
      previousObserver.current = null
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0]

          setDimensions({ width, height })
        }
      })

      observer.observe(node)
      previousObserver.current = observer
    }
  }, [])

  return [customRef, dimensions] as const
}
