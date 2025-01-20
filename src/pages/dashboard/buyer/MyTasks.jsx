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
    <>
      <h3 className="font-subheading text-lg font-bold">My Tasks</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Task Detail</th>
              <th>Submission Detail</th>
              <th>Completion date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}

            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_title}</td>
                <td>{task.task_detail}</td>
                <td>{task.submission_info}</td>
                <td>{task.completion_date}</td>
                <td>
                  <div className="flex gap-1">
                    <button
                      className="btn bg-green-500 text-white btn-sm"
                      onClick={() => openModal(task)}
                    >
                      Update
                    </button>
                    <button
                      className="btn bg-red-500 text-white btn-sm"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UpdateTaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          task={selectedTask}
          refetch={refetch}
        />
      </div>
    </>
  );
}
