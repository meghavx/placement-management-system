/*
Purpose

Current Dummy Login Page.

Right now:

Takes User ID
Takes Password
Takes Role
Redirects based on selected role

No backend integration yet.
*/



// Import useState hook
// Used to store the selected role
import { useState } from "react";

// Import useNavigate hook
// Used for page navigation
import { useNavigate } from "react-router-dom";

function Login() {

  // Creates a navigate function
  // Example:
  // navigate("/student")
  const navigate = useNavigate();

  // role variable stores:
  // student
  // admin
  // recruiter
  const [role, setRole] = useState("");

  // Runs when Login button is clicked
  const handleLogin = () => {

    // Prevent login without selecting role
    if(role === ""){
        alert("Please select a role");
        return;
    }

    // If student selected
    if(role === "student"){
      navigate("/student");
    }

    // If admin selected
    if(role === "admin"){
      navigate("/admin");
    }

    // If recruiter selected
    if(role === "recruiter"){
      navigate("/recruiter");
    }
  };

  return (

    // Full screen container
    // flex-col -> place items vertically
    // items-center -> center horizontally
    // justify-center -> center vertically
    // min-h-screen -> take full screen height
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">

      {/* Main heading */}
      <h1 className="text-3xl font-bold">
        Placement Management System
      </h1>

      {/* User ID input */}
      <input
        type="text"
        placeholder="User ID"
        className="border p-2 rounded"
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
      />

      {/* Role dropdown */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">
          Select Role
        </option>

        <option value="student">
          Student
        </option>

        <option value="admin">
          Placement Admin
        </option>

        <option value="recruiter">
          Recruiter
        </option>

      </select>

      {/* Login button */}
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>

    </div>
  );
}

export default Login;