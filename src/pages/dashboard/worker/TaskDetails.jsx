import { useForm } from "react-hook-form";

export default function TaskDetails({ task, onClose }) {
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submission Details:", data.submission_details);
    // Add any action after submission, e.g., API call
  };
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden lg:flex">
        <figure className="lg:w-1/3">
          <img
            src={task.task_image_url}
            alt="Task"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="p-6 lg:w-2/3">
          <h2 className="text-2xl font-bold mb-3">{task.task_title}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Details:</strong> {task.task_detail}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Required Workers:</strong> {task.required_workers}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Payable Amount:</strong> ${task.payable_amount}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Submission Info:</strong> {task.submission_info}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Buyer Email:</strong> {task.buyerEmail}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Submission Details:
            </label>
            <textarea
              {...register("submission_details", {
                required: "This field is required",
              })}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your submission details"
            />
            {errors.submission_details && (
              <p className="text-red-500 text-sm">
                {errors.submission_details.message}
              </p>
            )}
            <div className="flex justify-end space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                type="button"
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Task List
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
