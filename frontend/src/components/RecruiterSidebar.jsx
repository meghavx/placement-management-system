/*
Purpose

Recruiter Sidebar.

Used By:
- Recruiter Dashboard
- Create Drive
- View Drives
- View Applicants
- Shortlist Students
- Selected Students
*/

import { NavLink, useNavigate } from "react-router-dom";

function RecruiterSidebar({ isSidebarOpen }) {

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
          <NavLink to="/recruiter" end className={({ isActive }) =>
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
          <NavLink to="/recruiter/create-drive" className={({ isActive }) =>
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
            Create Drive
          </NavLink>
        </li>

        <li>
          <NavLink to="/recruiter/view-drives" className={({ isActive }) =>
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
            View Drives
          </NavLink>
        </li>

        <li>
          <NavLink to="/recruiter/view-applicants" className={({ isActive }) =>
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
            Applicants
          </NavLink>
        </li>

        <li>
          <NavLink to="/recruiter/shortlist" className={({ isActive }) =>
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
            Shortlist
          </NavLink>
        </li>

        <li>
          <NavLink to="/recruiter/selected" className={({ isActive }) =>
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
            Selected
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

export default RecruiterSidebar;