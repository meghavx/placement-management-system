/*
Purpose
Reusable search-filtering hook. Filters a list of objects by checking
whether the search term appears in any of the given field names.

Future Features
- Backend Integration: replace with a debounced API call
  (e.g. GET /admin/students?search=term) once the backend is connected.
*/

import { useMemo, useState } from 'react'

export function useSearch(items = [], fields = []) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items
    const term = searchTerm.toLowerCase()
    return items.filter((item) =>
      fields.some((field) => String(item[field] ?? '').toLowerCase().includes(term)),
    )
  }, [items, fields, searchTerm])

  return { searchTerm, setSearchTerm, filteredItems }
}
