import { useEffect, useState } from "react"

interface UseLoadingDelayProps {
  loading: boolean // 当前的 loading 状态
  delay: number // 延迟时间（毫秒）
}

const useLoadingDelay = ({ loading, delay }: UseLoadingDelayProps) => {
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (loading) {
      // 如果 loading 为 true，启动定时器
      timer = setTimeout(() => {
        setShowLoading(true)
      }, delay)
    } else {
      // 如果 loading 为 false，立即隐藏
      setShowLoading(false)
      if (timer) clearTimeout(timer)
    }

    return () => timer && clearTimeout(timer) // 清除定时器，防止内存泄漏
  }, [loading, delay])

  return showLoading
}

export default useLoadingDelay
