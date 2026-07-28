/*
Purpose
Service layer for all Student module data. Pages call these functions
instead of importing data files or Axios directly, per the mandatory
Page → Service → Axios → Backend rule in the spec.

Current Features
- Every function resolves with dummy data from src/data.

Future Features
- Backend Integration: replace each function body with the matching
  Axios call shown in the comment above it. Keep function names and
  return shapes identical so pages require no changes.
*/

import { studentDashboardData } from '../data/studentDashboardData'
import { studentProfileData } from '../data/studentProfileData'
import { resumeData } from '../data/resumeData'
import { placementDrivesData } from '../data/placementDrivesData'
import { studentApplicationData } from '../data/applicationData'
import { studentNotificationData } from '../data/notificationData'

// Future: GET /student/dashboard
export function getStudentDashboard() {
  return Promise.resolve(studentDashboardData)
}

// Future: GET /student/profile
export function getStudentProfile() {
  return Promise.resolve(studentProfileData)
}

// Future: PUT /student/profile  (body: updated profile fields)
export function updateStudentProfile(updatedProfile) {
  return Promise.resolve({ ...studentProfileData, ...updatedProfile })
}

// Future: GET /student/resume
export function getStudentResume() {
  return Promise.resolve(resumeData)
}

// Future: POST /student/resume (multipart/form-data file upload)
export function uploadStudentResume(file) {
  return Promise.resolve({ ...resumeData, fileName: file?.name || resumeData.fileName })
}

// Future: DELETE /student/resume
export function deleteStudentResume() {
  return Promise.resolve(true)
}

// Future: GET /student/drives
export function getEligibleDrives() {
  return Promise.resolve(placementDrivesData)
}

// Future: POST /student/apply (body: { driveId })
export function applyToDrive(driveId) {
  return Promise.resolve({ driveId, status: 'Applied' })
}

// Future: GET /student/applications
export function getStudentApplications() {
  return Promise.resolve(studentApplicationData)
}

// Future: GET /student/notifications
export function getStudentNotifications() {
  return Promise.resolve(studentNotificationData)
}
