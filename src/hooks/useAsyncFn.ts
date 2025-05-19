/**
 * 自定义 hook 用于处理异步请求
 * @param {Function} promiseFn - 返回 Promise 的函数
 * @param {number} maxRetries - 最大重试次数
 * @returns {Object} 包含 loading, data, error 三个状态
 */
function useAsync(promiseFn: () => Promise<any>, immediate = true, maxRetries: number = 1) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const promiseFnRef = useRef(promiseFn)
  useEffect(() => {
    promiseFnRef.current = promiseFn
  }, [promiseFn])
  const executePromise = useCallback(
    (retryCount = 0): Promise<any> => {
      setLoading(true)
      setError(null)
      setData(null)

      return promiseFnRef
        .current()
        .then((result) => {
          setData(result)
          setLoading(false)
        })
        .catch((err) => {
          if (retryCount < maxRetries) {
            console.log(`Retrying... Attempt ${retryCount + 1} of ${maxRetries}`)
            return executePromise(retryCount + 1)
          } else {
            setError(err)
            setLoading(false)
            throw err
          }
        })
    },
    [maxRetries],
  )

  const retry = useCallback(() => {
    return executePromise(0)
  }, [executePromise])

  useEffect(() => {
    if (immediate) {
      executePromise(0)
    }
  }, [executePromise, immediate])

  return { loading, data, error, retry }
}

export default useAsync
