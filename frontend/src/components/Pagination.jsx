/*
========================================
Component: Pagination

Purpose:
Single reusable pagination control used by the Table component (and
any other paginated list) across the whole application.

Current Features:
- Previous/Next, page numbers, rows-per-page selector

Future:
- Backend Integration: when server-side pagination is added, wire
  page/pageSize changes to the API's page/size query params.
========================================
*/

export default function Pagination({ page, totalPages, onPageChange, pageSize, onPageSizeChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`rounded-md px-3 py-1 text-sm ${
              p === page ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
