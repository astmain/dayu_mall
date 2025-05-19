import { useEffect, useRef, useState } from "react"

interface InfiniteScrollOptions<T, P> {
  fetchData: (params: P) => Promise<{ list: T[]; total: number }> // 数据获取函数
  initialParams: P // 初始查询参数
}

const useInfiniteScroll = <T, P extends { currentPage: number; pageSize: number }>({
  fetchData,
  initialParams,
}: InfiniteScrollOptions<T, P>) => {
  const [data, setData] = useState<T[]>([]) // 已加载的数据
  const [params, setParams] = useState<P>(initialParams) // 当前查询参数
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0) // 总数据量
  const [hasNext, setHasNext] = useState(true) // 是否还有下一页

  const observerRef = useRef<IntersectionObserver | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // 数据加载函数
  const loadMore = async () => {
    if (!hasNext || loading) return

    setLoading(true)
    try {
      const response = await fetchData(params)
      setData((prev) => [...prev, ...response.list])
      setTotal(response.total)

      // 判断是否还有下一页数据
      const nextPage = params.currentPage + 1
      const hasMore = nextPage * params.pageSize < response.total
      setHasNext(hasMore)

      // 更新当前页数
      setParams((prev) => ({ ...prev, currentPage: nextPage }))
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  // 监听底部元素是否进入视口
  useEffect(() => {
    if (!bottomRef.current || !hasNext) return

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadMore()
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersection)
    observerRef.current.observe(bottomRef.current)

    return () => observerRef.current?.disconnect()
  }, [hasNext, params])

  // 手动触发筛选条件变更
  const resetAndSearch = (newParams: P) => {
    setData([])
    setParams({ ...newParams, currentPage: 1 }) // 重置为第一页
    setHasNext(true) // 重置加载状态
  }

  return { data, loading, total, hasNext, bottomRef, resetAndSearch }
}

export default useInfiniteScroll

/*

import React, { useState } from 'react';
import useInfiniteScroll from './useInfiniteScroll';

const InfiniteScrollPage: React.FC = () => {
  const [keyword, setKeyword] = useState('');

  const { data, loading, total, hasNext, bottomRef, resetAndSearch } = useInfiniteScroll<string, { currentPage: number; pageSize: number; keyword?: string }>({
    fetchData: mockFetchData,
    initialParams: { currentPage: 1, pageSize: 10, keyword: '' },
  });

  const handleSearch = () => {
    resetAndSearch({ currentPage: 1, pageSize: 10, keyword });
  };

  return (
    <div>
      <h1>Infinite Scroll with Search</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasNext && <p>No more data to load.</p>}
      <div ref={bottomRef} style={{ height: '20px', background: 'transparent' }} />
      <p>Total Items: {total}</p>
    </div>
  );
};

export default InfiniteScrollPage;


*/
