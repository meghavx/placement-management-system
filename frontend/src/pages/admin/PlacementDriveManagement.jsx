/*
Purpose

Placement Drive Management Page.

Current Features:

- Add Placement Drive button

Future Features:

- View Drives
- Edit Drives
- Publish Drives
- Close Drives
*/


// Import Placement Drive Table component
import PlacementDriveTable from "./PlacementDriveTable";
import DashboardLayout from "../../layouts/DashboardLayout";

function PlacementDriveManagement() {

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

      Placement Drive Management

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

          placeholder="Search Drive"

          className="

          border

          rounded-lg

          p-2

          w-full

          md:w-72

          "

        />

        {/* Status Filter */}

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

      {/* Add Drive Button */}

      <button

        className="

        bg-orange-600

        text-white

        px-4

        py-2

        rounded-lg

        hover:bg-orange-700

        transition

        duration-300

        "

      >

        Add Drive

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

      <PlacementDriveTable />

    </div>

  </div>

  </DashboardLayout>

);

}

export default PlacementDriveManagement;