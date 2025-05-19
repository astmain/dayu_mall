import { useRef } from "react"

function useThrottle<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
  const lastCalled = useRef(0)

  const throttledFunction = (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCalled.current >= delay) {
      callback(...args)
      lastCalled.current = now
    }
  }

  return throttledFunction
}

export default useThrottle

/*
节流
使用示例：



*/
