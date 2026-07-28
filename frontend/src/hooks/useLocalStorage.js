/*
Purpose
Generic hook to persist and read a value from localStorage. Used by
useAuth to persist the mock logged-in user across page refreshes.

Current Features
- Read/write JSON-serializable values
- Falls back to an initial value when nothing is stored

Future Features
- None; this is a stable, generic utility hook.
*/

import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch {
      // Ignore storage errors (e.g. private browsing mode).
    }
  }

  return [storedValue, setValue]
}
