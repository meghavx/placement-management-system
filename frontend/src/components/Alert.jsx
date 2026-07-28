/*
========================================
Component: Alert

Purpose:
Reusable dismissible alert banner used for form-level success,
warning, error, and information messages.

Current Features:
- Types: success, warning, error, info
- Dismissible with onClose

Future:
- None; keep this the single Alert implementation.
========================================
*/

import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

const TYPE_CONFIG = {
  success: { icon: CheckCircle2, classes: 'bg-green-50 text-green-700 border-green-200' },
  warning: { icon: AlertTriangle, classes: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  error: { icon: XCircle, classes: 'bg-red-50 text-red-700 border-red-200' },
  info: { icon: Info, classes: 'bg-blue-50 text-blue-700 border-blue-200' },
}

export default function Alert({ type = 'info', message, onClose }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.info
  const Icon = config.icon

  return (
    <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${config.classes}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <p className="flex-1">{message}</p>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Dismiss alert">
          <X size={16} />
        </button>
      )}
    </div>
  )
}
