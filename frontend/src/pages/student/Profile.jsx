/*
Purpose

Student Profile Page.

Current Features:
- Display Student Information

Future Features:
- Edit Profile
- Save Profile
- API Integration
*/

import DashboardLayout from "../../layouts/DashboardLayout";

function Profile() {

  return (

    <DashboardLayout role="student">

      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        My Profile
      </h1>

      <div
        className="
        bg-white
        p-6
        rounded-lg
        shadow
        space-y-4
        "
      >

        <p>
          <strong>Name:</strong> John Doe
        </p>

        <p>
          <strong>Email:</strong> john@example.com
        </p>

        <p>
          <strong>Roll Number:</strong> 2023001
        </p>

        <p>
          <strong>Department:</strong> Computer Science
        </p>

        <p>
          <strong>CGPA:</strong> 8.4
        </p>

        <p>
          <strong>Current Backlogs:</strong> 0
        </p>

      </div>

    </DashboardLayout>

  );
}

export default Profile;