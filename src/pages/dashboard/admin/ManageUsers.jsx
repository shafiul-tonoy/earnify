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
      const response = await axiosSecure.patch("/update/role", {
        email,
        role: newRole,
      });

      if (response.status === 200) {
        console.log("Role updated successfully:", response.data.message);
        successAlert("Role updated successfully!");
        // Refetch the users to reflect the updated role
        refetch();
      } else {
        console.error("Failed to update role:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error updating role:",
        error.response?.data?.message || error.message
      );
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
    <div className="p-6">
      <div className="divider mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="table-auto w-full text-left border border-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Display Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Coin</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border border-gray-300 object-cover object-top"
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.email, e.target.value)
                    }
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="buyer">Buyer</option>
                    <option value="worker">Worker</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-800">{user.coin}</td>
                <td className="px-6 py-4">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
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
    </div>
  );
}
