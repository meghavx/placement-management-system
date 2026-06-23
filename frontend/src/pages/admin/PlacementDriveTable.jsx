/*
Purpose

Displays Placement Drives.

Current Features:

- Company Name
- Job Role
- Package
- Status

Future Features:

- Publish
- Close
- Edit
*/


function PlacementDriveTable() {

  return (

    <div className="overflow-x-auto">

      <table className="w-full">

        {/* Table Header */}

        <thead>

          <tr>

            <th>Company</th>

            <th>Job Role</th>

            <th>Package</th>

            <th>Status</th>

          </tr>

        </thead>


        {/* Table Data */}

        <tbody>

          <tr>

            <td>TCS</td>

            <td>Software Engineer</td>

            <td>7 LPA</td>

            <td>Open</td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}

export default PlacementDriveTable;