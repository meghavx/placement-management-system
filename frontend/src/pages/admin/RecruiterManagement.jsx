/*
Purpose

Recruiter Management Page.

Current Features:

- Search Bar
- Company Filter
- Add Recruiter Button
- Recruiter Table

Future Features:

- Backend integration
- Search functionality
- Filter functionality
*/


// Import Recruiter Table

import RecruiterTable from "./RecruiterTable";

import DashboardLayout from "../../layouts/DashboardLayout";


export default function RecruiterManagement() {

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

        Recruiter Management

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

            placeholder="Search Recruiter"

            className="

            border

            rounded-lg

            p-2

            w-full

            md:w-72

            "

          />

          {/* Company Filter */}

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

        {/* Add Recruiter Button */}

        <button

          className="

          bg-green-600

          text-white

          px-4

          py-2

          rounded-lg

          hover:bg-green-700

          transition

          duration-300

          "

        >

          Add Recruiter

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

        <RecruiterTable />

      </div>

    </div>

    </DashboardLayout>

  );

}