/*
Purpose
Shared notification APIs used across Student, Recruiter,
Placement Admin, and Super Admin modules.

The backend identifies the logged-in user from the JWT token and
returns only notifications relevant to that user.
*/

import apiClient from './apiClient'

// GET /notifications
export async function getNotifications() {
  try {
    const response = await apiClient.get('/notifications')
    return response.data.data
  } catch (error) {
    console.error('Failed to fetch notifications:', error)
    throw error
  }
}

// PATCH /notifications/{notificationId}/read
export async function markNotificationRead(notificationId) {
  try {
    const response = await apiClient.patch(
      `/notifications/${notificationId}/read`
    )

    return response.data.data
  } catch (error) {
    console.error('Failed to mark notification as read:', error)

    throw new Error(
      error.response?.data?.message ||
      'Failed to mark notification as read.'
    )
  }
}