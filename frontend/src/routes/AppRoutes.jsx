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

import Profile from "../pages/student/Profile";
import Drives from "../pages/student/Drives";
import Applications from "../pages/student/Applications";
import Resume from "../pages/student/Resume";
import Notifications from "../pages/student/Notifications";

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

      {/* Student Profile */}
      <Route
        path="/student/profile"
        element={<Profile />}
      />

      {/* Student Drives */}
      <Route
        path="/student/drives"
        element={<Drives />}
      />

      {/* Student Applications */}
      <Route
        path="/student/applications"
        element={<Applications />}
      />

      {/* Student Resume */}
      <Route
        path="/student/resume"
        element={<Resume />}
      />

      {/* Student Notifications */}
      <Route
        path="/student/notifications"
        element={<Notifications />}
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