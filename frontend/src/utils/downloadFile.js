/*
Purpose
Reusable helper to trigger a browser file download. Used by Resume and
Reports pages.

Future Features
- Backend Integration: once files are served from the backend, pass the
  real file URL instead of a dummy blob.
*/

export function downloadFile(fileName, content = 'Dummy file content') {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
