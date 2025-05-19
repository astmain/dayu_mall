import { useEffect, useRef, useState } from "react"

export function useScript(src: string, options = {}) {
  const [status, setStatus] = useState("loading")
  const optionsRef = useRef(options)

  useEffect(() => {
    let script = document.querySelector(`script[src="${src}"]`)

    const domStatus = script?.getAttribute("data-status")
    if (domStatus) {
      setStatus(domStatus)
      return
    }

    if (script === null) {
      script = document.createElement("script")
      const scriptElement = script as HTMLScriptElement
      scriptElement.src = src
      scriptElement.async = true
      script.setAttribute("data-status", "loading")
      document.body.appendChild(script)

      const handleScriptLoad = () => {
        script?.setAttribute("data-status", "ready")
        setStatus("ready")
        removeEventListeners()
      }

      const handleScriptError = () => {
        script?.setAttribute("data-status", "error")
        setStatus("error")
        removeEventListeners()
      }

      const removeEventListeners = () => {
        script?.removeEventListener("load", handleScriptLoad)
        script?.removeEventListener("error", handleScriptError)
      }

      script.addEventListener("load", handleScriptLoad)
      script.addEventListener("error", handleScriptError)

      const removeOnUnmount = (optionsRef.current as { removeOnUnmount?: boolean }).removeOnUnmount ?? false

      return () => {
        if (removeOnUnmount) {
          script?.remove()
          removeEventListeners()
        }
      }
    } else {
      setStatus("unknown")
    }
  }, [src])

  return status
}

/*
 const status = useScript(
    `https://cdnjs.cloudflare.com/ajax/libs/mootools/1.6.0/mootools-core.js`,
    {
      removeOnUnmount: false,
    }
  );
*/
