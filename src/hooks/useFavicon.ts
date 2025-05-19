export function useFavicon(url: string) {
  useEffect(() => {
    let link = document.querySelector(`link[rel~="icon"]`) as HTMLLinkElement

    if (!link) {
      link = document.createElement("link")
      link.type = "image/x-icon"
      link.rel = "icon"
      link.href = url
      document.head.appendChild(link)
    } else {
      link.href = url
    }
  }, [url])
}
