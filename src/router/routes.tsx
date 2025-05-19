import { Navigate, RouteObject } from "react-router-dom"

import Layout from "@/App"
import NotFound from "@/views/Error/404"

import type { childrenRoutesType } from "./helper"
import { generateElement } from "./helper"

const childrenRoutes = [
  {
    index: true, // 设置为默认子路由
    element: <Navigate to="/home" replace />,
  },
  {
    path: "home",
    children: [
      {
        path: "category",
      },
      {
        path: "model",
      },
      {
        path: "author",
      },
      {
        path: "favorite",
        meta: {
          permission: true,
        },
      },
    ],
  },
  {
    path: "model",
    children: [
      {
        path: "success",
      },
      {
        path: "submit",
      },
    ],
  },
  {
    path: "about",
  },
  {
    path: "scan",

    children: [
      {
        path: "success",
      },
      {
        path: "submit",
      },
    ],
  },
  {
    path: "wallet",
  },
  {
    path: "merchantcenter",
    children: [
      {
        path: "authentication",
      },
      {
        path: "enterprisecertification",
      },
      {
        path: "personalauthentication",
      },
    ],
  },
  {
    path: "personalcenter",
  },
  {
    path: "shoppingcart",
  },
  {
    path: "print",
    children: [
      {
        path: "payment",
      },
      {
        path: "submit",
      },
      // 新增选择付款方式页面
      {
        path: "paymentmethod",
      },
    ],
  },
  {
    path: "test",
    meta: {
      permission: true,
    },
  },
  {
    path: "order",
  },
  {
    path: "login",
    // 新增路由跳转到微信扫码注册页面
    children: [
      {
        path: "wechatregistercom",
      },
      // 绑定手机号页面
      {
        path: "bindphonenumber",
      },
      // 新增选择账号主体页面
      {
        path: "chooseaccount",
      },
    ],
  },
  //  通配路由必须放在最后
  {
    path: "*",
    element: <NotFound />,
  },
]
export const routes00: childrenRoutesType[] = [
  {
    path: "/",
    element: <Layout />,
    children: childrenRoutes,
  },
]

export const routes = generateElement(routes00) as RouteObject[]
