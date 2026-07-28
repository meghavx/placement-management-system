/*
========================================
Component: Dropdown

Purpose:
Reusable select/dropdown used for departments, statuses, filters, and
form fields across the entire application.

Current Features:
- Label, placeholder option, required indicator, error message
- Accepts a simple string[] or {label, value}[] options array

Future:
- Multi-select variant if a page needs it (not currently required).
========================================
*/

export default function Dropdown({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  error = '',
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        className={`rounded-lg border bg-white px-3 py-2 text-sm text-gray-900
          ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}
          focus:outline-none focus:ring-1 focus:ring-primary-500`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value
          const optionLabel = typeof option === 'string' ? option : option.label
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          )
        })}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
