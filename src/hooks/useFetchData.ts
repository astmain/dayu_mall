import { useEffect, useState } from "react"

export const useFetchData = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("数据加载失败:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading }
}
