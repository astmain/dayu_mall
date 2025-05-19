const setCookie = (name: any, value: string | number | boolean, days: number, path: string) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`
}

const getCookie = (name: string) =>
  document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=")
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, "")

const useCookie = (cookieName: string, initialValue: any) => {
  const [cookieValue, setCookieValue] = useState(() => getCookie(cookieName) || initialValue)

  const updateCookie = (value: string | number | boolean, days = 365, path = "/") => {
    setCookieValue(value)
    setCookie(cookieName, value, days, path)
  }

  const deleteCookie = (path = "/") => {
    updateCookie("", -1, path)
    setCookieValue(null)
  }

  return [cookieValue, updateCookie, deleteCookie]
}

export default useCookie
