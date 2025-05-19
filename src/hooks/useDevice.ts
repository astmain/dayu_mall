const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    handleResize() // 初始检测
    window.addEventListener("resize", handleResize) // 监听窗口尺寸变化

    return () => {
      window.removeEventListener("resize", handleResize) // 清理事件监听
    }
  }, [])

  return isMobile
}

export default useDevice
