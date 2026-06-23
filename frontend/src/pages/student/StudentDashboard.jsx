/*
Purpose

Student Dashboard Home Page.

Current Features:
- Dashboard Summary Cards
- Recent Placement Drives
- Recent Notifications

Future Features:
- API Integration
- Live Statistics
- Drive Recommendations
*/

import DashboardLayout from "../../layouts/DashboardLayout";

function StudentDashboard() {

  /*
    Temporary Mock Data

    Later this data will come
    from backend APIs.
  */

  const stats = [
    {
      title: "Eligible Drives",
      value: 12
    },
    {
      title: "Applications",
      value: 5
    },
    {
      title: "Shortlisted",
      value: 2
    },
    {
      title: "Selected",
      value: 1
    }
  ];

  return (

    <DashboardLayout>

      {/* Page Heading */}

      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Student Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >

        {
          stats.map((card, index) => (

            <div
              key={index}
              className="
              bg-white
              shadow
              rounded-lg
              p-6
              "
            >

              <h2
                className="
                text-gray-600
                "
              >
                {card.title}
              </h2>

              <p
                className="
                text-3xl
                font-bold
                mt-2
                "
              >
                {card.value}
              </p>

            </div>

          ))
        }

      </div>

      {/* Recent Drives Section */}

      <div
        className="
        mt-10
        bg-white
        p-6
        rounded-lg
        shadow
        "
      >

        <h2
          className="
          text-xl
          font-semibold
          mb-4
          "
        >
          Recent Drives
        </h2>

        <ul
          className="
          space-y-2
          "
        >
          <li>TCS - Java Developer - 7 LPA</li>

          <li>Infosys - Full Stack Developer - 8 LPA</li>

          <li>Accenture - Associate Engineer - 6.5 LPA</li>
        </ul>

      </div>

    </DashboardLayout>

  );
}

export default StudentDashboard;