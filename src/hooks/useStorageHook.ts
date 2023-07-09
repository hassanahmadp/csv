import { useState } from "react"

export const useStorage = <T>(key: string, defaultValue: T, storage: "local" | "session" = "local") => {
  // Create state variable to store
  // localStorage value in state
  const [storageValue, setStorageValue] = useState<T>(() => {
    try {
      const value = storage === "session" ? sessionStorage.getItem(key) : localStorage.getItem(key)
      // If value is already present in
      // localStorage then return it

      // Else set default value in
      // localStorage and then return it
      if (value) {
        return JSON.parse(value)
      } else {
        storage === "session"
          ? sessionStorage.setItem(key, JSON.stringify(defaultValue))
          : localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      storage === "session"
        ? sessionStorage.setItem(key, JSON.stringify(defaultValue))
        : localStorage.setItem(key, JSON.stringify(defaultValue))
      return defaultValue
    }
  })

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (valueOrFn: any) => {
    let newValue
    if (typeof valueOrFn === "function") {
      const fn = valueOrFn
      newValue = fn(storageValue)
    } else {
      newValue = valueOrFn
    }
    localStorage.setItem(key, JSON.stringify(newValue))
    setStorageValue(newValue)
  }
  return [storageValue, setLocalStorageStateValue]
}

