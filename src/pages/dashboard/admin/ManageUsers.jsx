import Loading from "../../../components/Loading";
import useGetUsers from "../../../hooks/useGetUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  successAlert,
  confirmationAlert,
  errorAlert,
} from "../../../utilities/sweetalert2";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const { data: users, isLoading, error, refetch } = useGetUsers();

  const handleRoleChange = async (email, newRole) => {
    try {
      // Send PATCH request to update user role
      const response = await axiosSecure.patch("/update/role", { email, role: newRole });
  
      if (response.status === 200) {
        console.log("Role updated successfully:", response.data.message);
        successAlert("Role updated successfully!");
        // Refetch the users to reflect the updated role
        refetch();
      } else {
        console.error("Failed to update role:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating role:", error.response?.data?.message || error.message);
    }
  };

  // delete
  const handleRemoveUser = async (email) => {
    try {
      // Show confirmation alert to the user
      const result = await confirmationAlert();

      // Proceed if the user confirms
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${email}`);        

        if (res.data.deletedCount > 0) {
          successAlert("Deleted! user has been deleted successfully.");

          refetch();
        } else {
          errorAlert("Failed to delete the task. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
      errorAlert("An error occurred. Unable to delete the task.");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!users) return <div>No user found</div>;

  return (
    <>
      <div className="divider">
        <h1 className="text-xl font-bold">All users</h1>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Role</th>
              <th>Coin</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.email, e.target.value)}
                    className="select select-bordered select-sm w-full"
                  >
                    <option value="admin">Admin</option>
                    <option value="buyer">Buyer</option>
                    <option value="worker">Worker</option>
                  </select>
                </td>
                <td>{user.coin}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleRemoveUser(user.email)}
                  >
                    Remove
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
