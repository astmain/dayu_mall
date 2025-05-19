const isClient = !!(typeof window !== "undefined" && window.document && window.document.createElement)

function useEventListener(
  eventName: keyof WindowEventMap,
  handler: (event: Event) => void,
  element = isClient ? window : undefined,
) {
  const savedHandler = useRef<{ handler: (event: Event) => void }>({ handler })

  useEffect(() => {
    savedHandler.current.handler = handler
  }, [handler])

  useEffect(() => {
    // Make sure element supports addEventListener
    // On
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event: Event) => savedHandler.current.handler(event)
    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

export default useEventListener
