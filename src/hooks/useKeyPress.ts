import useEventListener from "./useEventListener"

export const useKeyPress = (targetKey: string) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)

  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  // Add event listeners
  useEventListener("keydown", (e: Event) => downHandler(e as KeyboardEvent))
  useEventListener("keyup", (e: Event) => upHandler(e as KeyboardEvent))

  return keyPressed
}
