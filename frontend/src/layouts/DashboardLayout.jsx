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
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {

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
        <Sidebar />

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