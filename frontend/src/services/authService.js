/*
Purpose
Handles user authentication. Currently implemented with mock logic so
the full login → role redirect flow works without a backend, exactly as
described in the Authentication Flow section of the spec.

Current Features
- loginUser(username, password, role): matches against dummy user records
  AND requires the selected role to match the account's actual role.
- logoutUser(): clears any session state

Future Features
- Backend Integration:
  Endpoint: POST /api/auth/login
  Request: { username, password, role }
  Response: { token, role, fullName, email }
  Loading State: show a spinner on the Login button while awaiting response.
  Error State: show "Invalid email, password, or role" on 401.
  JWT: store response.token and attach it via apiClient's interceptor.
  Note: the backend should still validate the role server-side even
  though the frontend also checks it, since client-side checks alone
  are not a security boundary.
  Files To Modify: authService.js only — LoginPage.jsx stays unchanged.
*/

import { ROLES } from '../constants/roles'

// Dummy user directory used only for frontend demonstration purposes.
const DUMMY_USERS = [
  {
    username: 'student@college.edu',
    password: 'password123',
    role: ROLES.STUDENT,
    fullName: 'Aditi Sharma',
    email: 'student@college.edu',
  },
  {
    username: 'recruiter@techcorp.com',
    password: 'password123',
    role: ROLES.RECRUITER,
    fullName: 'Rohan Mehta',
    email: 'recruiter@techcorp.com',
  },
  {
    username: 'admin@college.edu',
    password: 'password123',
    role: ROLES.PLACEMENT_ADMIN,
    fullName: 'Dr. Kavita Rao',
    email: 'admin@college.edu',
  },
  {
    username: 'superadmin@college.edu',
    password: 'password123',
    role: ROLES.SUPER_ADMIN,
    fullName: 'Suresh Iyer',
    email: 'superadmin@college.edu',
  },
]

export function loginUser(username, password, role) {
  return new Promise((resolve, reject) => {
    // Simulated network delay so the loading state can be demonstrated.
    setTimeout(() => {
      const match = DUMMY_USERS.find(
        (u) => u.username === username && u.password === password && u.role === role,
      )
      if (match) {
        resolve({ ...match, token: 'dummy-jwt-token' })
      } else {
        reject(new Error('Invalid email, password, or role selected.'))
      }
    }, 600)
  })
}

export function logoutUser() {
  // Backend Integration: call POST /api/auth/logout to invalidate the
  // token server-side once available.
  return Promise.resolve(true)
}
