import { create } from "zustand"

interface TestStore {
  firstName: string
  lastName: string
}
export const useTestStore = create<TestStore>(() => ({
  firstName: "John",
  lastName: "Doe",
}))

export const setFirst = (newname: string) => useTestStore.setState({ firstName: newname })
