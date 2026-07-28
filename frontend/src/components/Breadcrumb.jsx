/*
========================================
Component: Breadcrumb

Purpose:
Reusable breadcrumb navigation shown inside PageHeader on every page.

Current Features:
- Renders a simple trail of labels with ">" separators

Future:
- Could later link intermediate crumbs to their routes if needed.
========================================
*/

import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-gray-500">
      {items.map((item, index) => (
        <span key={item} className="flex items-center gap-1">
          {index > 0 && <ChevronRight size={12} />}
          <span className={index === items.length - 1 ? 'font-medium text-gray-700' : ''}>{item}</span>
        </span>
      ))}
    </nav>
  )
}
