/*
Purpose

View Applicants Page.

Current Features:

- Search Student
- Status Filter
- Export Button
- Applicant Table

Future Features:

- Backend integration
- Applicant analytics
*/


// Import Dashboard Layout

import DashboardLayout from "../../layouts/DashboardLayout";


function ViewApplicants() {

  return (

    <DashboardLayout>

      <div className="p-6">

        {/* Page Title */}

        <h1 className="text-3xl font-bold mb-6">

          View Applicants

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

                All Status

              </option>

              <option>

                Applied

              </option>

              <option>

                Selected

              </option>

              <option>

                Rejected

              </option>

            </select>

          </div>


          {/* Export Button */}

          <button

            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"

          >

            Export

          </button>

        </div>


        {/* Table */}

        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">

          <table className="w-full">

            {/* Table Header */}

            <thead>

              <tr className="border-b text-left">

                <th className="py-3">

                  Student

                </th>

                <th className="py-3">

                  Company

                </th>

                <th className="py-3">

                  Job Role

                </th>

                <th className="py-3">

                  Status

                </th>

                <th className="py-3">

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

                  TCS

                </td>

                <td>

                  Software Engineer

                </td>

                <td>

                  Applied

                </td>

                <td>

                  <button

                    className="bg-blue-600 text-white px-3 py-1 rounded"

                  >

                    View

                  </button>

                </td>

              </tr>


              <tr>

                <td className="py-4">

                  Jane Doe

                </td>

                <td>

                  Infosys

                </td>

                <td>

                  Analyst

                </td>

                <td>

                  Selected

                </td>

                <td>

                  <button

                    className="bg-blue-600 text-white px-3 py-1 rounded"

                  >

                    View

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

export default ViewApplicants;