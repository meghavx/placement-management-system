/*
Purpose

Current Dummy Login Page.

Right now:

- Takes User ID
- Takes Password
- Takes Role
- Redirects based on selected role

No backend integration yet.
*/

// Import useState hook
import { useState } from "react";

// Import useNavigate hook
import { useNavigate } from "react-router-dom";

function Login() {

  // Navigation hook
  const navigate = useNavigate();

  // Stores selected role
  const [role, setRole] = useState("");

  // Login Handler
  const handleLogin = () => {

    if (role === "") {
      alert("Please select a role");
      return;
    }

    if (role === "student") {
      navigate("/student");
    }

    if (role === "admin") {
      navigate("/admin");
    }

    if (role === "recruiter") {
      navigate("/recruiter");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {/* Login Card */}

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-center mb-2">

          🎓 Placement Management System

        </h1>

        {/* Subtitle */}

        <p className="text-gray-500 text-center mb-8">

          Campus Recruitment Portal

        </p>

        {/* Form */}

        <div className="space-y-4">

          {/* User ID */}

          <input
            type="text"
            placeholder="User ID"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Role */}

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >

            <option value="">
              Select Role
            </option>

            

            <option value="admin">
              Placement Admin
            </option>

            <option value="recruiter">
              Recruiter
            </option>

            <option value="student">
              Student
            </option>

          </select>

          {/* Login Button */}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >

            Login

          </button>

        </div>

        {/* Footer */}

        <p className="text-xs text-gray-400 text-center mt-8">

          © 2026 Placement Management System

        </p>

      </div>

    </div>

  );

}

export default Login;