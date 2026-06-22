import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

function AdminDashboard() {

  // Used for navigation
  const navigate = useNavigate();

  return (

    <DashboardLayout>

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

            className="bg-blue-600 text-white p-6 rounded shadow hover:scale-105 transition"
          >

            Student Management

          </button>

          {/* Recruiter Management */}

          <button

            onClick={() => navigate("/admin/recruiters")}

            className=" bg-green-600 text-white p-6 rounded shadow hover:scale-105 transition"
          >

            Recruiter Management

          </button>

          {/* Company Management */}

          <button

            onClick={() => navigate("/admin/companies")}

            className=" bg-purple-600 text-white p-6 rounded shadow hover:scale-105 transition"
          >

            Company Management

          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default AdminDashboard;