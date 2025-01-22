import Loading from "../../../components/Loading";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import useUserInfo from "../../../hooks/useUserInfo";
import { useState } from "react";
import UpdateTaskModal from "./UpdateTaskModal.jsx";

import {
  successAlert,
  confirmationAlert,
  errorAlert,
} from "../../../utilities/sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function MyTasks() {
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
    refetch: userRefetch,
  } = useUserInfo();

  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
    refetch,
  } = useBuyerTasks(userInfo?.email);

  const openModal = (task) => {
    setSelectedTask(task); // Set the selected task
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedTask(null); // Clear the selected task
    setModalOpen(false); // Close the modal
  };

  const handleDelete = async (id) => {
    try {
      // Show confirmation alert to the user
      const result = await confirmationAlert();

      // Proceed if the user confirms
      if (result.isConfirmed) {
        console.log(id);

        const res = await axiosSecure.delete(`/tasks/${id}`);
        console.log(res);

        if (res.data.deleteResult.deletedCount > 0) {
          successAlert("Deleted! Your task has been deleted successfully.");
          userRefetch()
          refetch()
        } else {
          errorAlert("Failed to delete the task. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
      errorAlert("An error occurred. Unable to delete the task.");
    }
  };

  if (userLoading || tasksLoading) return <Loading />;
  if (userError)
    return <div>Error fetching user info: {userError.message}</div>;
  if (tasksError) return <div>Error fetching tasks: {tasksError.message}</div>;
  return (
    <div className="p-4">
      <h3 className="font-subheading text-xl font-bold mb-4 text-gray-800">My Tasks</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="table-auto w-full text-left border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Task Detail</th>
              <th className="px-4 py-2 border-b">Submission Detail</th>
              <th className="px-4 py-2 border-b">Completion Date</th>
              <th className="px-4 py-2 border-b text-center">Actions</th>
            </tr>
          </thead>
  
          {/* Table Body */}
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{task.task_title}</td>
                  <td className="px-4 py-2 border-b">{task.task_detail}</td>
                  <td className="px-4 py-2 border-b">{task.submission_info}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(task.completion_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                        onClick={() => openModal(task)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-4 border-b"
                >
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Update Task Modal */}
      <UpdateTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={selectedTask}
        refetch={refetch}
      />
    </div>
  );
  
}
