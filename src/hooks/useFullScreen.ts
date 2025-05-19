const useFullScreen = () => {
  const [isFS, setIsFS] = useState(false)
  const elementFS = useRef<HTMLElement>(null)

  const triggerFS = () => {
    const el = elementFS.current

    if (el) {
      if (el.requestFullscreen) {
        el.requestFullscreen()
      } else if ((el as any).mozRequestFullScreen) {
        ;(el as any).mozRequestFullScreen()
      } else if ((el as any).webkitRequestFullscreen) {
        ;(el as any).webkitRequestFullscreen()
      } else if ((el as any).msRequestFullscreen) {
        ;(el as any).msRequestFullscreen()
      }
    }
  }

  const exitFS = () => {
    const doc = elementFS.current?.ownerDocument
    const isFullscreen = doc?.fullscreen

    if (isFS && isFullscreen) {
      if (doc?.exitFullscreen) doc.exitFullscreen()
      if ((doc as any).mozCancelFullScreen) (doc as any).mozCancelFullScreen()
      if ((doc as any).webkitExitFullscreen) (doc as any).webkitExitFullscreen()
      if ((doc as any).msExitFullscreen) (doc as any).msExitFullscreen()
    }
  }

  useEffect(() => {
    const eventHandler = () => {
      setIsFS((val) => !val)
    }
    document.addEventListener("fullscreenchange", eventHandler)
    return () => {
      document.removeEventListener("fullscreenchange", eventHandler)
    }
  }, [setIsFS])

  return { elementFS, triggerFS, exitFS, isFS }
}

export default useFullScreen
