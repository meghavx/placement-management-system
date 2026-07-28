/*
========================================
Component: SearchBar

Purpose:
Reusable search input used on every listing page (Students, Recruiters,
Placement Drives, Applications, Reports).

Current Features:
- Search icon, clear button, placeholder

Future:
- Backend Integration: wrap the value with useDebounce before calling
  a search API, once server-side search is available.
========================================
*/

import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-9 text-sm
          focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
