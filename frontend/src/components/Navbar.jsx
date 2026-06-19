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

function Navbar() {

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
        "
      >

        {/* Project Title */}
        <h1
          className="
          text-lg
          md:text-xl
          font-bold
          "
        >
          Placement Management System
        </h1>

        {/* Placeholder User */}
        <p>
          Welcome User
        </p>

      </div>

    </nav>

  );
}

export default Navbar;