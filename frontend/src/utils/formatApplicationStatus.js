export function formatApplicationStatus(status) {
  if (!status) return '-'

  return status
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}