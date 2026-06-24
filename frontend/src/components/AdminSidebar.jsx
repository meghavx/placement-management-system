/*
Purpose

Admin Sidebar.

Used By:
- Admin Dashboard
- Student Management
- Recruiter Management
- Company Management
- Placement Drive Management
- Eligibility Management
- Application Monitoring
*/

import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar({ isSidebarOpen }) {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <aside
      className={`
        bg-gray-100
        p-4
        flex
        flex-col
        h-[calc(100vh-64px)]
        shrink-0
        w-56

        fixed
        md:static

        top-16
        left-0

        z-50

        transition-transform
        duration-300

        ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
    >

      <ul
        className="
        flex
        flex-col
        gap-4
        "
      >

        <li>
          <NavLink to="/admin" end className={({ isActive }) =>
            `
            cursor-pointer
            ${
                isActive
                ? "font-bold text-blue-600"
                : "text-black"
            }
            `
            }
        >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/students" className={({ isActive }) =>
            `
            cursor-pointer
            ${
                isActive
                ? "font-bold text-blue-600"
                : "text-black"
            }
            `
            }
        >
            Students
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/recruiters" className={({ isActive }) =>
            `
            cursor-pointer
            ${
                isActive
                ? "font-bold text-blue-600"
                : "text-black"
            }
            `
            }
        >
            Recruiters
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/companies" className={({ isActive }) =>
            `
            cursor-pointer
            ${
                isActive
                ? "font-bold text-blue-600"
                : "text-black"
            }
            `
            }
        >
            Companies
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/drives" className={({ isActive }) =>
            `
            cursor-pointer
            ${
                isActive
                ? "font-bold text-blue-600"
                : "text-black"
            }
            `
            }
        >
            Drives
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/eligibility" className={({ isActive }) =>
            `
            cursor-pointer
            ${
                isActive
                ? "font-bold text-blue-600"
                : "text-black"
            }
            `
            }
        >
            Eligibility
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/applications" className={({ isActive }) =>
            `
            cursor-pointer
            ${
                isActive
                ? "font-bold text-blue-600"
                : "text-black"
            }
            `
            }
        >
            Applications
          </NavLink>
        </li>

      </ul>

      <button
        onClick={handleLogout}
        className="
        mt-auto
        text-red-600
        font-semibold
        cursor-pointer
        "
      >
        Logout
      </button>

    </aside>

  );
}

export default AdminSidebar;