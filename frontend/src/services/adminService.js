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
      // Database ID (used for API calls)
      studentId: student.id,

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

export async function updateStudent(studentId, studentData) {
  try {
    const response = await apiClient.put(
      `/students/${studentId}`,
      studentData
    )

    return response.data.data
  } catch (error) {
    console.error('Failed to update student:', error)

    throw new Error(
      error.response?.data?.message ||
      'Failed to update student'
    )
  }
}

export async function updateStudentStatus(studentId, active) {
  try {
    const response = await apiClient.patch(
      `/students/${studentId}/status`,
      null,
      {
        params: {
          active,
        },
      }
    )

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to update student status.'
    )
  }
}

export async function getStudentResume(studentId) {
  const response = await apiClient.get(
    `/student/${studentId}/resume`
  )

  return response.data.data
}

export async function downloadStudentResume(studentId) {
  const response = await apiClient.get(
    `/student/${studentId}/resume/download`,
    {
      responseType: 'blob',
    }
  )

  return response.data
}

export async function getRecruiters() {
  try {
    const response = await apiClient.get('/recruiters')

    return response.data.data.map((recruiter) => ({
      id: recruiter.id,
      userId: recruiter.userId,

      recruiter: recruiter.fullName,
      email: recruiter.email,
      phone: recruiter.phoneNumber,

      companyId: recruiter.companyId,
      company: recruiter.companyName,

      designation: recruiter.designation,

      active: recruiter.active,
      status: recruiter.active ? 'Active' : 'Inactive',
    }))
  } catch (error) {
    console.error('Failed to fetch recruiters:', error)
    throw error
  }
}

export async function createRecruiter(recruiter) {
  try {
    const response = await apiClient.post('/recruiters', {
      fullName: recruiter.fullName,
      email: recruiter.email,
      phoneNumber: recruiter.phone,
      companyId: Number(recruiter.companyId),
      designation: recruiter.designation,
    })

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to create recruiter.'
    )
  }
}

export async function updateRecruiter(id, recruiter) {
  try {
    const response = await apiClient.put(
      `/recruiters/${id}`,
      {
        fullName: recruiter.fullName,
        email: recruiter.email,
        phoneNumber: recruiter.phone,
        companyId: Number(recruiter.companyId),
        designation: recruiter.designation,
      }
    )

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to update recruiter.'
    )
  }
}

export async function updateRecruiterStatus(id, active) {
  try {
    const response = await apiClient.patch(
      `/recruiters/${id}/status`,
      null,
      {
        params: {
          active,
        },
      }
    )

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to update recruiter status.'
    )
  }
}

export async function getAdminDrives() {
  try {
    const response = await apiClient.get('/drives')

    return response.data.data.filter(
      (drive) => drive.status !== 'DRAFT'
    )
  } catch (error) {
    console.error('Failed to fetch drives:', error)
    throw error
  }
}

export async function getDriveById(id) {
  try {
    const response = await apiClient.get(`/drives/${id}`)

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to load drive details.'
    )
  }
}

export async function getDriveApplications() {
  try {
    const response = await apiClient.get(
      '/placement-admin/applications'
    )

    return response.data.data
  } catch (error) {
    console.error('Failed to fetch applications:', error)
    throw error
  }
}

export async function getApplicationById(applicationId) {
  try {
    const response = await apiClient.get(
      `/placement-admin/applications/${applicationId}`
    )

    return response.data.data
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      'Failed to load application details.'
    )
  }
}

// Future: GET /admin/reports  and  GET /admin/analytics
export function getReports() {
  return Promise.resolve(reportData)
}

// Future: POST /admin/export (body: { reportType, format })
export function exportReport(format) {
  return Promise.resolve({ format, status: 'exported' })
}