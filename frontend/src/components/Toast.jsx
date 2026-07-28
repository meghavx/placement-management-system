/*
========================================
Component: Toast

Purpose:
Renders the global toast stack from useNotification(). Mounted once in
App.jsx so any page can call notify() to show a short temporary
message (e.g. "Profile Updated", "Drive Published").

Current Features:
- Stacks multiple toasts, auto-dismiss handled by the hook

Future:
- None; keep this the single Toast implementation.
========================================
*/

import { CheckCircle2, XCircle } from 'lucide-react'
import { useNotification } from '../hooks/useNotification'

export default function ToastContainer() {
  const { toasts, dismiss } = useNotification()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white shadow-lg ${
            toast.type === 'error' ? 'bg-red-600' : 'bg-gray-900'
          }`}
        >
          {toast.type === 'error' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
          {toast.message}
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            className="ml-2 text-white/70 hover:text-white"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
