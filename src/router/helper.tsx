import { Suspense } from "react"
import { Outlet, RouteObject } from "react-router-dom"

import Layout from "@/App"
import Loading from "@/components/loading"

import { RouterBeforeEach } from "./permission"
export type RouterMap = RouteObject & {
  meta?: any
  children?: RouterMap[]
  exact?: boolean
  index?: boolean
  parentPath?: string
}
export interface childrenRoutesType {
  // name?: string
  index?: boolean
  exact?: boolean
  element?: React.ReactNode
  path?: string
  isParent?: boolean
  parentPath?: string
  meta?: {
    permission?: boolean
  }
  InheritedPermissions?: boolean
  children?: childrenRoutesType[]
}

// type RoutesWithChildren = RouteObject & childrenRoutesType & { children?: RoutesWithChildren[] }

/*
  直接合并 扩展 三方库 类型定义

declare module "react-router-dom" {
  interface IndexRouteObject {
  meta?: any
  }
  interface NonIndexRouteObject {
    meta?: any
  }
}

*/
// 自动生成组件映射
const components = import.meta.glob("@/views/**/*.tsx")

type ModuleLoader = () => Promise<unknown>

// 将文件路径转换为小写键
const insensitiveFiles: Record<string, ModuleLoader> = Object.keys(components).reduce(
  (acc, key) => {
    acc[key.toLowerCase()] = components[key]
    return acc
  },
  {} as Record<string, ModuleLoader>,
)

// 定义高阶组件
// const withLogger = (WrappedComponent: React.ComponentType<any>) => {
//   const WithLogger = (props: any) => {
//     useEffect(() => {
//       console.log(`${WrappedComponent.displayName || WrappedComponent.name} ===========渲染了`)
//     }, [])

//     return <WrappedComponent {...props} />
//   }
//   return WithLogger
// }

export const lazyLoad = (componentPath: string, meta: any) => {
  // console.log("TCL: lazyLoad -> componentPath", componentPath)
  const LazyComponent = lazy(insensitiveFiles[`/src/views/${componentPath}/index.tsx`] as any)
  // const LoggerComponent = withLogger(LazyComponent)
  return (
    <RouterBeforeEach meta={meta}>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
        {/* <LoggerComponent /> */}
      </Suspense>
    </RouterBeforeEach>
  )
}

export const generateElement = (routes: childrenRoutesType[]) => {
  if (routes.length === 0) return []
  return routes.map((item: childrenRoutesType): childrenRoutesType => {
    const { path, parentPath, meta, children, index } = item as childrenRoutesType

    if (path === "/") return { path: "/", element: <Layout />, children: generateElement(item?.children || []) }

    if (index || path === "*") return item as RouterMap

    const componentPath = parentPath ? parentPath + "/" + path : path

    if (children) {
      const newChildren = children.map((iten: childrenRoutesType): childrenRoutesType => {
        iten.parentPath = componentPath
        return iten
      })
      newChildren.unshift({
        index: true,
        element: componentPath ? lazyLoad(componentPath, meta) : <></>,
      })
      return {
        ...item,
        element: <Outlet />,
        children: generateElement(newChildren),
      }
    } else {
      return {
        ...item,
        element: componentPath ? lazyLoad(componentPath, meta) : <></>,
      }
    }
  })
}
