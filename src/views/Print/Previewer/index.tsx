import FunctionList from "./operate/function"
import MeshList from "./operate/meshlist"
import SixViews from "./operate/sixViews"
const Pre3d = () => {
  const { meshArr } = useThreeStore((state) => state)

  return (
    <>
      <div
        className="h-[98%] w-[98%] absolute top-0 left-0  z-[2]"
        id="threecontainer"
        style={{ transform: `translate(1%, 1%)`, overflow: "hidden" }}
      ></div>
      {meshArr.length > 0 && (
        <>
          <SixViews />
          <FunctionList />
          <MeshList />
        </>
      )}
      <div
        id="screenshotcontainer"
        className=" absolute bottom-0 right-0  z-[5]"
        style={{ height: "200px", width: "200px", display: "none" }}
      ></div>
      {/* <div id="screenshotcontainer9" style={{ display: "none" }}></div> */}
    </>
  )
}

export default Pre3d
