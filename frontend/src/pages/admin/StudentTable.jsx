export default function StudentTable() {

  return (

    <div className="overflow-x-auto">
    <table className="w-full">

      <thead>

        <tr>

          <th>Name</th>

          <th>Department</th>

          <th>CGPA</th>

          <th>Actions</th>

        </tr>

      </thead>

      <tbody>

        <tr>

          <td>John Doe</td>

          <td>CSE</td>

          <td>8.7</td>

          <td>Edit</td>

        </tr>

      </tbody>

    </table>
    </div>

  );

}