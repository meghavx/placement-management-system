/*
Purpose
Service layer for the Placement Admin module (dashboard, student
management, recruiter management, drives, eligibility, applications,
reports).

Future Features
- Backend Integration: replace each dummy resolve() with the noted
  Axios call once the Spring Boot endpoints are available.
*/

import { adminDashboardData } from '../data/adminDashboardData'
import { studentManagementData } from '../data/studentManagementData'
import { recruiterManagementData } from '../data/recruiterManagementData'
import { placementDriveManagementData } from '../data/placementDriveManagementData'
import { eligibilityData } from '../data/eligibilityData'
import { adminApplicationData } from '../data/applicationData'
import { reportData } from '../data/reportData'
import apiClient from './apiClient'

// Future: GET /admin/dashboard
export function getAdminDashboard() {
  return Promise.resolve(adminDashboardData)
}

// Future: GET /placement-admin/profile
export async function getAdminProfile() {
  const response = await apiClient.get('/placement-admin/profile')
  return response.data.data
}

export async function updateAdminProfile(profile) {
  const response = await apiClient.put(
    '/placement-admin/profile',
    {
      fullName: profile.fullName,
      phoneNumber: profile.phoneNumber,
    }
  )

  return response.data.data
}


// Future: GET /admin/students
export async function getStudents() {
  try {
    const response = await apiClient.get('/students')

    return response.data.data.map((student) => ({
      id: student.rollNumber || student.id,

      userId: student.userId,

      name: student.fullName,
      email: student.email,
      phone: student.phoneNumber,

      department: student.department,

      batch: student.graduationYear
        ? `${student.graduationYear - 4}-${student.graduationYear}`
        : '-',

      cgpa: student.cgpa,

      rollNumber: student.rollNumber,

      backlogs: student.currentBacklogs,

      status: student.active ? 'Active' : 'Inactive',
    }))
  } catch (error) {
    console.error('Failed to fetch students:', error)
    throw error
  }
}

export async function importStudents(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.post(
    '/students/import',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data.data
}

export async function createStudent(student) {
  try {
    const response = await apiClient.post('/students', {
      fullName: student.fullName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      rollNumber: student.rollNumber,
      department: student.department,
      graduationYear: Number(student.graduationYear),
      cgpa: Number(student.cgpa),
      currentBacklogs: Number(student.currentBacklogs),
    })

    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to create student.'
    )
  }
}

// Future: PUT /admin/students/{id}
export function updateStudent(studentId, updates) {
  return Promise.resolve({ id: studentId, ...updates })
}

// Future: DELETE /admin/students/{id}
export function deleteStudent(studentId) {
  return Promise.resolve(studentId)
}

// Future: GET /admin/recruiters
export async function getRecruiters() {
  try {
    const response = await apiClient.get('/recruiters')

    return response.data.data.map((recruiter) => ({
      id: recruiter.id,
      userId: recruiter.userId,

      recruiter: recruiter.fullName,
      company: recruiter.companyName,

      email: recruiter.email,
      phone: recruiter.phoneNumber,

      status: recruiter.active ? 'Active' : 'Inactive',

      designation: recruiter.designation,
      companyId: recruiter.companyId,

      // Backend doesn't provide this yet
      createdDate: null,
    }))
  } catch (error) {
    console.error('Failed to fetch recruiters:', error)
    throw error
  }
}

// Future: POST /admin/recruiters (body: recruiter DTO)
export function createRecruiter(recruiter) {
  return Promise.resolve({ id: Date.now(), ...recruiter })
}

// Future: PUT /admin/recruiters/{id}
export function updateRecruiter(recruiterId, updates) {
  return Promise.resolve({ id: recruiterId, ...updates })
}

// Future: DELETE /admin/recruiters/{id}
export function deleteRecruiter(recruiterId) {
  return Promise.resolve(recruiterId)
}

// Future: GET /admin/drives
// export function getAdminDrives() {
//   return Promise.resolve(placementDriveManagementData)
// }
export async function getAdminDrives() {
  try {
    const response = await apiClient.get('/drives')

    const statusMap = {
      DRAFT: 'Draft',
      PUBLISHED: 'Published',
      CLOSED: 'Closed',
      EXPIRED: 'Expired',
    }

    return response.data.data.map((drive) => ({
      id: drive.id,

      drive: `${drive.companyName} - ${drive.jobRole}`,

      company: drive.companyName,

      role: drive.jobRole,

      package: drive.packageOffered,

      deadline: drive.driveDate,

      status: statusMap[drive.status] ?? drive.status,

      // Backend doesn't provide these yet
      applicants: 0,

      location: drive.location,

      eligible: drive.eligible,

      ineligibilityReasons: drive.ineligibilityReasons,
    }))
  } catch (error) {
    console.error('Failed to fetch drives:', error)
    throw error
  }
}

// Future: PUT /admin/drives/{id}
export function updateAdminDrive(driveId, updates) {
  return Promise.resolve({ id: driveId, ...updates })
}

// Future: GET /admin/eligibility
export function getEligibilityCriteria() {
  return Promise.resolve(eligibilityData)
}

// Future: PUT /admin/eligibility/{id}
export function updateEligibilityCriteria(driveId, criteria) {
  return Promise.resolve({ driveId, ...criteria })
}

// Future: GET /admin/applications
export function getAllApplications() {
  return Promise.resolve(adminApplicationData)
}

// Future: GET /admin/reports  and  GET /admin/analytics
export function getReports() {
  return Promise.resolve(reportData)
}

// Future: POST /admin/export (body: { reportType, format })
export function exportReport(format) {
  return Promise.resolve({ format, status: 'exported' })
}

// ================================
// Placement Drives
// ================================

// export const getPlacementDrives = async () => {
//   const response = await api.get('/drives')
//   return response.data.data
// }

// // ================================
// // Applications
// // ================================

// export const getDriveApplications = async (driveId) => {
//   const response = await api.get(
//     `/recruiter/drives/${driveId}/applications`
//   )

//   return response.data.data
// }

// export const getApplicationById = async (applicationId) => {
//   const response = await api.get(
//     `/student/applications/${applicationId}`
//   )

//   return response.data.data
// }

export const getPlacementDrives = async () => placementDriveManagementData

export const getDriveApplications = async (driveId) =>
  applicationData.filter(app => app.driveId === Number(driveId))

export const getApplicationById = async (applicationId) =>
  applicationData.find(app => app.id === Number(applicationId))