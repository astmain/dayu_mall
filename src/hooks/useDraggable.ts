function useDraggable(el: React.RefObject<HTMLElement>) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 })
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const startX = event.pageX - dx
      const startY = event.pageY - dy
      const handleMouseMove = (event: MouseEvent) => {
        const newDx = event.pageX - startX
        const newDy = event.pageY - startY
        setOffset({ dx: newDx, dy: newDy })
      }
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove)
        },
        { once: true },
      )
    }
    el.current?.addEventListener("mousedown", handleMouseDown)
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      el.current?.removeEventListener("mousedown", handleMouseDown)
    }
  }, [dx, dy, el])
  useEffect(() => {
    if (el.current) {
      el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    }
  }, [dx, dy, el])
}

export default useDraggable

/*

function Demo() {
  const el = useRef();
  useDraggable(el);

  const style = {
    border: "3px solid cyan",
    margin: "40px auto 0 auto",
    width: "100px",
    height: "100px"
  };

  return <div ref={el} style={style} />;
}



*/
