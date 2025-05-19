import { useEffect, useRef, useState } from "react"

interface UsePollingProps {
  callback: () => void // 轮询时执行的任务
  interval: number // 时间间隔（毫秒）
  immediate?: boolean // 是否立即执行一次
  timeout?: number // 超时时间（毫秒），可选
}

const usePolling = ({ callback, interval = 1, immediate = false, timeout }: UsePollingProps) => {
  const [isActive, setIsActive] = useState(false)
  const savedCallback = useRef<() => void>()
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (!isActive) return

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (immediate) {
      tick() // 立即执行一次
    }

    const intervalId = setInterval(tick, interval * 1000)

    if (timeout) {
      timeoutId.current = setTimeout(() => {
        setIsActive(false) // 超时停止轮询
        clearInterval(intervalId) // 清除轮询
      }, timeout * 1000)
    }

    return () => {
      clearInterval(intervalId) // 清除定时器
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [isActive, interval, immediate, timeout])

  const start = () => setIsActive(true)
  const stop = () => {
    setIsActive(false)
    if (timeoutId.current) {
      clearTimeout(timeoutId.current) // 清除超时定时器
    }
  }

  return { start, stop, isActive }
}

export default usePolling

/*

   const { start, stop, isActive } = usePolling({
    callback: async () => {
      const response = await mockCheckScanStatus();

      if (response.status === 'success') {
        setMessage('Login successful!');
        setStatus('success');
        stop(); // 停止轮询
      } else {
        setMessage('Waiting for scan...');
      }
    },
    interval: 1, // 每隔 1 秒轮询一次
    immediate: true, // 启动轮询时立即检查
    timeout: 60, // 超时 60 秒
  });

  const handleStartPolling = () => {
    setStatus('waiting');
    setMessage('Waiting for scan...');
    start(); // 开始轮询
  };


  */
