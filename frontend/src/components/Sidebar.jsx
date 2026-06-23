/*
Purpose

Common Sidebar.

Current Features:
- Navigation Between Student Pages

Future Features:
- Dynamic Sidebar Based On Role
- Icons
- Collapsible Sidebar
*/

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {

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

      <div className="flex flex-col gap-4">
        <ul
          className="
          flex
          flex-col
          gap-4
          "
        >

          {/* Dashboard Page */}

          <li>
              <NavLink
                to="/student"
                end
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-600"
                    : "text-black"
                }
              >
                Dashboard
              </NavLink>
            
          </li>

          {/* Profile Page */}

          <li>
            <NavLink
              to="/student/profile"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600"
                  : "text-black"
              }
            >
              Profile
            </NavLink>
          </li>

          {/* Placement Drives Page */}

          <li>
            <NavLink
              to="/student/drives"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600"
                  : "text-black"
              }
            >
              Drives
            </NavLink>
          </li>

          {/* Applications Page */}

          <li>
            <NavLink
              to="/student/applications"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600"
                  : "text-black"
              }
            >
              Applications
            </NavLink>
          </li>

          {/* Resume Page */}

          <li>
            <NavLink
              to="/student/resume"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600"
                  : "text-black"
              }
            >
              Resume
            </NavLink>
          </li>

          {/* Notifications Page */}

          <li>
            <NavLink
              to="/student/notifications"
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600"
                  : "text-black"
              }
            >
              Notifications
            </NavLink>
          </li>

        </ul>

      
      </div>

      <button
        onClick={handleLogout}
        className="mt-auto text-left text-red-600 font-semibold mt-auto cursor-pointer"
      >
        Logout
      </button>

    </aside>

  );
}

export default Sidebar;