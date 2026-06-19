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

    </Routes>

  );
}

export default AppRoutes;