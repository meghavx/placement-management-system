/*
Purpose

Shortlist Students Page.

Current Features:

- Search Student
- Company Filter
- Shortlist Table

Future Features:

- Backend integration
- Automated shortlisting
*/


// Import Dashboard Layout

import DashboardLayout from "../../layouts/DashboardLayout";


function ShortlistStudents() {

  return (

    <DashboardLayout>

      <div className="p-4 md:p-6">

        {/* Page Title */}

        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Shortlist Students

        </h1>

        {/* Toolbar */}

        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">

          {/* Left Side */}

          <div className="flex flex-col md:flex-row gap-4">

            {/* Search */}

            <input

              type="text"

              placeholder="Search Student"

              className="border rounded-lg p-2 w-full md:w-72"

            />

            {/* Filter */}

            <select

              className="border rounded-lg p-2 w-full md:w-56"

            >

              <option>

                All Companies

              </option>

              <option>

                TCS

              </option>

              <option>

                Infosys

              </option>

              <option>

                Wipro

              </option>

            </select>

          </div>

          {/* Shortlist Button */}

          <button

            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full lg:w-auto"
          >

            Shortlist

          </button>

        </div>

        {/* Table */}

        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">

          <table className="w-full text-sm md:text-base">
            {/* Table Header */}

            <thead>

              <tr className="border-b text-left">

                <th className="py-3 font-semibold">

                  Student

                </th>

                <th className="py-3 font-semibold">

                  Department

                </th>

                <th className="py-3 font-semibold">

                  CGPA

                </th>

                <th className="py-3 font-semibold">

                  Actions

                </th>

              </tr>

            </thead>

            {/* Table Body */}

            <tbody>

              <tr className="border-b">

                <td className="py-4">

                  John Doe

                </td>

                <td>

                  CSE

                </td>

                <td>

                  8.7

                </td>

                <td>

                  <button

                    className="bg-green-600 text-white px-3 py-1 rounded"

                  >

                    Shortlist

                  </button>

                </td>

              </tr>

              <tr>

                <td className="py-4">

                  Jane Doe

                </td>

                <td>

                  AIML

                </td>

                <td>

                  9.1

                </td>

                <td>

                  <button

                    className="bg-green-600 text-white px-3 py-1 rounded"

                  >

                    Shortlist

                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default ShortlistStudents;