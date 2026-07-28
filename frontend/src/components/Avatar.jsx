/*
========================================
Component: Avatar

Purpose:
Reusable avatar used in the Navbar, Student Profile, Recruiter
listings, and Admin listings. Falls back to initials when no image
is available (no image uploads currently exist in this frontend).

Current Features:
- Renders initials from a full name
- Configurable size

Future:
- Backend Integration: render an <img> when a profile picture URL
  is returned by the backend.
========================================
*/

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
}

export default function Avatar({ name = '', size = 'md' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-transparent font-semibold text-primary-900 ${SIZE_CLASSES[size] || SIZE_CLASSES.md}`}
      aria-label={name}
    >
      {getInitials(name) || '?'}
    </div>
  )
}
