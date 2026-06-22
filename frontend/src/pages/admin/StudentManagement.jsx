export default function StudentManagement() {
  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Student Management
        </h1>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>

      </div>

      <div className="bg-white rounded shadow p-4">

        <p>
          Student table will appear here
        </p>

      </div>

    </div>
  );
}