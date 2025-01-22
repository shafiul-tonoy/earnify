import Loading from "../../../components/Loading";
import useGetAllTask from "../../../hooks/useGetAllTask";
import {
  successAlert,
  confirmationAlert,
  errorAlert,
} from "../../../utilities/sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ManageTasks() {
  const { data: allTasks, isLoading, error, refetch } = useGetAllTask();
  const axiosSecure = useAxiosSecure();

  // Handle delete task
  const handleDeleteTask = async (taskId) => {
    const confirm = await confirmationAlert(
      "Are you sure?",
      "You won't be able to revert this!",
      "Yes, delete it!"
    );

    if (confirm.isConfirmed) {
      try {
        const response = await axiosSecure.delete(`/allTasks/${taskId}`);
        if (response.status === 200) {
          successAlert("Deleted!", "The task has been deleted successfully.");
          refetch(); // Refresh the task list
        } else {
          errorAlert("Failed to delete task.");
        }
      } catch (err) {
        errorAlert(
          "Error deleting task:",
          err.response?.data?.message || err.message
        );
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!allTasks?.length) return <div>No tasks found</div>;

  return (
    <div className="p-6">
      <div className="divider mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Tasks</h1>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="table-auto w-full text-left border border-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Required Workers</th>
              <th className="px-6 py-3">Payable Amount</th>
              <th className="px-6 py-3">Buyer</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {allTasks.map((task, index) => (
              <tr
                key={task._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-800">{task.task_title}</td>
                <td className="px-6 py-4 text-gray-800">
                  {task.required_workers}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  ${task.payable_amount}
                </td>
                <td className="px-6 py-4 text-gray-800">{task.buyerEmail}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
