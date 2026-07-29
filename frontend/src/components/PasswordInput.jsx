/*
========================================
Component: PasswordInput

Purpose:
Password field with a show/hide toggle. Kept separate from Input
because of the extra visibility-toggle behaviour, but shares the same
visual language.

Current Features:
- Toggle password visibility
- Same label/error/helper API as Input

Future:
- Password strength meter (not required by SRS currently).
========================================
*/

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  helperText = '',
  className = '',
}) {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400
            ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'}
            focus:outline-none focus:ring-1 focus:ring-primary-500`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  )
}
