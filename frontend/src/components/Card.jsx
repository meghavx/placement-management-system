/*
========================================
Component: Card

Purpose:
Generic information container used for companies, placement drives,
notifications, resumes, student profiles, and recruiters.

Current Features:
- Optional header (title + action), body, footer

Future:
- None; keep this the single Card implementation.
========================================
*/

export default function Card({ title, action, children, footer, className = '' }) {
  return (
    <div className={`rounded-xl border border-[#e5efe8] bg-[#ffffff] shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
          {action}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
      {footer && <div className="border-t border-gray-100 px-5 py-3">{footer}</div>}
    </div>
  )
}
