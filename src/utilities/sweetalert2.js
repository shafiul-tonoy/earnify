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

export { errorAlert, successAlert };
