import { createBrowserRouter } from "react-router-dom"

import { routes } from "./routes"

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true, // 启用 v7 的 normalizeFormMethod 功能
    v7_skipActionErrorRevalidation: true, // 启用 v7 的 skipActionErrorRevalidation 功能
    v7_partialHydration: true, // 启用 v7 的 partial hydration 功能
    v7_startTransition: true, // 启用未来标志
  } as any,
})
