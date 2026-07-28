/*
Purpose
Truncates long text (job descriptions, notification bodies) so cards
and tables stay visually consistent.
*/

export function truncateText(text, maxLength = 100) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}
