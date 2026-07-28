/*
Purpose
Provides one consistent date formatting function so date display never
diverges across pages (dashboards, tables, notifications, etc).
*/

// Formats an ISO date string (e.g. "2026-07-20") into "20 Jul 2026".
export function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Formats an ISO datetime string into "20 Jul 2026, 10:30 AM".
export function formatDateTime(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
