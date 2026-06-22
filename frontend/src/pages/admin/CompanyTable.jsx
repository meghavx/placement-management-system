/*
Purpose

Displays all companies.

Current Features:

- Company Name
- Industry
- Location
- Edit Button
- Delete Button

Future Features:

- Backend integration
- Dynamic company data
*/

export default function CompanyTable() {

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

              Company

            </th>

            <th className="py-3">

              Industry

            </th>

            <th className="py-3">

              Location

            </th>

            <th className="py-3">

              Actions

            </th>

          </tr>

        </thead>

        {/* Table Body */}

        <tbody>

          {/* Company 1 */}

          <tr className="border-b">

            <td className="py-4">

              TCS

            </td>

            <td>

              IT Services

            </td>

            <td>

              Mumbai

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

          {/* Company 2 */}

          <tr>

            <td className="py-4">

              Infosys

            </td>

            <td>

              IT Services

            </td>

            <td>

              Pune

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