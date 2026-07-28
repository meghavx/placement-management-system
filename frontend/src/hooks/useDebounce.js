/*
Purpose
Debounces a fast-changing value (e.g. search input) so expensive
operations, such as a future API call, aren't triggered on every
keystroke.
*/

import { useEffect, useState } from 'react'

export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
