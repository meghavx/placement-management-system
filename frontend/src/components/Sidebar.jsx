/*
Purpose

Common Sidebar.

Current Features:
- Placeholder Menu

Future Features:
- Dynamic Menu based on Role
- Icons
- Navigation Links
*/

function Sidebar() {

  return (

    <aside className="w-full md:w-64 bg-gray-100 p-4">

      <ul className="flex md:flex-col gap-4">

        <li>Dashboard</li>

        <li>Profile</li>

        <li>Settings</li>

      </ul>

    </aside>

  );
}

export default Sidebar;