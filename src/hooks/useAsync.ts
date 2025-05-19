const useAsync = <T>(fn: () => Promise<T>, args: any[]) => {
  const [state, set] = useState<{
    loading: boolean
    value?: T
    error?: Error
  }>({
    loading: true,
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoized = useCallback(fn, args)

  useEffect(() => {
    let mounted = true
    const promise = memoized()

    promise.then(
      (value) => {
        if (mounted) {
          set({
            loading: false,
            value,
          })
        }
      },
      (error) => {
        if (mounted) {
          set({
            loading: false,
            error,
          })
        }
      },
    )

    return () => {
      mounted = false
    }
  }, [memoized])

  return state
}

export default useAsync
