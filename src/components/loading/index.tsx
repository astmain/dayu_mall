// import "./Loading.css" // 引入样式文件

import { motion } from "framer-motion"

// const Loading000 = ({ message = "加载中...", size = "medium" }) => {
//   return (
//     <div className={`loading-container loading-${size}`}>
//       <div className="loading-spinner"></div>
//       <p className="loading-message">{message}</p>
//     </div>
//   )
// }

const Loading = () => {
  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "5px solid #ddd",
          borderTopColor: "#3498db",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        {/* <p className="loading-message">{message}</p> */}
      </motion.div>
    </motion.div>
  )
}
export default Loading
