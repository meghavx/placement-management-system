/*
========================================
Component: Navbar

Purpose:
Single Navbar shared by every authenticated page (spec Part 2 section
6). Shows the app name, hamburger menu (mobile), user greeting,
profile avatar, and logout.

Current Features:
- Hamburger button toggles the Sidebar drawer on mobile
- Displays "Welcome, <name>" and role label
- Logout button

Future:
- Notification bell and theme toggle, per the spec's "Future" note.
========================================
*/

import { Menu, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { GraduationCap, User } from 'lucide-react'
import { ROLE_LABELS } from '../constants/roles'
import { ROUTES } from '../constants/routes'
import Avatar from '../components/Avatar'

export default function Navbar({ onToggleSidebar }) {
  const { user, role, logout } = useAuth()

  const handleLogout = async() => {
    logout()
    window.location.href = ROUTES.LOGIN
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-gradient-to-br from-[#57f967] via-[#42e886] to-[#28d0ac] px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="rounded-md p-2 text-primary-100 hover:bg-white/10 hover:text-white md:hidden"
        >
          <Menu size={22} />
        </button>
        <span className="rounded-full bg-transparent p-3 text-black-400">
          <GraduationCap size={28} />
        </span>
        
        <span className="text-sm font-semibold sm:text-base">
          Placement Management System
        </span>
      </div>

      <div className="flex items-center gap-1 md:gap-4">
        <span className="rounded-full bg-transparent text-primary-900">
          <User size={20} />
        </span>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium ">
            Welcome, {user?.fullName}
          </p>
          <p className="text-xs text-primary-900">{ROLE_LABELS[role]}</p>
        </div>
        <Avatar className="bg-transparent text-primary-900" name={user?.fullName} size="sm" />
      </div>
    </header>
  )
}
