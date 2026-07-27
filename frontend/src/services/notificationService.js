/*
Purpose
Shared notification actions (mark read / delete) used by Student and
Recruiter Notification pages, since both roles interact with
notifications the same way.

Future Features
- Backend Integration:
  PUT /student/notifications/{id} or /recruiter/notifications/{id}
  DELETE /student/notifications/{id} or /recruiter/notifications/{id}
*/

export function markNotificationRead(notificationId) {
  return Promise.resolve({ id: notificationId, isRead: true })
}

export function deleteNotification(notificationId) {
  return Promise.resolve(notificationId)
}
