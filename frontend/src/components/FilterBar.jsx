/*
========================================
Component: FilterBar

Purpose:
Reusable filter panel. Pages configure it with a `filters` prop
(array of Dropdown configs) so a single component drives every
listing page's filtering UI instead of each page building its own.

Current Features:
- Renders any number of Dropdown filters plus Reset button
- Collapses into a stacked layout on mobile automatically (grid)

Future:
- Could become a slide-in drawer on mobile if screen space demands it.
========================================
*/

import Dropdown from './Dropdown'
import Button from './Button'

export default function FilterBar({ filters = [], onReset }) {
  if (filters.length === 0) return null

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filters.map((filter) => (
          <Dropdown
            key={filter.name}
            label={filter.label}
            name={filter.name}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
            placeholder={`All ${filter.label}`}
          />
        ))}
      </div>
      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset Filters
        </Button>
      )}
    </div>
  )
}
