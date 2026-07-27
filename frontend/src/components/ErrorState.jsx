/*
========================================
Component: ErrorState

Purpose:
Reusable error display with a Retry action, used whenever an
asynchronous operation fails (SRS Error Handling requirement).

Current Features:
- Message + Retry button

Future:
- Backend Integration: pass the real error.message from a failed
  Axios call once services throw real errors.
========================================
*/

import { AlertTriangle } from 'lucide-react'
import Button from './Button'

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <span className="rounded-full bg-red-50 p-4 text-red-500">
        <AlertTriangle size={28} />
      </span>
      <p className="text-sm text-gray-700">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}
