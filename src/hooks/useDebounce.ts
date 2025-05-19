import { useEffect, useState } from "react"

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce

/*
使用示例：

const [input, setInput] = useState("");
const debouncedInput = useDebounce(input, 500);
  
useEffect(() => {
  console.log(debouncedInput)
}, [debouncedInput])

*/
