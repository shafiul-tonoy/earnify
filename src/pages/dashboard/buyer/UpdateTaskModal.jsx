import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {successAlert} from "../../../utilities/sweetalert2"

export default function UpdateTaskModal({ isOpen, onClose, task, refetch }) {
  const axios = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (task) {
      reset({
        task_title: task.task_title,
        task_detail: task.task_detail,
        submission_info: task.submission_info,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.patch(`/tasks/${task._id}`, data); 
      successAlert("Task updated successfully!")      
      refetch();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!isOpen || !task) return null; // Render nothing if modal is closed or task is missing

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Task</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4">
            <label htmlFor="task_title" className="label font-semibold">
              Title
            </label>
            <input
              type="text"
              id="task_title"
              className="input input-bordered w-full"
              {...register("task_title", {
                required: "Task title is required",
              })}
            />
            {errors.task_title && (
              <p className="text-red-500 text-sm">
                {errors.task_title.message}
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label htmlFor="task_detail" className="label font-semibold">
              Details
            </label>
            <textarea
              id="task_detail"
              className="textarea textarea-bordered w-full"
              {...register("task_detail", {
                required: "Task details are required",
              })}
            ></textarea>
            {errors.task_detail && (
              <p className="text-red-500 text-sm">
                {errors.task_detail.message}
              </p>
            )}
          </div>

          <div className="form-control mb-4">
            <label htmlFor="submission_info" className="label font-semibold">
              Submission Info
            </label>
            <textarea
              id="submission_info"
              className="textarea textarea-bordered w-full"
              {...register("submission_info", {
                required: "Submission info is required",
              })}
            ></textarea>
            {errors.submission_info && (
              <p className="text-red-500 text-sm">
                {errors.submission_info.message}
              </p>
            )}
          </div>

          <div className="modal-action">
            <button type="submit" className="btn bg-green-500 text-white">
              Update
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
