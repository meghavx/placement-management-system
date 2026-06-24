/*
Purpose

Placement Drives Page.

Current Features:
- Display Available Drives

Future Features:
- Apply For Drive
- View Drive Details
- Eligibility Check
*/

import DashboardLayout from "../../layouts/DashboardLayout";

function Drives() {

  const drives = [
    {
      company: "TCS",
      role: "Java Developer",
      package: "7 LPA"
    },
    {
      company: "Infosys",
      role: "Full Stack Developer",
      package: "8 LPA"
    }
  ];

  return (

    <DashboardLayout role="student">

      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Placement Drives
      </h1>

      <div
        className="
        space-y-4
        "
      >

        {
          drives.map((drive, index) => (

            <div
              key={index}
              className="
              bg-white
              p-4
              rounded-lg
              shadow
              "
            >

              <h2
                className="
                font-bold
                text-lg
                "
              >
                {drive.company}
              </h2>

              <p>{drive.role}</p>

              <p>{drive.package}</p>

            </div>

          ))
        }

      </div>

    </DashboardLayout>

  );
}

export default Drives;