function getSize(el: HTMLElement | null) {
  if (!el) {
    return {}
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  }
}

function useComponentSize(ref: React.RefObject<HTMLElement>) {
  const [componentSize, setComponentSize] = useState(getSize(ref.current))

  function handleResize() {
    if (ref && ref.current) {
      setComponentSize(getSize(ref.current))
    }
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return componentSize
}

export default useComponentSize
