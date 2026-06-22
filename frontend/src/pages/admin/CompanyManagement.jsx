/*
Purpose

Company Management Page.

Current Features:

- Search Bar
- Industry Filter
- Add Company Button
- Company Table

Future Features:

- Backend integration
- Search functionality
- Filter functionality
*/


// Import Company Table

import CompanyTable from "./CompanyTable";


export default function CompanyManagement() {

  return (

    <div className="p-6">

      {/* Page Title */}

      <h1

        className="

        text-3xl

        font-bold

        mb-6

        "

      >

        Company Management

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

            placeholder="Search Company"

            className="

            border

            rounded-lg

            p-2

            w-full

            md:w-72

            "

          />

          {/* Industry Filter */}

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

              All Industries

            </option>

            <option>

              IT

            </option>

            <option>

              Finance

            </option>

            <option>

              Consulting

            </option>

          </select>

        </div>

        {/* Add Company Button */}

        <button

          className="

          bg-purple-600

          text-white

          px-4

          py-2

          rounded-lg

          hover:bg-purple-700

          transition

          duration-300

          "

        >

          Add Company

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

        <CompanyTable />

      </div>

    </div>

  );

}