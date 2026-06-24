import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

function AdminDashboard() {

  // Used for navigation
  const navigate = useNavigate();

  return (

    <DashboardLayout role="admin">

      <div
        className="flex flex-col gap-6"
      >

        {/* Dashboard Title */}

        <h1
          className=" text-3xl font-bold"
        >

          Placement Admin Dashboard

        </h1>

        {/* Responsive Button Grid */}

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >

          {/* Student Management */}

          <button

            onClick={() => navigate("/admin/students")}

            className="bg-blue-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"
          >

            📚 Student Management

          </button>

          {/* Recruiter Management */}

          <button

            onClick={() => navigate("/admin/recruiters")}

            className="bg-green-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"
          >

            👨‍💼 Recruiter Management

          </button>

          {/* Company Management */}

          <button

            onClick={() => navigate("/admin/companies")}

            className="bg-purple-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"
          >

            🏢 Company Management

          </button>

          {/* Placement Drive Management */}

<button

  onClick={() => navigate("/admin/drives")}

  className="bg-orange-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

>

  🚀 Placement Drives

</button>

{/* Eligibility Management */}

<button

  onClick={() => navigate("/admin/eligibility")}

  className="bg-pink-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

>

  🎯 Eligibility Management

</button>


{/* Application Monitoring */}

<button

  onClick={() => navigate("/admin/applications")}

  className="bg-cyan-600 h-32 text-lg font-semibold text-white rounded-xl shadow-lg hover:scale-105 transition duration-300"

>

  📄 Application Monitoring

</button>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default AdminDashboard;