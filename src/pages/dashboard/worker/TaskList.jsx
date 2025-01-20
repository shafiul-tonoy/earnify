import { useState } from "react";
import Loading from "../../../components/Loading";
import useFindTasks from "../../../hooks/useFindTasks";
import TaskDetails from "./TaskDetails";

export default function TaskList() {
  const { data: tasks, isLoading, isError, error } = useFindTasks();
  const [selectedTask, setSelectedTask] = useState(null); // State to manage selected task

  // Handle displaying task details
  const handleDetails = (task) => {
    setSelectedTask(task);
  };

  // Handle going back to task list
  const closeDetails = () => {
    setSelectedTask(null);
  };

  if (isLoading) return <Loading />;
  if (isError) return <h1 className="text-red-500">Error: {error.message}</h1>;

  // If a task is selected, show the TaskDetails component
  if (selectedTask) {
    return <TaskDetails task={selectedTask} onClose={closeDetails} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Task List</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tasks.map((task, index) => (
          <div
            className="bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow"
            key={index}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {task.task_title}
            </h3>
            <p className="text-gray-600">
              <strong>Buyer Name:</strong> {task.buyerEmail}
            </p>
            <p className="text-gray-600">
              <strong>Completion Date:</strong> {task.completion_date}
            </p>
            <p className="text-gray-600">
              <strong>Payable Amount:</strong> ${task.payable_amount}
            </p>
            <p className="text-gray-600">
              <strong>Required Workers:</strong> {task.required_workers}
            </p>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => handleDetails(task)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
