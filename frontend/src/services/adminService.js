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

// Future: GET /admin/dashboard
export function getAdminDashboard() {
  return Promise.resolve(adminDashboardData)
}

// Future: GET /admin/students
export function getStudents() {
  return Promise.resolve(studentManagementData)
}

// Future: POST /admin/students (body: student DTO)
export function createStudent(student) {
  return Promise.resolve({ id: Date.now(), ...student })
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
export function getRecruiters() {
  return Promise.resolve(recruiterManagementData)
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
export function getAdminDrives() {
  return Promise.resolve(placementDriveManagementData)
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
