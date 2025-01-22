import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../../../utilities/sweetalert2";
import Loading from "../../../components/Loading";
import { imageUpload } from "../../../api/utilis";
import useUserInfo from "../../../hooks/useUserInfo";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function AddNewTasks() {
  const { data: userInfo, isLoading, error, refetch } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.task_image_url[0];
    const task_image_url = await imageUpload(image);
    data.task_image_url = task_image_url;
    data.buyerEmail = userInfo.email;
    const totalPayableAmount =
      parseFloat(data.payable_amount) * parseFloat(data.required_workers);

    if (totalPayableAmount > userInfo.coin) {
      errorAlert("not enough coin");
      return navigate("/dashboard/purchaseCoin");
    }

    data.totalPayableAmount = totalPayableAmount;
    data.required_workers = parseFloat(data.required_workers)
    data.payable_amount = parseFloat(data.payable_amount)

    try {
      const response = await axiosSecure.post("/tasks", data);
      console.log("Task Created:", response.data);
      successAlert("Task added successfully!");
      refetch()
      return navigate("/dashboard/myTasks");
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!userInfo) return <div>No user found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Create a Task
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Task Title */}
        <div>
          <label
            htmlFor="task_title"
            className="block text-sm font-medium text-gray-700"
          >
            Task Title
          </label>
          <input
            type="text"
            id="task_title"
            placeholder="Enter task title"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("task_title", { required: "Task title is required" })}
          />
          {errors.task_title && (
            <p className="text-sm text-red-500 mt-1">{errors.task_title.message}</p>
          )}
        </div>
  
        {/* Task Detail */}
        <div>
          <label
            htmlFor="task_detail"
            className="block text-sm font-medium text-gray-700"
          >
            Task Detail
          </label>
          <textarea
            id="task_detail"
            placeholder="Provide details about the task"
            rows="4"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("task_detail", { required: "Task detail is required" })}
          />
          {errors.task_detail && (
            <p className="text-sm text-red-500 mt-1">{errors.task_detail.message}</p>
          )}
        </div>
  
        {/* Required Workers */}
        <div>
          <label
            htmlFor="required_workers"
            className="block text-sm font-medium text-gray-700"
          >
            Required Workers
          </label>
          <input
            type="number"
            id="required_workers"
            placeholder="Number of workers needed"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("required_workers", {
              required: "Number of workers is required",
              min: { value: 1, message: "Must be at least 1 worker" },
            })}
          />
          {errors.required_workers && (
            <p className="text-sm text-red-500 mt-1">
              {errors.required_workers.message}
            </p>
          )}
        </div>
  
        {/* Payable Amount */}
        <div>
          <label
            htmlFor="payable_amount"
            className="block text-sm font-medium text-gray-700"
          >
            Payable Amount (per worker)
          </label>
          <input
            type="number"
            id="payable_amount"
            placeholder="Enter amount in USD"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("payable_amount", {
              required: "Payable amount is required",
              min: { value: 1, message: "Amount must be greater than 0" },
            })}
          />
          {errors.payable_amount && (
            <p className="text-sm text-red-500 mt-1">
              {errors.payable_amount.message}
            </p>
          )}
        </div>
  
        {/* Completion Date */}
        <div>
          <label
            htmlFor="completion_date"
            className="block text-sm font-medium text-gray-700"
          >
            Completion Date
          </label>
          <input
            type="date"
            id="completion_date"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("completion_date", {
              required: "Completion date is required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return (
                  selectedDate >= today ||
                  "Completion date cannot be in the past"
                );
              },
            })}
          />
          {errors.completion_date && (
            <p className="text-sm text-red-500 mt-1">
              {errors.completion_date.message}
            </p>
          )}
        </div>
  
        {/* Submission Info */}
        <div>
          <label
            htmlFor="submission_info"
            className="block text-sm font-medium text-gray-700"
          >
            Submission Info
          </label>
          <textarea
            id="submission_info"
            placeholder="Details for submission"
            rows="2"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("submission_info", {
              required: "Submission info is required",
            })}
          />
          {errors.submission_info && (
            <p className="text-sm text-red-500 mt-1">
              {errors.submission_info.message}
            </p>
          )}
        </div>
  
        {/* Task Image Upload */}
        <div>
          <label
            htmlFor="task_image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Task Image
          </label>
          <input
            type="file"
            id="task_image"
            accept="image/*"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            {...register("task_image_url", { required: "Task image is required" })}
          />
          {errors.task_image && (
            <p className="text-sm text-red-500 mt-1">{errors.task_image.message}</p>
          )}
        </div>
  
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
  
}
