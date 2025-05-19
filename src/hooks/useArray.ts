export const useArray = (initial: any[]) => {
  const [value, setValue] = useState(initial)
  return {
    value,
    setValue,
    add: useCallback((a: any) => setValue((v) => [...v, a]), []),
    clear: useCallback(() => setValue(() => []), []),
    removeById: useCallback((id: any) => setValue((arr) => arr.filter((v) => v && v.id !== id)), []),
    removeIndex: useCallback(
      (index: number) =>
        setValue((v) => {
          v.splice(index, 1)
          return v
        }),
      [],
    ),
  }
}
