/*
========================================
Component: Footer

Purpose:
Simple shared footer shown at the bottom of the dashboard layout.

Current Features:
- Copyright line

Future:
- None.
========================================
*/

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-4 text-center text-xs text-gray-400">
      © {new Date().getFullYear()} College Placement Management Portal. All rights reserved.
    </footer>
  )
}
