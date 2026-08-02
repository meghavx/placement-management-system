/*
Purpose
Centralized route paths so no component hardcodes a URL string.
Matches the Routing Guidelines section of the Frontend Engineering
Specification exactly.

Future Features
- None. This file should remain stable as the single source of truth.
*/

export const ROUTES = {
  LOGIN: '/',

  // Student routes
  STUDENT_DASHBOARD: '/student',
  STUDENT_PROFILE: '/student/profile',
  STUDENT_PROFILE_FORM: '/student/profile/edit',
  STUDENT_RESUME: '/student/resume',
  STUDENT_DRIVES: '/student/drives',
  STUDENT_APPLICATIONS: '/student/applications',
  STUDENT_NOTIFICATIONS: '/student/notifications',

  // Recruiter routes
  RECRUITER_DASHBOARD: '/recruiter',
  RECRUITER_CREATE_DRIVE: '/recruiter/create-drive',
  RECRUITER_EDIT_DRIVE: '/recruiter/edit-drive/:driveId',
  RECRUITER_VIEW_DRIVES: '/recruiter/view-drives',
  RECRUITER_VIEW_APPLICANTS: '/recruiter/view-applicants',
  RECRUITER_SHORTLIST: '/recruiter/shortlist',
  RECRUITER_INTERVIEWS: '/recruiter/interviews',
  RECRUITER_RESULTS: '/recruiter/results',
  RECRUITER_NOTIFICATIONS: '/recruiter/notifications',
  RECRUITER_ACTIVITIES: '/recruiter/activities/:driveId',
  RECRUITER_PROFILE: '/recruiter/profile',
  RECRUITER_PROFILE_FORM: '/recruiter/profile/edit',

  // Placement Admin routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_STUDENTS: '/admin/students',
  ADMIN_RECRUITERS: '/admin/recruiters',
  ADMIN_COMPANIES: '/admin/companies',
  ADMIN_DRIVES: '/admin/drives',
  // ADMIN_ELIGIBILITY: '/admin/eligibility',
  ADMIN_APPLICATIONS: '/admin/applications',
  // ADMIN_REPORTS: '/admin/reports',
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_PROFILE_FORM: '/admin/profile/edit',

  // Super Admin routes
  SUPER_ADMIN_LOGIN: '/super-admin/login',
  SUPER_ADMIN_DASHBOARD: '/super-admin',
  SUPER_ADMIN_PLACEMENT_ADMINS: '/super-admin/placement-admins',
  SUPER_ADMIN_AUDIT_LOGS: '/super-admin/audit-logs',
  SUPER_ADMIN_REPORTS: '/super-admin/reports',
  SUPER_ADMIN_SETTINGS: '/super-admin/settings',
}
