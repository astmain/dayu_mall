import "@assets/normalize.css"
import "./index.css"
import "./index.scss"
import "./locales/i18n"
import "@assets/iconfont/iconfont.css"
// import "@assets/iconheader/iconfont.css"
import "@assets/3d/iconfont.css"

import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"

// import App from './App'
// import RouterProvider from './router/RouterProvider'
import { router } from "./router/index"

{
  /* <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH as string}>
  <App />
</BrowserRouter> */
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} future={{ v7_startTransition: true }} />,
  // <React.StrictMode>
  // </React.StrictMode>,
)
// const originalWarn = console.warn
// console.warn = (...args) => {
//   if (args[0]?.includes("v7_startTransition")) {
//     return
//   }
//   originalWarn(...args)
// }
// 使用script 动态注入
// const isPro = import.meta.env.PROD
const script = document.createElement("script")
const staticUrl = "https://yun3d.com/frontend/public/xzz2021.js"
script.src = staticUrl
document.body.appendChild(script)

//  获取地理信息
// const geoFindMe = () => {
//   function success(position: any) {
//     const latitude = position.coords.latitude
//     const longitude = position.coords.longitude
//     console.log("success", latitude, longitude)
//   }

//   function error() {
//     console.log("error", "Unable to retrieve your location")
//   }

//   navigator.geolocation.getCurrentPosition(success, error)
// }

// geoFindMe()

//  发送桌面级通知
// function sendNotification() {
//   const title = "DAYU3D 通知消息"
//   const options = {
//     body: "订单未支付, 20分钟内未支付, 订单将自动取消",
//     // Other options can go here
//   }
//   console.log("Creating new notification")
//   new Notification(title, options)
// }

// const showPermission = () => {
//   Notification.requestPermission()
//     .then((permission) => {
//       console.log("Promise resolved: " + permission)
//       console.log("Promise hah哈哈哈哈哈 resolved: ")
//       sendNotification()
//     })
//     .catch((error) => {
//       console.log("Promise was rejected")
//       console.log(error)
//     })
// }
// showPermission()

// 使用场景主要集中在需要在当前事件循环结束之前立即执行某些操作
// 确保错误处理逻辑在调用栈清空后执行，避免在调用栈中抛出未捕获的错误
// process.nextTick() 的优先级高于 setTimeout 和 setImmediate
/*
function riskyOperation(callback) {
  process.nextTick(() => {
    try {
      throw new Error("Something went wrong")
    } catch (err) {
      callback(err)
    }
  })
}

riskyOperation((err) => {
  if (err) {
    console.error("Caught error:", err.message)
  }
})
*/
