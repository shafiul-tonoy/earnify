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
  <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Task List</h1>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {tasks.map((task, index) => (
      <div
        className="relative bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300 ease-in-out"
        key={index}
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 hover:text-indigo-600 transition-colors duration-300">
            {task.task_title}
          </h3>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-600">
              <strong className="block text-indigo-600 font-medium">Buyer Name:</strong> {task.buyerEmail}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="block text-indigo-600 font-medium">Completion Date:</strong> {task.completion_date}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="block text-indigo-600 font-medium">Payable Amount:</strong> ${task.payable_amount}
            </p>
            <p className="text-sm text-gray-600">
              <strong className="block text-indigo-600 font-medium">Required Workers:</strong> {task.required_workers}
            </p>
          </div>

          <button
            className="w-full bg-indigo-500 text-white py-3 px-6 rounded-md text-sm font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-300"
            onClick={() => handleDetails(task)}
          >
            View Details
          </button>
        </div>

        <div
          className="absolute top-0 right-0 bg-gradient-to-tr from-indigo-500 to-pink-500 w-16 h-16 flex items-center justify-center rounded-bl-xl text-white text-sm font-medium shadow-md"
        >
          New
        </div>
      </div>
    ))}
  </div>
</div>

  );
}
