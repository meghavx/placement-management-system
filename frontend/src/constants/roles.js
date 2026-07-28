/*
Purpose
Centralized definition of all user roles supported by the system, so
role names are never hardcoded as raw strings across components.

Current Features
- ROLES object with the four SRS-defined roles
- ROLE_LABELS for human-readable display

Future Features
- Backend Integration: roles will come from the JWT claims after login.
*/

export const ROLES = {
  STUDENT: 'STUDENT',
  RECRUITER: 'RECRUITER',
  PLACEMENT_ADMIN: 'PLACEMENT_ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
}

export const ROLE_LABELS = {
  [ROLES.STUDENT]: 'Student',
  [ROLES.RECRUITER]: 'Recruiter',
  [ROLES.PLACEMENT_ADMIN]: 'Placement Admin',
  [ROLES.SUPER_ADMIN]: 'Super Admin',
}
