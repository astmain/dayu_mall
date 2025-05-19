import { message as messageAntd } from "antd"
import { useCallback, useRef, useState } from "react"

type ApiFunction<T = any, U = any> = (data?: T) => Promise<{ data: U; code: number; message: string }>
interface UseRequestOptions<T> {
  title?: string
  apiFunction: ApiFunction
  handler?: (data: T) => void
  onError?: (error: any) => void
  cacheExpiration?: number // 缓存过期时间（毫秒）
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export function useTryApi<T>({ title, apiFunction, handler, onError, cacheExpiration = 3000 }: UseRequestOptions<T>) {
  // const { setLoading } = useLoginStore((state) => state)

  const { setLoadingLqh } = useLoginStore((state) => state)

  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map())

  const request = useCallback(
    async (formData: any) => {
      const cacheKey = JSON.stringify(formData)
      const cachedData = cacheRef.current.get(cacheKey)
      const currentTime = Date.now()

      // 如果缓存存在且未过期，直接使用缓存数据
      if (cachedData && currentTime - cachedData.timestamp < cacheExpiration) {
        setData(cachedData.data)
        return
      }

      setLoadingLqh(true)
      setError(null)
      const startTime = Date.now()
      // const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Request timeout")), 10000))
      const timeout = wait(10000)

      try {
        const response = await Promise.race([apiFunction(formData), timeout])

        if (Array.isArray(response) && response.length === 0) {
          throw new Error("请求超时")
        }
        const { data, code, message } = response as { data: T; code: number; message: string }
        if (code == 200) {
          messageAntd.success(title)
          const endTime = Date.now()
          const waitTime = endTime - startTime
          if (waitTime < 3000) {
            await wait(3000 - waitTime)
          }
          handler?.(data)
          setData(data)
          cacheRef.current.set(cacheKey, { data: data, timestamp: Date.now() })
        } else {
          messageAntd.error(message)
          onError?.(response)
        }
      } catch (err: any) {
        console.error("请求失败, 原因: ", err)
        setError(err.message || "An error occurred")
        onError?.(err)
      } finally {
        setLoadingLqh(false)
      }
    },
    [apiFunction, handler, title, onError, cacheExpiration],
  )

  return { request, error, data }
}

export function useSimpleTryApi<T>({
  title,
  apiFunction,
  handler,
  onError,
  cacheExpiration = 3000,
}: UseRequestOptions<T>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)
  const cacheRef = useRef<Map<string, { data: T; timestamp: number }>>(new Map())

  const request = useCallback(
    async (formData?: any) => {
      const cacheKey = JSON.stringify(formData || Date.now())
      const cachedData = cacheRef.current.get(cacheKey)
      const currentTime = Date.now()

      // 如果缓存存在且未过期，直接使用缓存数据
      if (cachedData && currentTime - cachedData.timestamp < cacheExpiration) {
        setData(cachedData.data)
        return
      }
      setLoading(true)
      setError(null)
      const startTime = Date.now()
      const timeout = wait(10000)

      try {
        const response = await Promise.race([apiFunction(formData), timeout])
        const endTime = Date.now()
        const waitTime = endTime - startTime
        if (waitTime < 1000) {
          await wait(1000 - waitTime)
        }
        if (Array.isArray(response) && response.length === 0) {
          throw new Error("请求超时,请重试!")
        }
        const { data, code, message } = response as { data: T; code: number; message: string }
        if (code == 200) {
          title && messageAntd.success(title)
          setData(data)
          cacheRef.current.set(cacheKey, { data: data, timestamp: Date.now() })
          setTimeout(() => {
            handler?.(data)
          }, 500)
        } else {
          message && messageAntd.error(message)
          onError?.(response)
        }
      } catch (err: any) {
        console.error("请求失败, 原因: ", err)
        setError(err.message || "An error occurred")
        onError?.(err)
      } finally {
        setLoading(false)
      }
    },
    [apiFunction, handler, title, onError, cacheExpiration, setLoading],
  )

  return { request, error, data, loading }
}
