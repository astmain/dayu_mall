//  检测网络状况

interface NavigatorConnection {
  downlink?: number
  downlinkMax?: number
  effectiveType?: string
  rtt?: number
  saveData?: boolean
  type?: string
  addEventListener: (type: string, listener: EventListener, options?: boolean | AddEventListenerOptions) => void
  removeEventListener: (type: string, listener: EventListener, options?: boolean | EventListenerOptions) => void
}

function isShallowEqual(
  object1: { [x: string]: any },
  object2: {
    [x: string]: any
  },
) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false
    }
  }

  return true
}
const getConnection: () => NavigatorConnection | null = () => {
  return (navigator as any)?.connection || (navigator as any)?.mozConnection || (navigator as any)?.webkitConnection
}

const useNetworkStateSubscribe = (callback: () => void) => {
  window.addEventListener("online", callback, { passive: true })
  window.addEventListener("offline", callback, { passive: true })

  const connection = getConnection()

  if (connection) {
    connection.addEventListener("change", callback, { passive: true })
  }

  return () => {
    window.removeEventListener("online", callback)
    window.removeEventListener("offline", callback)

    if (connection) {
      connection.removeEventListener("change", callback)
    }
  }
}

const getNetworkStateServerSnapshot = () => {
  throw Error("useNetworkState is a client-only hook")
}

export function useNetworkState() {
  const cache = useRef({})

  const getSnapshot = () => {
    const online = navigator.onLine
    const connection = getConnection()

    const nextState = {
      online,
      downlink: connection?.downlink,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
      type: connection?.type,
    }

    if (isShallowEqual(cache.current, nextState)) {
      return cache.current
    } else {
      cache.current = nextState
      return nextState
    }
  }

  return useSyncExternalStore(useNetworkStateSubscribe, getSnapshot, getNetworkStateServerSnapshot)
}

/*

const network = useNetworkState()

{Object.keys(network).map((key) => {
            return (
              <tr key={key} className={key}>
                <th>{key}</th>
                <td>{`${network[key]}`}</td>
              </tr>
            );
          })}

*/
