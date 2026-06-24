/*
Purpose

View Placement Drives Page.

Current Features:

- Search Drive
- Status Filter
- Export Button
- View Drive Table

Future Features:

- Backend integration
- Drive analytics
- Export reports
*/


// Import Dashboard Layout

import DashboardLayout from "../../layouts/DashboardLayout";


function ViewDrives() {

  return (

    <DashboardLayout>

      <div className="p-4 md:p-6">

        {/* Page Title */}

        <h1 className="text-2xl md:text-3xl font-bold mb-6">

          View Placement Drives

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

            {/* Search */}

            <input

              type="text"

              placeholder="Search Drive"

              className="

              border

              rounded-lg

              p-2

              w-full

              md:w-72

              "

            />

            {/* Filter */}

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

                All Status

              </option>

              <option>

                Open

              </option>

              <option>

                Closed

              </option>

            </select>

          </div>


          {/* Export Button */}

          <button

            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full lg:w-auto"

          >

            Export

          </button>

        </div>


        {/* Table */}

        <div

          className="

          bg-white

          rounded-lg

          shadow

          p-4

          overflow-x-auto

          "

        >

          <table className="w-full text-sm md:text-base">

            {/* Table Header */}

            <thead>

              <tr

                className="

                border-b

                text-left

                "

              >

                <th className="py-3 font-semibold">

                  Company

                </th>

                <th className="py-3 font-semibold">

                  Role

                </th>

                <th className="py-3 font-semibold">

                  Package

                </th>

                <th className="py-3 font-semibold">

                  Status

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

                  TCS

                </td>

                <td>

                  Software Engineer

                </td>

                <td>

                  7 LPA

                </td>

                <td>

                  Open

                </td>

                <td>

                  <button

                    className="

                    bg-green-600

                    text-white

                    px-3

                    py-1

                    rounded

                    "

                  >

                    View

                  </button>

                </td>

              </tr>


              <tr>

                <td className="py-4">

                  Infosys

                </td>

                <td>

                  System Engineer

                </td>

                <td>

                  6 LPA

                </td>

                <td>

                  Closed

                </td>

                <td>

                  <button

                    className="

                    bg-green-600

                    text-white

                    px-3

                    py-1

                    rounded

                    "

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

export default ViewDrives;