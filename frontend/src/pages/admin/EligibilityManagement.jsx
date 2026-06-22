/*
Purpose

Eligibility Management Page.

Current Features:

- Department Selection
- Minimum CGPA
- Maximum Backlogs
- Graduation Year
- Save Button
- Reset Button

Future Features:

- Backend integration
- Eligibility validation
*/


function EligibilityManagement() {

  return (

    <div className="p-6">

      {/* Page Title */}

      <h1

        className="

        text-3xl

        font-bold

        mb-8

        "

      >

        Eligibility Management

      </h1>

      {/* Main Form */}

      <div

        className="

        bg-white

        rounded-lg

        shadow

        p-6

        max-w-3xl

        "

      >

        {/* Department */}

        <div className="mb-4">

          <label className="block mb-2 font-semibold">

            Department

          </label>

          <select

            className="

            border

            rounded-lg

            p-3

            w-full

            "

          >

            <option>

              Select Department

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


        {/* CGPA */}

        <div className="mb-4">

          <label className="block mb-2 font-semibold">

            Minimum CGPA

          </label>

          <input

            type="number"

            placeholder="Enter CGPA"

            className="

            border

            rounded-lg

            p-3

            w-full

            "

          />

        </div>


        {/* Backlogs */}

        <div className="mb-4">

          <label className="block mb-2 font-semibold">

            Maximum Backlogs

          </label>

          <input

            type="number"

            placeholder="Enter Backlogs"

            className="

            border

            rounded-lg

            p-3

            w-full

            "

          />

        </div>


        {/* Graduation Year */}

        <div className="mb-8">

          <label className="block mb-2 font-semibold">

            Graduation Year

          </label>

          <select

            className="

            border

            rounded-lg

            p-3

            w-full

            "

          >

            <option>

              Select Year

            </option>

            <option>

              2026

            </option>

            <option>

              2027

            </option>

            <option>

              2028

            </option>

          </select>

        </div>


        {/* Buttons */}

        <div className="flex gap-4">

          <button

            className="

            bg-green-600

            text-white

            px-4

            py-2

            rounded-lg

            hover:bg-green-700

            transition

            "

          >

            Save

          </button>


          <button

            className="

            bg-gray-500

            text-white

            px-4

            py-2

            rounded-lg

            hover:bg-gray-600

            transition

            "

          >

            Reset

          </button>

        </div>

      </div>

    </div>

  );

}

export default EligibilityManagement;