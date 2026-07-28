/*
Purpose
Controls sidebar open/collapsed state for mobile devices. Shared by
DashboardLayout, Navbar (hamburger button), and Sidebar.
*/

import { useState } from 'react'

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen((prev) => !prev)
  const closeSidebar = () => setIsOpen(false)

  return { isOpen, toggleSidebar, closeSidebar }
}
