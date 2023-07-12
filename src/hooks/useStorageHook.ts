import { useState, useEffect } from "react"

export const useStorage = <T>(
  key: string,
  defaultValue: T,
  storage: "local" | "session" = "local",
) => {
  const [storageValue, setStorageValue] = useState<T>(() => {
    try {
      const value = storage === "session" ? sessionStorage.getItem(key) : localStorage.getItem(key)

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

  useEffect(() => {
    storage === "session"
      ? sessionStorage.setItem(key, JSON.stringify(storageValue))
      : localStorage.setItem(key, JSON.stringify(storageValue))
  }, [storageValue])

  return { value: storageValue, setValue: setStorageValue }
}
