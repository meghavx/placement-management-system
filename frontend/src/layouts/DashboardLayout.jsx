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

function DashboardLayout({ role, children }) {



  // Selects sidebar based on role.

  let sidebar;

  if (role === "student") {

    sidebar = <StudentSidebar />;

  }

  else if (role === "admin") {

    sidebar = <AdminSidebar />;

  }

  else if (role === "recruiter") {

    sidebar = <RecruiterSidebar />;

  }

  return (

    <div
      className="
      min-h-screen
      "
    >

      {/* Top Navbar */}
      <Navbar />

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