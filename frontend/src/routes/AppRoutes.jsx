/*
Purpose

Contains all page routing.

Current Routes:

/             -> Login

/student      -> Student Dashboard

/admin        -> Admin Dashboard

/recruiter    -> Recruiter Dashboard
*/

// React Router components
import { Routes, Route } from "react-router-dom";


// Import pages
import Login from "../pages/auth/Login";
import StudentDashboard from "../pages/student/StudentDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";

/*
Purpose

Import admin management pages.

These pages will be accessible
through the Admin Dashboard.
*/

import StudentManagement from "../pages/admin/StudentManagement";

import RecruiterManagement from "../pages/admin/RecruiterManagement";

import CompanyManagement from "../pages/admin/CompanyManagement";

function AppRoutes() {

  return (

    <Routes>

      {/* Login Page */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* Student Dashboard */}
      <Route
        path="/student"
        element={<StudentDashboard />}
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      {/* Recruiter Dashboard */}
      <Route
        path="/recruiter"
        element={<RecruiterDashboard />}
      />

      {/* Student Management */}

<Route
  path="/admin/students"
  element={<StudentManagement />}
/>

{/* Recruiter Management */}

<Route
  path="/admin/recruiters"
  element={<RecruiterManagement />}
/>

{/* Company Management */}

<Route
  path="/admin/companies"
  element={<CompanyManagement />}
/>

    </Routes>

  );
}

export default AppRoutes;