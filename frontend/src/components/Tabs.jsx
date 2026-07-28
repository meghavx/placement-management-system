/*
========================================
Component: Tabs

Purpose:
Reusable tab navigation used on Student Profile, Reports, Drive
Details, and Applicant Details pages.

Current Features:
- Controlled tabs via `active` + `onChange`

Future:
- None; keep this the single Tabs implementation.
========================================
*/

export default function Tabs({ tabs = [], active, onChange }) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex flex-wrap gap-4" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active === tab.value}
            onClick={() => onChange(tab.value)}
            className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
              active === tab.value
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
