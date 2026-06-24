/*
Purpose

Reusable Dashboard Layout.

Structure:

Navbar
-------------------

Sidebar | Content

Used By:
- Student Dashboard
- Admin Dashboard
- Recruiter Dashboard
*/

import Navbar from "../components/Navbar";

import StudentSidebar from "../components/StudentSidebar";
import AdminSidebar from "../components/AdminSidebar";
import RecruiterSidebar from "../components/RecruiterSidebar";

import { useState } from "react";

function DashboardLayout({ role, children }) {


  // Controls mobile sidebar visibility.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  
  // Selects sidebar based on role.

  let sidebar;

  if (role === "student") {

    sidebar = (
      <StudentSidebar
        isSidebarOpen={isSidebarOpen}
      />
    );

  }

  else if (role === "admin") {

    sidebar = (
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
      />
    );

  }

  else if (role === "recruiter") {

    sidebar = (
      <RecruiterSidebar
        isSidebarOpen={isSidebarOpen}
      />
    );

  }

  return (

    <div
      className="
      min-h-screen
      "
    >

      {/* Top Navbar */}
      <Navbar
        toggleSidebar={() =>
          setIsSidebarOpen(!isSidebarOpen)
        }
      />

      <div
        className="
        flex
        "
      >

        {/* Left Sidebar */}
        {sidebar}

        {/* Page Content */}
        <main
          className="
          flex-1
          p-6
          "
        >

          {children}

        </main>

      </div>

    </div>

  );
}

export default DashboardLayout;