// 统计组件渲染次数
export function useRenderCount() {
  const count = useRef(0)

  count.current++

  return count.current
}
