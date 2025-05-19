import { useEffect } from "react"

const useTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title // 保存之前的标题
    document.title = title // 更新标题

    return () => {
      document.title = prevTitle // 恢复之前的标题（可选）
    }
  }, [title]) // 当 `title` 变化时重新运行
}

export default useTitle
