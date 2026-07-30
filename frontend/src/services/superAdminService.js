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
import apiClient from './apiClient'

// Future: GET /super-admin/dashboard
export function getSuperAdminDashboard() {
  return Promise.resolve(superAdminDashboardData)
}


// Future: GET /super-admin/placement-admins
// export function getPlacementAdmins() {
//   return Promise.resolve(placementAdminAccounts)
// }
export async function getPlacementAdmins() {
  try {
    const response = await apiClient.get('/admin/placement-admins')

    return response.data.data.map((admin) => ({
      id: admin.id,

      name: admin.fullName,
      email: admin.email,

      createdDate: null,

      phoneNumber: admin.phoneNumber,

      status: admin.active ? 'Active' : 'Inactive',
    }))
  } catch (error) {
    console.error('Failed to fetch placement admins:', error)
    throw error
  }
}

// Future: POST /super-admin/placement-admins
// export function createPlacementAdmin(admin) {
//   return Promise.resolve({ id: Date.now(), ...admin })
// }

export async function createPlacementAdmin(admin) {
  const response = await apiClient.post('/admin/placement-admins', {
    fullName: admin.name,
    email: admin.email,
    phoneNumber: admin.phoneNumber,
    password: admin.password,
  })

  const created = response.data.data

  return {
    id: created.id,
    name: created.fullName,
    email: created.email,
    createdDate: null,
    phoneNumber: created.phoneNumber,
    status: created.active ? 'Active' : 'Inactive',
  }
}

// Future: PUT /super-admin/placement-admins/{id}
// export function updatePlacementAdmin(adminId, updates) {
//   return Promise.resolve({ id: adminId, ...updates })
// }
export async function updatePlacementAdmin(adminId, admin) {
  const response = await apiClient.put(`/admin/placement-admins/${adminId}`, {
    fullName: admin.name,
    email: admin.email,
    phoneNumber: admin.phoneNumber,
  })

  const updated = response.data.data

  return {
    id: updated.id,
    name: updated.fullName,
    email: updated.email,
    createdDate: null,
    phoneNumber: updated.phoneNumber,
    status: updated.active ? 'Active' : 'Inactive',
  }
}

export async function updatePlacementAdminStatus(adminId, active) {
  const response = await apiClient.patch(
    `/admin/placement-admins/${adminId}/status`,
    null,
    {
      params: {
        active,
      },
    }
  )

  const updated = response.data.data

  return {
    id: updated.id,
    name: updated.fullName,
    email: updated.email,
    createdDate: null,
    phoneNumber: updated.phoneNumber,
    status: updated.active ? 'Active' : 'Inactive',
  }
}

// Future: GET /super-admin/audit-logs
// export function getAuditLogs() {
//   return Promise.resolve(auditLogData)
// }

export async function getAuditLogs() {
  try {
    const response = await apiClient.get('/audit-logs')

    console.log(response.data)
    return response.data.data.map((log) => ({
      id: log.id,

      user: log.userName,

      action: log.action,

      entityType: log.entityType,

      timestamp: log.createdAt,

      // Keep these in case we need them later
      userId: log.userId,
      entityId: log.entityId,
      description: log.description,
      ipAddress: log.ipAddress,
    }))
  } catch (error) {
    console.error('Failed to fetch audit logs:', error)
    throw error
  }
}


// GET /api/auth/me
export async function getCurrentUser() {
  try {
    const response = await apiClient.get('/auth/me')

    const user = response.data.data

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error('Failed to fetch current user:', error)
    throw error
  }
}
