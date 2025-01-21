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
        errorAlert("Error deleting task:", err.response?.data?.message || err.message);
      }
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!allTasks?.length) return <div>No tasks found</div>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Manage Tasks</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Buyer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allTasks.map((task, index) => (
              <tr key={task._id}>
                <th>{index + 1}</th>
                <td>{task.task_title}</td>
                <td>{task.required_workers}</td>
                <td>${task.payable_amount}</td>
                <td>{task.buyerEmail}</td>
                <td>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
