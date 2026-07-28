/*
========================================
Component: ProtectedRoute

Purpose:
Guards every authenticated route. Redirects to Login if the user is
not authenticated, and enforces Role-Based Access Control (RBAC) by
redirecting to the user's own dashboard if they try to access a route
belonging to a different role (SRS FR-4.1.4).

Current Features
- isAuthenticated check
- allowedRoles check

Future Features
- Backend Integration: once JWT is live, also verify token expiry here
  before allowing access.
========================================
*/

import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../constants/routes'
import { ROLE_HOME_ROUTE } from '../routes/sidebarMenus'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, role } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={ROLE_HOME_ROUTE[role] || ROUTES.LOGIN} replace />
  }

  return children
}
