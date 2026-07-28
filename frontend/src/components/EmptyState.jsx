/*
========================================
Component: EmptyState

Purpose:
Single reusable "no data" state used by every table/list across the
application (No Applications, No Drives, No Students, etc), per the
Empty State requirements in the spec.

Current Features:
- Icon, title, description, optional action button

Future:
- None; keep this the single EmptyState implementation.
========================================
*/

import { Inbox } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'No data found',
  description = 'There is nothing to show here yet.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <span className="rounded-full bg-gray-100 p-4 text-gray-400">
        <Icon size={28} />
      </span>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <p className="max-w-sm text-sm text-gray-500">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
