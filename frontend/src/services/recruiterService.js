/*
Purpose
Service layer for all Recruiter module data (dashboard, drives,
applicants, shortlisting, interviews, results, notifications).

Future Features
- Backend Integration: replace each dummy resolve() with the Axios call
  noted above the function. Keep the same function signature/shape.
*/

import apiClient from './apiClient'

import { recruiterDriveData } from '../data/driveData'
// import { applicantData } from '../data/applicantData'
// import { shortlistedData } from '../data/shortlistedData'
import { interviewData } from '../data/interviewData'
import { resultData } from '../data/resultData'

import { recruiterNotificationData } from '../data/notificationData'

// Future: GET /recruiter/dashboard
// export function getRecruiterDashboard() {
//   return Promise.resolve(recruiterDashboardData)
// }
export async function getRecruiterDashboard() {
  try {
    const response = await apiClient.get('/recruiter/dashboard')

    return {
      stats: {
        totalDrives: response.data.data.totalDrives,
        activeDrives: response.data.data.activeDrives,
        applicationsReceived: response.data.data.totalApplications,
        candidatesShortlisted: response.data.data.shortlistedCandidates,
        selectedCandidates: response.data.data.selectedCandidates,
      },
      recentDrives: [],
      latestApplicants: [],
      upcomingInterviews: [],
      notifications: [],
    }
  } catch (error) {
    console.error('Failed to fetch recruiter dashboard:', error)
    throw error
  }
}

// Future: GET /recruiter/drives
// export function getRecruiterDrives() {
//   return Promise.resolve(recruiterDriveData)
// }
export async function getRecruiterDrives() {
  try {
    const response = await apiClient.get('/drives')

    return response.data.data.map((drive) => ({
      id: drive.id,
      company: drive.companyName,
      role: drive.jobRole,
      package: drive.packageOffered,
      location: drive.location,
      driveDate: drive.driveDate,
      status: drive.status,
      eligible: drive.eligible,
    }))
  } catch (error) {
    console.error('Failed to fetch recruiter drives:', error)
    throw error
  }
}

export async function getRecruiterDriveById(driveId) {
  try {
    const response = await apiClient.get(`/drives/${driveId}`)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch drive details:', error)
    throw error
  }
}

// Future: POST /recruiter/drives (body: drive DTO)
// export function createDrive(drive) {
//   return Promise.resolve({ id: Date.now(), ...drive })
// }
export async function createDrive(drive) {
  try {
    const response = await apiClient.post('/recruiter/drives', drive)
    return response.data.data
  } catch (error) {
    console.error('Failed to create drive:', error)
    throw error
  }
}

// Future: PUT /recruiter/drives/{id}
// export function updateDrive(driveId, updates) {
//   return Promise.resolve({ id: driveId, ...updates })
// }
export async function updateDrive(driveId, drive) {
  try {
    const response = await apiClient.put(
      `/recruiter/drives/${driveId}`,
      drive
    )

    return response.data.data
  } catch (error) {
    console.error('Failed to update drive:', error)
    throw error
  }
}

export async function getDriveEligibility(driveId) {
  try {
    const response = await apiClient.get(`/drives/${driveId}/eligibility`)
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch eligibility:', error)
    throw error
  }
}

export async function createDriveEligibility(driveId, eligibility) {
  try {
    const response = await apiClient.post(
      `/recruiter/drives/${driveId}/eligibility`,
      eligibility
    )

    return response.data.data
  } catch (error) {
    console.error('Failed to create eligibility:', error)
    throw error
  }
}

export async function updateDriveEligibility(driveId, eligibility) {
  try {
    const response = await apiClient.put(
      `/recruiter/drives/${driveId}/eligibility`,
      eligibility
    )

    return response.data.data
  } catch (error) {
    console.error('Failed to update eligibility:', error)
    throw error
  }
}


// Future: GET /recruiter/applicants
// export function getApplicants() {
//   return Promise.resolve(applicantData)
// }
export async function getApplicants(driveId) {
  try {
    const response = await apiClient.get(
      `/recruiter/drives/${driveId}/applications`
    )

    return response.data.data.map((application) => ({
      id: application.id,
      studentId: application.studentId,
      studentName: application.studentName,
      rollNumber: application.rollNumber,
      driveId: application.driveId,
      companyName: application.companyName,
      jobRole: application.jobRole,
      packageOffered: application.packageOffered,
      driveDate: application.driveDate,
      appliedAt: application.appliedAt,
      status: application.status,
    }))
  } catch (error) {
    console.error('Failed to fetch applicants:', error)
    throw error
  }
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
// export function updateShortlistStatus(studentId, status) {
//   return Promise.resolve({ studentId, status })
// }
export async function updateApplicationStatus(applicationId, status) {
  try {
    const response = await apiClient.patch(
      `/recruiter/applications/${applicationId}/status`,
      {
        status,
      }
    )

    return response.data.data
  } catch (error) {
    console.error('Failed to update application status:', error)
    throw error
  }
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
