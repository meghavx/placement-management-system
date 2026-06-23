/*
Purpose

Recruiter Dashboard.

Current Features:

- Create Placement Drive
- View Placement Drives
- View Applicants
- Shortlist Students
- Selected Students

Future Features:

- Backend integration
- Applicant filtering
- Recruiter analytics
*/


// Import Dashboard Layout

import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";


function RecruiterDashboard() {
  const navigate = useNavigate();

  return (

    <DashboardLayout>

      <div

        className=" flex flex-col gap-6"

      >

        {/* Dashboard Title */}

        <h1

          className=" text-3xl font-bold"

        >

          Recruiter Dashboard

        </h1>


        {/* Responsive Card Grid */}

        <div

          className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

        >

          {/* Create Placement Drive */}

          <button

            onClick={() => navigate("/recruiter/create-drive")}
            className=" bg-orange-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

          >

            🚀 Create Placement Drive

          </button>


          {/* View Drives */}

          <button
            onClick={() => navigate("/recruiter/view-drives")}  
            className=" bg-blue-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

          >

            📄 View Placement Drives

          </button>
        

          {/* Applicants */}

          <button
            onClick={() => navigate("/recruiter/view-applicants")} 
            className="bg-green-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

          >

            👨‍🎓 View Applicants

          </button>


          {/* Shortlist */}

          <button
            onClick={() => navigate("/recruiter/shortlist")} 
            className="bg-purple-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

          >

            ⭐ Shortlist Students

          </button>


          {/* Selected Students */}

          <button
            onClick={() => navigate("/recruiter/selected")} 
            className="bg-cyan-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

          >

            ✅ Shortlisted Students

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default RecruiterDashboard;