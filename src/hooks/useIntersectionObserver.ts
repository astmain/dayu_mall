//  优化性能 控制元素可见性
interface OptionsType {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export function useIntersectionObserver<T extends OptionsType>(options: T) {
  const { threshold = 1, root = null, rootMargin = "0px" } = options
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  const previousObserver = useRef<IntersectionObserver | null>(null)

  const customRef = useCallback(
    (node: T) => {
      if (previousObserver.current) {
        previousObserver.current.disconnect()
        previousObserver.current = null
      }

      if (node && node instanceof Element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setEntry(entry)
          },
          { threshold, root, rootMargin },
        )

        observer.observe(node)
        previousObserver.current = observer
      }
    },
    [threshold, root, rootMargin],
  )

  return [customRef, entry]
}
