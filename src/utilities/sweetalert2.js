import Swal from "sweetalert2";

const errorAlert = (title) => {
  return Swal.fire({
    title: title,
    icon: "error",
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  });
};
const successAlert = (title) => {
  return Swal.fire({
    title: title,
    icon: "success",
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  });
};

// Confirmation Alert
const confirmationAlert = async () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, confirm!",
    cancelButtonText: "Cancel",
  });
};

export { errorAlert, successAlert, confirmationAlert };
