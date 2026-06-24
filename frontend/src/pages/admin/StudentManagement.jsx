/*
Purpose

Student Management Page.

Current Features:

- Search Student
- Department Filter
- Add Student Button
- Student Table

Future Features:

- Backend integration
- Search functionality
- Filter functionality
*/


// Import Student Table

import StudentTable from "./StudentTable";


function StudentManagement() {

  return (

    <div className="p-4 md:p-6">

      {/* Header Section */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        {/* Page Title */}

        <h1 className="text-2xl md:text-3xl font-bold">

          🎓 Student Management

        </h1>


        {/* Add Student Button */}

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition w-full md:w-auto">

          + Add Student

        </button>

      </div>


      {/* Toolbar */}

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">

        {/* Left Side */}

        <div className="flex flex-col md:flex-row gap-4">

          {/* Search Input */}

          <input

            type="text"

            placeholder="Search Student"

            className="border rounded-lg p-2 w-full md:w-72"

          />


          {/* Department Filter */}

          <select

            className="border rounded-lg p-2 w-full md:w-56"

          >

            <option>

              All Departments

            </option>

            <option>

              CSE

            </option>

            <option>

              AIML

            </option>

            <option>

              ETC

            </option>

          </select>

        </div>


        {/* Student Count */}

        <div className="flex items-center font-semibold">

          Total Students : 120

        </div>

      </div>


      {/* Table Container */}

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">

        <StudentTable />

      </div>

    </div>

  );

}

export default StudentManagement;