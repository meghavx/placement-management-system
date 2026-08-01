/*
Purpose
Root application component. Wires up global providers (Auth,
Notification) and the centralized route table. Matches the
Application Flow described in the spec:
Login -> Role Identification -> Redirect to Role Dashboard -> Sidebar Navigation.

Current Features
- AuthProvider and NotificationProvider wrap the whole app
- Centralized <Routes> definition using ROUTES constants
- Role-based route protection via ProtectedRoute
- Lazy-loaded page modules for a lighter initial bundle

Future Features
- Backend Integration: no changes needed here — auth/session logic
  lives in useAuth/authService only.
*/

import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { NotificationProvider } from './hooks/useNotification'
import ProtectedRoute from './layouts/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import LoadingScreen from './layouts/LoadingScreen'
import NotFound from './layouts/NotFound'
import { ROUTES } from './constants/routes'
import { ROLES } from './constants/roles'
import { ROLE_HOME_ROUTE } from './routes/sidebarMenus'

const LoginPage = lazy(() => import('./pages/auth/LoginPage'))

// Student pages
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'))
const StudentProfile = lazy(() => import('./pages/student/StudentProfile'))
const StudentProfileForm = lazy(() => import('./pages/student/StudentProfileForm'))
const StudentResume = lazy(() => import('./pages/student/StudentResume'))
const StudentDrives = lazy(() => import('./pages/student/StudentDrives'))
const StudentApplications = lazy(() => import('./pages/student/StudentApplications'))
const StudentNotifications = lazy(() => import('./pages/student/StudentNotifications'))

// Recruiter pages
const RecruiterDashboard = lazy(() => import('./pages/recruiter/RecruiterDashboard'))
const RecruiterDrives = lazy(() => import('./pages/recruiter/RecruiterDrives'))
const RecruiterDriveForm = lazy(() => import('./pages/recruiter/RecruiterDriveForm'))
const RecruiterApplicants = lazy(() => import('./pages/recruiter/RecruiterApplicants'))
const RecruiterShortlisted = lazy(() => import('./pages/recruiter/RecruiterShortlisted'))
const RecruiterInterviews = lazy(() => import('./pages/recruiter/RecruiterInterviews'))
const RecruiterResults = lazy(() => import('./pages/recruiter/RecruiterResults'))
const RecruiterNotifications = lazy(() => import('./pages/recruiter/RecruiterNotifications'))

// Placement Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminStudents = lazy(() => import('./pages/admin/AdminStudents'))
const AdminRecruiters = lazy(() => import('./pages/admin/AdminRecruiters'))
const AdminCompanies = lazy(() => import('./pages/admin/AdminCompanies'))
const AdminDrives = lazy(() => import('./pages/admin/AdminDrives'))
const AdminEligibility = lazy(() => import('./pages/admin/AdminEligibility'))
const AdminApplications = lazy(() => import('./pages/admin/AdminApplications'))
const AdminReports = lazy(() => import('./pages/admin/AdminReports'))

// Super Admin pages
const SuperAdminDashboard = lazy(() => import('./pages/superAdmin/SuperAdminDashboard'))
const SuperAdminPlacementAdmins = lazy(() => import('./pages/superAdmin/SuperAdminPlacementAdmins'))
const SuperAdminAuditLogs = lazy(() => import('./pages/superAdmin/SuperAdminAuditLogs'))
const SuperAdminReports = lazy(() => import('./pages/superAdmin/SuperAdminReports'))
const SuperAdminSettings = lazy(() => import('./pages/superAdmin/SuperAdminSettings'))

// Redirects an already-logged-in user straight to their dashboard
// instead of showing the login form again.
function LoginRoute() {
  const { isAuthenticated, role } = useAuth()
  if (isAuthenticated) {
    return <Navigate to={ROLE_HOME_ROUTE[role]} replace />
  }
  return <LoginPage />
}

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginRoute />} />

        {/* Student Module */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard />} />
          <Route path={ROUTES.STUDENT_PROFILE} element={<StudentProfile />} />
          <Route
            path={ROUTES.STUDENT_PROFILE_FORM}
            element={<StudentProfileForm />}
          />
          <Route path={ROUTES.STUDENT_RESUME} element={<StudentResume />} />
          <Route path={ROUTES.STUDENT_DRIVES} element={<StudentDrives />} />
          <Route path={ROUTES.STUDENT_APPLICATIONS} element={<StudentApplications />} />
          <Route path={ROUTES.STUDENT_NOTIFICATIONS} element={<StudentNotifications />} />
        </Route>

        {/* Recruiter Module */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLES.RECRUITER]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.RECRUITER_DASHBOARD} element={<RecruiterDashboard />} />
          <Route path={ROUTES.RECRUITER_VIEW_DRIVES} element={<RecruiterDrives />} />
          <Route path={ROUTES.RECRUITER_CREATE_DRIVE} element={<RecruiterDriveForm />} />
          <Route path={ROUTES.RECRUITER_EDIT_DRIVE} element={<RecruiterDriveForm />} />
          <Route path={ROUTES.RECRUITER_VIEW_APPLICANTS} element={<RecruiterApplicants />} />
          <Route path={ROUTES.RECRUITER_SHORTLIST} element={<RecruiterShortlisted />} />
          <Route path={ROUTES.RECRUITER_INTERVIEWS} element={<RecruiterInterviews />} />
          <Route path={ROUTES.RECRUITER_RESULTS} element={<RecruiterResults />} />
          <Route path={ROUTES.RECRUITER_NOTIFICATIONS} element={<RecruiterNotifications />} />
        </Route>

        {/* Placement Admin Module */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLES.PLACEMENT_ADMIN]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_STUDENTS} element={<AdminStudents />} />
          <Route path={ROUTES.ADMIN_RECRUITERS} element={<AdminRecruiters />} />
          <Route path={ROUTES.ADMIN_COMPANIES} element={<AdminCompanies />} />
          <Route path={ROUTES.ADMIN_DRIVES} element={<AdminDrives />} />
          <Route path={ROUTES.ADMIN_ELIGIBILITY} element={<AdminEligibility />} />
          <Route path={ROUTES.ADMIN_APPLICATIONS} element={<AdminApplications />} />
          <Route path={ROUTES.ADMIN_REPORTS} element={<AdminReports />} />
        </Route>

        {/* Super Admin Module */}
        <Route
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.SUPER_ADMIN_DASHBOARD} element={<SuperAdminDashboard />} />
          <Route path={ROUTES.SUPER_ADMIN_PLACEMENT_ADMINS} element={<SuperAdminPlacementAdmins />} />
          <Route path={ROUTES.SUPER_ADMIN_AUDIT_LOGS} element={<SuperAdminAuditLogs />} />
          <Route path={ROUTES.SUPER_ADMIN_REPORTS} element={<SuperAdminReports />} />
          <Route path={ROUTES.SUPER_ADMIN_SETTINGS} element={<SuperAdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRoutes />
      </NotificationProvider>
    </AuthProvider>
  )
}
