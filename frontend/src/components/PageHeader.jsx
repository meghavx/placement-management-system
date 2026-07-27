/*
========================================
Component: PageHeader

Purpose:
Every page begins with this reusable header (title, description,
breadcrumb, and optional primary/secondary action buttons), so no page
builds its own header layout.

Current Features:
- Title, description, breadcrumb trail, primary/secondary action slots

Future:
- None; keep this the single PageHeader implementation.
========================================
*/

import Breadcrumb from './Breadcrumb'

export default function PageHeader({ title, description, breadcrumb = [], primaryAction, secondaryAction }) {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">{title}</h1>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-wrap gap-2">
          {secondaryAction}
          {primaryAction}
        </div>
      )}
    </div>
  )
}
