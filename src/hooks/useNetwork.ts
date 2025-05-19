import { useEffect, useState } from "react"

interface NetworkInformation extends EventTarget {
  readonly downlink?: number
  readonly effectiveType?: string
  readonly rtt?: number
  readonly saveData?: boolean
  readonly type?: string
  readonly downlinkMax?: number
  onchange?: EventListener
}

interface NavigatorNetworkInformation extends Navigator {
  connection?: NetworkInformation
  mozConnection?: NetworkInformation
  webkitConnection?: NetworkInformation
}

interface NetworkState {
  online?: boolean
  since?: Date
  rtt?: number
  type?: string
  downlink?: number
  saveData?: boolean
  downlinkMax?: number
  effectiveType?: string
}

const useNetwork = (): NetworkState => {
  const [networkState, setNetworkState] = useState<NetworkState>(() => {
    const connection =
      (navigator as NavigatorNetworkInformation).connection ||
      (navigator as NavigatorNetworkInformation).mozConnection ||
      (navigator as NavigatorNetworkInformation).webkitConnection

    return {
      online: navigator.onLine,
      since: undefined,
      rtt: connection?.rtt,
      type: connection?.type,
      downlink: connection?.downlink,
      saveData: connection?.saveData,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
    }
  })

  useEffect(() => {
    const updateNetworkState = () => {
      const connection =
        (navigator as NavigatorNetworkInformation).connection ||
        (navigator as NavigatorNetworkInformation).mozConnection ||
        (navigator as NavigatorNetworkInformation).webkitConnection

      setNetworkState((prevState) => ({
        ...prevState,
        online: navigator.onLine,
        since: !navigator.onLine ? new Date() : prevState.since,
        rtt: connection?.rtt,
        type: connection?.type,
        downlink: connection?.downlink,
        saveData: connection?.saveData,
        downlinkMax: connection?.downlinkMax,
        effectiveType: connection?.effectiveType,
      }))
    }

    // 监听在线/离线事件
    window.addEventListener("online", updateNetworkState)
    window.addEventListener("offline", updateNetworkState)

    // 如果支持网络信息 API，则监听 connection 的变化
    const connection =
      (navigator as NavigatorNetworkInformation).connection ||
      (navigator as NavigatorNetworkInformation).mozConnection ||
      (navigator as NavigatorNetworkInformation).webkitConnection
    connection?.addEventListener("change", updateNetworkState)

    return () => {
      window.removeEventListener("online", updateNetworkState)
      window.removeEventListener("offline", updateNetworkState)
      connection?.removeEventListener("change", updateNetworkState)
    }
  }, [])

  return networkState
}

export default useNetwork
