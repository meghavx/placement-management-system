/*
========================================
Component: Sidebar

Purpose:
Single reusable sidebar shared by every role. It reads the correct
menu configuration from sidebarMenus.js based on the logged-in user's
role — no role's menu is ever hardcoded here.

Current Features:
- Highlights the active route
- Collapses into an off-canvas drawer on mobile, controlled by useSidebar

Future:
- None; keep this the single Sidebar implementation.
========================================
*/

import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { SIDEBAR_MENUS } from '../routes/sidebarMenus'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../constants/routes'

export default function Sidebar({ isOpen, onClose }) {
  const { role, logout } = useAuth()
  const navigate = useNavigate()

  const menuItems = SIDEBAR_MENUS[role] || []

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <>
      {/* Backdrop for mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onClose}
          role="presentation"
        />
      )}

      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 shrink-0
          bg-gradient-to-br from-[#57f967] via-[#42e886] to-[#28d0ac] transition-transform duration-200
          md:static md:top-0 md:h-full md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="flex h-full flex-col justify-between overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path.split('/').length <= 2}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-black/15! text-black!'
                        : 'text-black! hover:bg-black/10! hover:text-black!'
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-black hover:bg-black/10 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}
