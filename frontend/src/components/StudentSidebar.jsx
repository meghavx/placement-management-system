/*
Purpose

Student Sidebar.

Used By:
- Student Dashboard
- Student Profile
- Student Drives
- Student Applications
- Student Resume
- Student Notifications
*/

import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <aside
      className="
      w-56
      bg-gray-100
      p-4
      flex
      flex-col
      min-h-screen
      shrink-0
      "
    >

      <ul
        className="
        flex
        flex-col
        gap-4
        "
      >

        <li>
          <NavLink
            to="/student"
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold text-blue-600"
                : ""
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/student/profile" className={({ isActive }) =>
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
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/student/drives" className={({ isActive }) =>
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
          <NavLink to="/student/applications"  className={({ isActive }) =>
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

        <li>
          <NavLink to="/student/resume" className={({ isActive }) =>
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
            Resume
          </NavLink>
        </li>

        <li>
          <NavLink to="/student/notifications" className={({ isActive }) =>
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
            Notifications
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

export default StudentSidebar;