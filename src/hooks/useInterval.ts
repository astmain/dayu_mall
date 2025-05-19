import { useEffect, useState } from "react"

export const useInterval = ({
  startImmediate,
  duration,
  callback,
}: {
  startImmediate?: boolean
  duration: number
  callback: () => void
}) => {
  const [count, updateCount] = useState(0)
  const [intervalState, setIntervalState] = useState(startImmediate === undefined ? true : startImmediate)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (intervalState) {
      const intervalId = setInterval(() => {
        updateCount(count + 1)
        callback && callback()
      }, duration)
      setIntervalId(intervalId)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
        setIntervalId(null)
      }
    }
  }, [intervalState, count, duration, callback, intervalId])
  return {
    intervalId,
    start: () => {
      setIntervalState(true)
    },
    stop: () => {
      setIntervalState(false)
    },
  }
}
export const useInterval2 = (callback: () => void, delay: number, runOnLoad = false, effectDependencies = []) => {
  const savedCallback = useRef<{ callback: () => void }>({ callback })

  useEffect(() => {
    if (runOnLoad) {
      callback && callback()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, runOnLoad, ...effectDependencies])

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current.callback = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current.callback(), delay)
      return () => clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...effectDependencies])
}
