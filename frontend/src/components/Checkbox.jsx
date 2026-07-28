/*
========================================
Component: Checkbox

Purpose:
Reusable checkbox input for filters and forms (e.g. eligibility
skills selection).

Current Features:
- Label, checked state, disabled state

Future:
- None; keep this the single Checkbox implementation.
========================================
*/

export default function Checkbox({ label, name, checked, onChange, disabled = false }) {
  return (
    <label htmlFor={name} className="flex items-center gap-2 text-sm text-gray-700">
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
      />
      {label}
    </label>
  )
}
