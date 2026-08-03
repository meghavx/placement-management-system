/*
Purpose
Defines every possible job application status exactly as described in
the SRS (FR-4.7.4 to FR-4.7.8), plus the color used to represent each
status consistently across the whole application.

Current Features
- APPLICATION_STATUS enum
- APPLICATION_STATUS_COLORS for Badge components

Future Features
- Backend Integration: statuses will be returned by the Application DTO.
*/

export const APPLICATION_STATUS = {
  APPLIED: 'APPLIED',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  SELECTED: 'SELECTED',
  REJECTED: 'REJECTED',
}

// Consistent color mapping used by the Badge component everywhere.
export const APPLICATION_STATUS_COLORS = {
  APPLIED: 'blue',
  SHORTLISTED: 'yellow',
  INTERVIEW_SCHEDULED: 'purple',
  SELECTED: 'green',
  REJECTED: 'red',
}
