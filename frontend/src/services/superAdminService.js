/*
Purpose
Service layer for the Super Admin module (Placement Admin account
management, audit logs, reports, system settings).

Future Features
- Backend Integration: replace with real endpoints once the Super Admin
  backend module is implemented (SRS 2.3 Super Admin responsibilities).
*/

import { superAdminDashboardData } from '../data/superAdminData'
import { placementAdminAccounts } from '../data/superAdminData'
import { auditLogData } from '../data/superAdminData'

// Future: GET /super-admin/dashboard
export function getSuperAdminDashboard() {
  return Promise.resolve(superAdminDashboardData)
}

// Future: GET /super-admin/placement-admins
export function getPlacementAdmins() {
  return Promise.resolve(placementAdminAccounts)
}

// Future: POST /super-admin/placement-admins
export function createPlacementAdmin(admin) {
  return Promise.resolve({ id: Date.now(), ...admin })
}

// Future: PUT /super-admin/placement-admins/{id}
export function updatePlacementAdmin(adminId, updates) {
  return Promise.resolve({ id: adminId, ...updates })
}

// Future: GET /super-admin/audit-logs
export function getAuditLogs() {
  return Promise.resolve(auditLogData)
}
