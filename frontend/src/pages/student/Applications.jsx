/*
Purpose

Applications Page.

Current Features:
- View Applied Drives
- Track Application Status

Future Features:
- Live Application Tracking
- Interview Status Updates
*/

import DashboardLayout from "../../layouts/DashboardLayout";

function Applications() {

  const applications = [
    {
      company: "TCS",
      status: "Shortlisted"
    },
    {
      company: "Infosys",
      status: "Applied"
    }
  ];

  return (

    <DashboardLayout>

      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        My Applications
      </h1>

      <div
        className="
        space-y-4
        "
      >

        {
          applications.map((application, index) => (

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
                "
              >
                {application.company}
              </h2>

              <p>
                Status: {application.status}
              </p>

            </div>

          ))
        }

      </div>

    </DashboardLayout>

  );
}

export default Applications;