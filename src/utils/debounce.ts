function debounce<T extends (...args: any[]) => any>(func: T, wait?: number, immediate?: boolean) {
  let timeout: NodeJS.Timeout | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }

    const callNow = immediate && !timeout

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(this, args)
  }
}

export default debounce
