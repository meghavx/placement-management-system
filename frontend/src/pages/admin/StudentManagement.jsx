/*
Purpose

Student Management Page.

Current Features:

- Search Bar
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
import DashboardLayout from "../../layouts/DashboardLayout";


export default function StudentManagement() {

  return (

    <DashboardLayout role="admin">

      <div className="p-6">

        {/* Page Title */}

        <h1

          className="

          text-3xl

          font-bold

          mb-6

          "

        >

          Student Management

        </h1>

        {/* Toolbar */}

        <div

          className="

          flex

          flex-col

          lg:flex-row

          justify-between

          gap-4

          mb-6

          "

        >

          {/* Left Side */}

          <div

            className="

            flex

            flex-col

            md:flex-row

            gap-4

            "

          >

            {/* Search Input */}

            <input

              type="text"

              placeholder="Search Student"

              className="

              border

              rounded-lg

              p-2

              w-full

              md:w-72

              "

            />

            {/* Department Filter */}

            <select

              className="

              border

              rounded-lg

              p-2

              w-full

              md:w-56

              "

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

          {/* Add Student Button */}

          <button

            className="

            bg-blue-600

            text-white

            px-4

            py-2

            rounded-lg

            "

          >

            Add Student

          </button>

        </div>

        {/* Table Container */}

        <div

          className="

          bg-white

          rounded-lg

          shadow

          p-4

          "

        >

          <StudentTable />

        </div>

      </div>

    </DashboardLayout>

  );

}