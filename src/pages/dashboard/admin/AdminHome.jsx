import Loading from "../../../components/Loading";
import useGetUsers from "../../../hooks/useGetUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useWithdraw from "../../../hooks/useWithdraw";
import { successAlert, errorAlert } from "../../../utilities/sweetalert2";

export default function AdminHome() {
  const axiosSecure = useAxiosSecure();

  // Fetch users
  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetUsers();
  const { data: withdraws, isLoading, error, refetch } = useWithdraw();

  // Fetch total cost
  const {
    data: totalCostData,
    isLoading: isCostLoading,
    error: costError,
  } = useQuery({
    queryKey: ["totalCost"],
    queryFn: async () => {
      const response = await axiosSecure.get("/total-cost");
      return response.data.totalCost;
    },
  });

  // Loading and Error Handling
  if (isUsersLoading || isCostLoading || isLoading) return <Loading />;
  if (usersError) return <div>Error: {usersError.message}</div>;
  if (costError) return <div>Error: {costError.message}</div>;
  if (!users) return <div>No users found</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Calculations
  const totalWorkers = users.filter((user) => user.role === "worker").length;
  const totalBuyers = users.filter((user) => user.role === "buyer").length;
  const totalAvailableCoins = users.reduce(
    (sum, user) => sum + (user.coin || 0),
    0
  );
  const totalCost = totalCostData || 0;

  const handlePaymentSuccess = async (withdraw) => {
    try {
      const response = await axiosSecure.patch(
        `/allWithdraws/${withdraw._id}`,
        {
          status: "approved",
        }
      );

      console.log(response.data);

      if (response.data.modifiedCount > 0) {
        successAlert("Payment status updated successfully");
        console.log("Payment status updated successfully");

        // for notification start

        // Create a notification
        const notification = {
          message: `you have earned ${withdraw.withdrawal_amount} Dollar`,
          toEmail: withdraw?.worker_email,
          fromEmail: "Admin",
          actionRoute: `/dashboard/`,
          time: new Date().toISOString(),
        };

        // Send the notification
        axiosSecure
          .post("/notifications", notification)
          .then(() => {
            console.log("Notification sent successfully");
          })
          .catch((error) => {
            console.error(
              "Error sending notification:",
              error.response?.data || error.message
            );
          });
        // for notification end

        refetch(); // Refresh the data
      } else {
        errorAlert("Failed to update payment status");
      }
    } catch (err) {
      console.error("Error updating payment status:", err);
      errorAlert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-6 bg-blue-100 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-blue-600">Total Workers</h2>
          <p className="text-3xl font-bold text-blue-800">{totalWorkers}</p>
        </div>
        <div className="p-6 bg-green-100 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-green-600">Total Buyers</h2>
          <p className="text-3xl font-bold text-green-800">{totalBuyers}</p>
        </div>
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-yellow-600">
            Total Available Coins
          </h2>
          <p className="text-3xl font-bold text-yellow-800">
            {totalAvailableCoins}
          </p>
        </div>
        <div className="p-6 bg-purple-100 rounded-lg shadow-md">
          <h2 className="text-lg font-medium text-purple-600">
            Total Payments
          </h2>
          <p className="text-3xl font-bold text-purple-800">
            ${totalCost.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Withdrawals Table */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Manage Withdrawals
        </h2>

        {withdraws && withdraws.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="table-auto w-full text-left border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Worker Name</th>
                  <th className="px-6 py-3">Worker Email</th>
                  <th className="px-6 py-3">Coins</th>
                  <th className="px-6 py-3">Amount ($)</th>
                  <th className="px-6 py-3">Payment System</th>
                  <th className="px-6 py-3">Account Number</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {withdraws.map((withdraw, index) => (
                  <tr
                    key={withdraw._id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{withdraw.worker_name}</td>
                    <td className="px-6 py-4">{withdraw.worker_email}</td>
                    <td className="px-6 py-4">{withdraw.withdrawal_coin}</td>
                    <td className="px-6 py-4">{withdraw.withdrawal_amount}</td>
                    <td className="px-6 py-4">{withdraw.payment_system}</td>
                    <td className="px-6 py-4">{withdraw.account_number}</td>
                    <td className="px-6 py-4">{withdraw.withdrawal_date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          withdraw.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {withdraw.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {withdraw.status === "Pending" && (
                        <button
                          onClick={() => handlePaymentSuccess(withdraw)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          Payment Success
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No withdrawals to display</p>
        )}
      </div>
    </div>
  );
}
