import { useEffect, useState } from "react"

export const useActive = ({
  onChange,
  refEl,
}: {
  onChange: (value: boolean) => void
  refEl: React.RefObject<HTMLElement>
}) => {
  const [value, setValue] = useState(false)
  const handleMouseDown = () => {
    setValue(true)
    onChange(true)
  }
  const handleMouseUp = () => {
    setValue(false)
    onChange(false)
  }
  useEffect(() => {
    if (refEl && refEl.current) {
      refEl.current.addEventListener("mousedown", handleMouseDown)
      refEl.current.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      if (refEl && refEl.current) {
        refEl.current.removeEventListener("mousedown", handleMouseDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refEl.current.removeEventListener("mouseup", handleMouseUp)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return value
}
