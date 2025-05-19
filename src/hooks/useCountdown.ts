import { useCallback, useEffect, useState } from "react"

const useCountdown = (initialTime = 60, key = "countdown") => {
  const [remainingTime, setRemainingTime] = useState(() => {
    const savedTime = localStorage.getItem(key)
    if (savedTime) {
      const elapsedTime = Math.floor((Date.now() - JSON.parse(savedTime)) / 1000)
      return Math.max(initialTime - elapsedTime, 0)
    }
    return 0
  })

  const [isActive, setIsActive] = useState(remainingTime > 0)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (isActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setIsActive(false)
            localStorage.removeItem(key)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isActive, remainingTime, key])

  const startCountdown = useCallback(() => {
    if (!isActive) {
      setRemainingTime(initialTime)
      setIsActive(true)
      localStorage.setItem(key, JSON.stringify(Date.now()))
    }
  }, [isActive, initialTime, key])

  return { remainingTime, isActive, startCountdown }
}

export default useCountdown
