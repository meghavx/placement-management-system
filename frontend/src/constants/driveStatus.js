/*
Purpose
Defines placement drive statuses used across Recruiter and Placement
Admin drive-management pages.

Current Features
- DRIVE_STATUS enum
- DRIVE_STATUS_COLORS mapping

Future Features
- Backend Integration: statuses will come from the PlacementDrive entity.
*/

export const DRIVE_STATUS = {
  DRAFT: 'DRAFT',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export const DRIVE_STATUS_COLORS = {
  [DRIVE_STATUS.DRAFT]: 'gray',
  [DRIVE_STATUS.OPEN]: 'green',
  [DRIVE_STATUS.CLOSED]: 'red',
  [DRIVE_STATUS.COMPLETED]: 'blue',
  [DRIVE_STATUS.CANCELLED]: 'yellow',
}
