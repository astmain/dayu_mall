import { useReducer, useRef } from "react"

// 泛型定义：支持任意数据类型
type Reactive<T> = T & {
  // 给对象增加代理标志（可选）
  __isReactive?: boolean
}

function useReactive<T extends object>(initialState: T): Reactive<T> {
  // 强制更新的函数
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  // 创建响应式对象的函数
  const createReactive = (target: T): Reactive<T> => {
    if (typeof target !== "object" || target === null) {
      return target as Reactive<T>
    }

    // 如果已经是 Proxy，则直接返回
    if ((target as Reactive<T>).__isReactive) {
      return target as Reactive<T>
    }

    return new Proxy(target, {
      get(obj, key) {
        const value = obj[key as keyof T]
        // 如果是对象或数组，递归处理
        return typeof value === "object" && value !== null ? createReactive(value as T) : value
      },
      set(obj, key, value) {
        if (obj[key as keyof T] !== value) {
          obj[key as keyof T] = value
          forceUpdate() // 数据变更，强制刷新
        }
        return true
      },
      deleteProperty(obj, key) {
        if (key in obj) {
          delete obj[key as keyof T]
          forceUpdate() // 删除属性后刷新
        }
        return true
      },
    }) as Reactive<T>
  }

  // 缓存初始状态，防止重新创建
  const stateRef = useRef(createReactive(initialState))

  return stateRef.current
}

export default useReactive
