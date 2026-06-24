/*
Purpose

Common Navbar used across all dashboards.

Current Features:
- Project Name
- Logged In User Placeholder

Future Features:
- Notifications
- User Profile
- Logout
*/

function Navbar({ toggleSidebar }) {

  return (

    <nav
      className="
      bg-blue-600
      text-white
      px-6
      py-4
      shadow
      "
    >

      <div
        className="
        flex
        justify-between
        items-center
        gap-4
        "
      >
        {/* Mobile Hamburger Button */}

        <button
          onClick={toggleSidebar}
          className="
          md:hidden
          text-2xl
          cursor-pointer
          "
        >
          ☰
        </button>

        {/* Project Title */}
        <h1
          className="
          text-sm
          md:text-xl
          font-bold
          whitespace-nowrap
          "
        >
          Placement Management System
        </h1>

        {/* Placeholder User */}
        <p
          className="
          text-sm
          md:text-base
          whitespace-nowrap
          "
        >
          Welcome User
        </p>

      </div>

    </nav>

  );
}

export default Navbar;