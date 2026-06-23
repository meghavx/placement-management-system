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

import PlacementDriveManagement from "../pages/admin/PlacementDriveManagement";

import EligibilityManagement from "../pages/admin/EligibilityManagement";

import ApplicationMonitoring from "../pages/admin/ApplicationMonitoring";


//These pages will be accessible through the Recruiter Dashboard
import CreateDrive from "../pages/recruiter/CreateDrive";

import ViewDrives from "../pages/recruiter/ViewDrives";

import ViewApplicants from "../pages/recruiter/ViewApplicants";

import ShortlistStudents from "../pages/recruiter/ShortlistStudents";

import SelectedStudents from "../pages/recruiter/SelectedStudents";

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

{/* Placement Drive Management */}

<Route

  path="/admin/drives"

  element={<PlacementDriveManagement />}

/>

<Route

  path="/admin/eligibility"

  element={<EligibilityManagement />}

/>

<Route

  path="/admin/applications"

  element={<ApplicationMonitoring />}

/>

{/* Create Drive */}

<Route

  path="/recruiter/create-drive"

  element={<CreateDrive />}

/>


{/* View Drives */}

<Route

  path="/recruiter/view-drives"

  element={<ViewDrives />}

/>


{/* View Applicants */}

<Route

  path="/recruiter/view-applicants"

  element={<ViewApplicants />}

/>


{/* Shortlist Students */}

<Route

  path="/recruiter/shortlist"

  element={<ShortlistStudents />}

/>


{/* Selected Students */}

<Route

  path="/recruiter/selected"

  element={<SelectedStudents />}

/>

    </Routes>

  );
}

export default AppRoutes;