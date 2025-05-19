import { useState } from "react"

/**
 * useLocalStorage - 一个简单封装 localStorage 的自定义 Hook
 * @param {string} key - localStorage 的键名
 * @param {any} initialValue - 初始值
 * @returns {Array} [storedValue, setValue, removeValue]
 */
function useLocalStorage(key: string, initialValue: any = "") {
  // 初始化 state
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // 尝试从 localStorage 中读取数据
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("读取 localStorage 出错：", error)
      return initialValue
    }
  })

  // 设置数据到 localStorage
  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error("设置 localStorage 出错：", error)
    }
  }

  // 删除数据
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(undefined)
    } catch (error) {
      console.error("删除 localStorage 出错：", error)
    }
  }

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
