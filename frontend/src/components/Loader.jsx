/*
========================================
Component: Loader

Purpose:
Reusable loading spinner used for tables, cards, forms, and full
dashboards while data is being fetched.

Current Features:
- Configurable size and optional label

Future:
- None; keep this the single Loader implementation.
========================================
*/

export default function Loader({ label = 'Loading...', size = 24 }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-gray-500">
      <span
        className="animate-spin rounded-full border-2 border-primary-600 border-t-transparent"
        style={{ height: size, width: size }}
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}
