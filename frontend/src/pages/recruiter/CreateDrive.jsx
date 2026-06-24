/*
Purpose

Create Placement Drive Page.

Current Features:

- Company Name
- Job Role
- Package
- Location
- Application Deadline

Future Features:

- Backend integration
- Drive validation
*/


// Import Dashboard Layout

import DashboardLayout from "../../layouts/DashboardLayout";


function CreateDrive() {

  return (

    <DashboardLayout role="recruiter">

      {/* Main Page Container */}

      <div className="p-4 md:p-6">

        {/* Page Title */}

        <h1 className="text-2xl md:text-3xl font-bold mb-8">

          Create Placement Drive

        </h1>

        {/* Main Form Container */}

        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-4 md:p-6">

          {/* Company Name */}

          <div className="mb-4">

            <label className="block mb-2 font-semibold">

              Company Name

            </label>

            <input

              type="text"

              placeholder="Enter Company Name"

              className="border rounded-lg p-3 w-full"

            />

          </div>


          {/* Job Role */}

          <div className="mb-4">

            <label className="block mb-2 font-semibold">

              Job Role

            </label>

            <input

              type="text"

              placeholder="Enter Job Role"

              className="border rounded-lg p-3 w-full"

            />

          </div>


          {/* Package */}

          <div className="mb-4">

            <label className="block mb-2 font-semibold">

              Package (LPA)

            </label>

            <input

              type="text"

              placeholder="Enter Package"

              className="border rounded-lg p-3 w-full"

            />

          </div>


          {/* Location */}

          <div className="mb-4">

            <label className="block mb-2 font-semibold">

              Location

            </label>

            <input

              type="text"

              placeholder="Enter Location"

              className="border rounded-lg p-3 w-full"

            />

          </div>


          {/* Application Deadline */}

          <div className="mb-8">

            <label className="block mb-2 font-semibold">

              Application Deadline

            </label>

            <input

              type="date"

              className="border rounded-lg p-3 w-full"

            />

          </div>


          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-4">

            {/* Create Button */}

            <button

              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"

            >

              Create Drive

            </button>


            {/* Reset Button */}

            <button

              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition w-full sm:w-auto"

            >

              Reset

            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default CreateDrive;