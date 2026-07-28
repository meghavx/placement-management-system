/*
Purpose
Service layer for all Recruiter module data (dashboard, drives,
applicants, shortlisting, interviews, results, notifications).

Future Features
- Backend Integration: replace each dummy resolve() with the Axios call
  noted above the function. Keep the same function signature/shape.
*/

import { recruiterDashboardData } from '../data/recruiterDashboardData'
import { recruiterDriveData } from '../data/driveData'
import { applicantData } from '../data/applicantData'
import { shortlistedData } from '../data/shortlistedData'
import { interviewData } from '../data/interviewData'
import { resultData } from '../data/resultData'
import { recruiterNotificationData } from '../data/notificationData'

// Future: GET /recruiter/dashboard
export function getRecruiterDashboard() {
  return Promise.resolve(recruiterDashboardData)
}

// Future: GET /recruiter/drives
export function getRecruiterDrives() {
  return Promise.resolve(recruiterDriveData)
}

// Future: POST /recruiter/drives (body: drive DTO)
export function createDrive(drive) {
  return Promise.resolve({ id: Date.now(), ...drive })
}

// Future: PUT /recruiter/drives/{id}
export function updateDrive(driveId, updates) {
  return Promise.resolve({ id: driveId, ...updates })
}

// Future: DELETE /recruiter/drives/{id}
export function deleteDrive(driveId) {
  return Promise.resolve(driveId)
}

// Future: GET /recruiter/applicants
export function getApplicants() {
  return Promise.resolve(applicantData)
}

// Future: GET /recruiter/student/{id}
export function getApplicantProfile(studentId) {
  return Promise.resolve(applicantData.find((a) => a.id === studentId))
}

// Future: GET /recruiter/shortlisted
export function getShortlistedCandidates() {
  return Promise.resolve(shortlistedData)
}

// Future: PUT /recruiter/shortlist (body: { studentId, status })
export function updateShortlistStatus(studentId, status) {
  return Promise.resolve({ studentId, status })
}

// Future: GET /recruiter/interviews
export function getInterviews() {
  return Promise.resolve(interviewData)
}

// Future: POST /recruiter/interviews (body: interview DTO)
export function scheduleInterview(interview) {
  return Promise.resolve({ id: Date.now(), ...interview })
}

// Future: PUT /recruiter/interviews/{id}
export function updateInterview(interviewId, updates) {
  return Promise.resolve({ id: interviewId, ...updates })
}

// Future: GET /recruiter/results
export function getResults() {
  return Promise.resolve(resultData)
}

// Future: PUT /recruiter/results (body: { studentId, result })
export function publishResult(studentId, result) {
  return Promise.resolve({ studentId, result })
}

// Future: GET /recruiter/notifications
export function getRecruiterNotifications() {
  return Promise.resolve(recruiterNotificationData)
}
