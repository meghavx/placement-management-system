/*
Purpose
Reusable client-side pagination logic shared by every Table usage in
the application, so pages never re-implement page-slicing logic.

Future Features
- Backend Integration: when the backend supports server-side pagination,
  replace the local slicing with page/size query params sent to the API.
*/

import { useMemo, useState } from 'react'

export function usePagination(items = [], initialPageSize = 10) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize
    return items.slice(start, start + pageSize)
  }, [items, page, pageSize])

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages))
  }

  return {
    page,
    pageSize,
    totalPages,
    paginatedItems,
    setPageSize,
    goToPage,
  }
}
