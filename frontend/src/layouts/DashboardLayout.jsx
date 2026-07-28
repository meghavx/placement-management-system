/*
========================================
Component: DashboardLayout

Purpose:
The ONE shared layout used by every authenticated page in the
application (Navbar + Sidebar + Main Content + Footer), per the
mandatory Dashboard Layout section of the spec. No page ever builds
its own layout.

Current Features:
- Renders Navbar, Sidebar, Footer, and the routed page content
- Controls sidebar open/close on mobile via useSidebar

Future Features
- None; keep this the single DashboardLayout implementation.
========================================
*/

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import ToastContainer from '../components/Toast'
import { useSidebar } from '../hooks/useSidebar'

export default function DashboardLayout() {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar()

  return (
    <div className="flex h-screen flex-col">
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} onClose={closeSidebar} />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
