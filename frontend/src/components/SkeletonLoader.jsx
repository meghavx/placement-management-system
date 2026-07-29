/*
========================================
Component: SkeletonLoader

Purpose:
Reusable skeleton placeholder shown instead of blank space while
dashboards, tables, and cards are loading (spec section 23).

Current Features:
- rows prop to render N skeleton bars

Future:
- None; keep this the single SkeletonLoader implementation.
========================================
*/

export default function SkeletonLoader({ rows = 3 }) {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  )
}
