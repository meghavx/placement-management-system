/*
Purpose

Displays all students.

Current Features:

- Student Name
- Department
- CGPA
- Edit Button
- Delete Button

Future Features:

- Backend integration
- Dynamic student data
*/

export default function StudentTable() {

  return (

    // Enables horizontal scrolling on small screens
    <div className="overflow-x-auto">

      <table className="w-full">

        {/* Table Header */}

        <thead>

          <tr

            className="

            border-b

            text-left

            "

          >

            <th className="py-3">

              Name

            </th>

            <th className="py-3">

              Department

            </th>

            <th className="py-3">

              CGPA

            </th>

            <th className="py-3">

              Actions

            </th>

          </tr>

        </thead>

        {/* Table Body */}

        <tbody>

          {/* Student 1 */}

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

              <div className="flex gap-2">

                {/* Edit Button */}

                <button

                  className="

                  bg-yellow-500

                  text-white

                  px-3

                  py-1

                  rounded

                  "

                >

                  Edit

                </button>

                {/* Delete Button */}

                <button

                  className="

                  bg-red-600

                  text-white

                  px-3

                  py-1

                  rounded

                  "

                >

                  Delete

                </button>

              </div>

            </td>

          </tr>

          {/* Student 2 */}

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

              <div className="flex gap-2">

                <button

                  className="

                  bg-yellow-500

                  text-white

                  px-3

                  py-1

                  rounded

                  "

                >

                  Edit

                </button>

                <button

                  className="

                  bg-red-600

                  text-white

                  px-3

                  py-1

                  rounded

                  "

                >

                  Delete

                </button>

              </div>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}