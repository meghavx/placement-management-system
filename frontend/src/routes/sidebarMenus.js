/*
Purpose
Configuration-driven sidebar menus for every role, exactly as required
by the spec ("The sidebar should be generated using configuration
objects instead of hardcoding every menu separately"). Sidebar.jsx
simply reads the array matching the current user's role.

Future Features
- None; add new items here only — never hardcode menu items in Sidebar.jsx.
*/

import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  ClipboardList,
  Bell,
  Users,
  Building2,
  ListChecks,
  BarChart3,
  ShieldCheck,
  History,
  Settings,
  UserPlus,
} from 'lucide-react'
import { ROLES } from '../constants/roles'
import { ROUTES } from '../constants/routes'

export const studentMenu = [
  { label: 'Dashboard', path: ROUTES.STUDENT_DASHBOARD, icon: LayoutDashboard },
  { label: 'Profile', path: ROUTES.STUDENT_PROFILE, icon: User },
  { label: 'Resume', path: ROUTES.STUDENT_RESUME, icon: FileText },
  { label: 'Placement Drives', path: ROUTES.STUDENT_DRIVES, icon: Briefcase },
  { label: 'Applications', path: ROUTES.STUDENT_APPLICATIONS, icon: ClipboardList },
  { label: 'Notifications', path: ROUTES.STUDENT_NOTIFICATIONS, icon: Bell },
]

export const recruiterMenu = [
  { label: 'Dashboard', path: ROUTES.RECRUITER_DASHBOARD, icon: LayoutDashboard },
  { label: 'Placement Drives', path: ROUTES.RECRUITER_VIEW_DRIVES, icon: Briefcase },
  { label: 'Create Drive', path: ROUTES.RECRUITER_CREATE_DRIVE, icon: UserPlus },
  { label: 'Applicants', path: ROUTES.RECRUITER_VIEW_APPLICANTS, icon: Users },
  { label: 'Shortlisted', path: ROUTES.RECRUITER_SHORTLIST, icon: ListChecks },
  { label: 'Interviews', path: ROUTES.RECRUITER_INTERVIEWS, icon: ClipboardList },
  { label: 'Results', path: ROUTES.RECRUITER_RESULTS, icon: FileText },
  { label: 'Notifications', path: ROUTES.RECRUITER_NOTIFICATIONS, icon: Bell },
]

export const placementAdminMenu = [
  { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: 'Students', path: ROUTES.ADMIN_STUDENTS, icon: Users },
  { label: 'Recruiters', path: ROUTES.ADMIN_RECRUITERS, icon: UserPlus },
  { label: 'Companies', path: ROUTES.ADMIN_COMPANIES, icon: Building2 },
  { label: 'Placement Drives', path: ROUTES.ADMIN_DRIVES, icon: Briefcase },
  { label: 'Eligibility', path: ROUTES.ADMIN_ELIGIBILITY, icon: ListChecks },
  { label: 'Applications', path: ROUTES.ADMIN_APPLICATIONS, icon: ClipboardList },
  { label: 'Reports & Analytics', path: ROUTES.ADMIN_REPORTS, icon: BarChart3 },
]

export const superAdminMenu = [
  { label: 'Dashboard', path: ROUTES.SUPER_ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: 'Placement Admins', path: ROUTES.SUPER_ADMIN_PLACEMENT_ADMINS, icon: ShieldCheck },
  { label: 'Audit Logs', path: ROUTES.SUPER_ADMIN_AUDIT_LOGS, icon: History },
  { label: 'Reports', path: ROUTES.SUPER_ADMIN_REPORTS, icon: BarChart3 },
  { label: 'Settings', path: ROUTES.SUPER_ADMIN_SETTINGS, icon: Settings },
]

export const SIDEBAR_MENUS = {
  [ROLES.STUDENT]: studentMenu,
  [ROLES.RECRUITER]: recruiterMenu,
  [ROLES.PLACEMENT_ADMIN]: placementAdminMenu,
  [ROLES.SUPER_ADMIN]: superAdminMenu,
}

// Landing dashboard route per role — used after login to redirect correctly.
export const ROLE_HOME_ROUTE = {
  [ROLES.STUDENT]: ROUTES.STUDENT_DASHBOARD,
  [ROLES.RECRUITER]: ROUTES.RECRUITER_DASHBOARD,
  [ROLES.PLACEMENT_ADMIN]: ROUTES.ADMIN_DASHBOARD,
  [ROLES.SUPER_ADMIN]: ROUTES.SUPER_ADMIN_DASHBOARD,
}
