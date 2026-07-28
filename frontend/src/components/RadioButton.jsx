/*
========================================
Component: RadioButton

Purpose:
Reusable radio input group, e.g. selecting Interview Type or Gender.

Current Features:
- Renders a group of radio options from a simple array

Future:
- None; keep this the single RadioButton implementation.
========================================
*/

export default function RadioButton({ label, name, options = [], value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}
