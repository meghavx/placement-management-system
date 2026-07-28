/*
Purpose
Dummy data for the Super Admin module: dashboard summary, placement
admin accounts, and audit logs (SRS 2.3 Super Admin responsibilities).
*/

export const superAdminDashboardData = {
  stats: {
    totalPlacementAdmins: 4,
    totalInstitutionUsers: 1410,
    systemUptime: '99.9%',
    activeSessions: 212,
  },
}

export const placementAdminAccounts = [
  { id: 1, name: 'Dr. Kavita Rao', email: 'admin@college.edu', department: 'Training & Placement Cell', status: 'Active', createdDate: '2025-01-10' },
  { id: 2, name: 'Prof. Anil Deshmukh', email: 'anil.deshmukh@college.edu', department: 'Training & Placement Cell', status: 'Active', createdDate: '2025-03-22' },
]

export const auditLogData = [
  { id: 1, user: 'Dr. Kavita Rao', action: 'Created Student Account', entityType: 'Student', timestamp: '2026-07-25 10:32 AM' },
  { id: 2, user: 'Rohan Mehta', action: 'Published Placement Drive', entityType: 'Drive', timestamp: '2026-07-24 03:10 PM' },
  { id: 3, user: 'Suresh Iyer', action: 'Deactivated Recruiter Account', entityType: 'Recruiter', timestamp: '2026-07-22 11:45 AM' },
]
