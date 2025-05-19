import React from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface NumberOfVisitorsProps {
  visitors: string // 明确指定 visitors 的类型是 number
}
const NumberofvisitorsCom: React.FC<NumberOfVisitorsProps> = ({ visitors }) => {
  console.log(visitors)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // 动态设置柱形图底部日期位置大小变量
  const [isDiBu, setisDiBu] = useState(0)

  // State to store font size based on screen width
  const [fontSize, setFontSize] = useState(18)

  useEffect(() => {
    // 检查屏幕宽度
    const handleResize = () => {
      setIsSmallScreen(
        (window.innerWidth > 640 && window.innerWidth <= 768) ||
          (window.innerWidth >= 768 && window.innerWidth < 992) ||
          (window.innerWidth > 992 && window.innerWidth < 1200),
      )
      // 假设大于640小于768--设置柱形图下的字体大小为12px
      if (window.innerWidth > 640 && window.innerWidth < 768) {
        setFontSize(12)
        setisDiBu(13)

        // 假设 大于 768px 屏幕
      } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
        setFontSize(12)
        setisDiBu(13)
      } else if (window.innerWidth > 992 && window.innerWidth < 1200) {
        setFontSize(12)
        setisDiBu(13)
      } else {
        setFontSize(12)
        setisDiBu(0)
      }
    }

    handleResize() // 组件挂载时也检查一次屏幕宽度
    window.addEventListener("resize", handleResize) // 监听屏幕大小变化
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const RoundedBar = (props: any) => {
    const { x, y, width, height, fill } = props
    const radius = width / 2
    const rectHeight = height - radius
    return (
      <g>
        <path
          d={`M${x},${y + radius + 0.5} 
                a${radius},${radius} 0 0,1 ${radius},${-radius} 
                a${radius},${radius} 0 0,1 ${radius},${radius} 
                Z`}
          fill={fill}
        />

        <rect x={x} y={y + radius} width={width} height={rectHeight < 0 ? 0 : rectHeight} fill={fill} />
      </g>
    )
  }
  const data = [
    {
      name: "2024-10-16",
      Numberofvisitors: 1000,
    },
    {
      name: "2024-10-17",
      uv: 3000,
      Numberofvisitors: 2500,
      amt: 2210,
    },
    {
      name: "2024-10-18",
      uv: 2000,
      Numberofvisitors: 9800,
      amt: 2290,
    },
    {
      name: "2024-10-19",
      uv: 2780,
      Numberofvisitors: 3908,
      amt: 2000,
    },
    {
      name: "2024-10-20",
      uv: 1890,
      Numberofvisitors: 4800,
      amt: 2181,
    },
    {
      name: "2024-10-21",
      uv: 2390,
      Numberofvisitors: 3800,
      amt: 2500,
    },
  ]
  return (
    <div>
      <div className="echartwidth mx-auto w-[100%] h-[300px]">
        {visitors}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 40,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize }} // 设置X轴的字体大小
              angle={isSmallScreen ? -45 : 0} // 小屏幕下文本旋转45度
              interval={0}
              scale="point"
              dy={isDiBu}
              dx={-20} // ✅ 下移日期文本
              fill="#F05113"
              style={{ zIndex: "999" }}
              padding={{ left: 94, right: 30 }}
              tickLine={false}
            />
            <YAxis tickCount={5} domain={["auto", "auto"]} />
            <Tooltip />
            {/* 不添加 Legend */}
            {/* <Legend /> */}
            {/* 去掉虚线 */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Bar dataKey="Numberofvisitors" fill="#F05113" shape={<RoundedBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default NumberofvisitorsCom
