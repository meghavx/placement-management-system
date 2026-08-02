/*
Purpose
Central list of academic departments, used by student profile forms,
eligibility criteria forms, and filters throughout the application.

Future Features
- Backend Integration: replace with GET /admin/departments if the
  institution's department list becomes dynamic.
*/

// export const DEPARTMENTS = [
//   'Computer Science',
//   'Information Technology',
//   'Electronics & Communication',
//   'Electrical Engineering',
//   'Mechanical Engineering',
//   'Civil Engineering',
//   'Artificial Intelligence & Data Science',
// ]
export const DEPARTMENTS = [
  { label: 'Computer Science', value: 'CSE' },
  { label: 'Information Technology', value: 'IT' },
  { label: 'Electronics & Communication', value: 'ECE' },
  { label: 'Mechanical Engineering', value: 'MECHANICAL' },
  { label: 'Civil Engineering', value: 'CIVIL' },
  { label: 'Chemical Engineering', value: 'CHEMICAL' },
  { label: 'Biotechnology', value: 'BIOTECHNOLOGY' },
  { label: 'Other', value: 'OTHER' },
]
