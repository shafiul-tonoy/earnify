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

  const handlePaymentSuccess = async (id) => {
    try {
      const response = await axiosSecure.patch(`/allWithdraws/${id}`, {
        status: "approved",
      });

      if (response.data.modifiedCount > 0) {
        successAlert("Payment status updated successfully");
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
    <>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Workers */}
          <div className="p-4 bg-blue-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-blue-600">Total Workers</h2>
            <p className="text-3xl font-bold">{totalWorkers}</p>
          </div>

          {/* Total Buyers */}
          <div className="p-4 bg-green-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-green-600">Total Buyers</h2>
            <p className="text-3xl font-bold">{totalBuyers}</p>
          </div>

          {/* Total Available Coins */}
          <div className="p-4 bg-yellow-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-yellow-600">
              Total Available Coins
            </h2>
            <p className="text-3xl font-bold">{totalAvailableCoins}</p>
          </div>

          {/* Total Cost */}
          <div className="p-4 bg-purple-100 rounded-md shadow">
            <h2 className="text-lg font-medium text-purple-600">
              Total Payments
            </h2>
            <p className="text-3xl font-bold">${totalCost.toFixed(2)}</p>
          </div>
        </div>

        {/* Manage Withdrawals */}
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Manage Withdrawals</h1>
          {withdraws && withdraws.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Worker Name</th>
                    <th>Worker Email</th>
                    <th>Coins</th>
                    <th>Amount ($)</th>
                    <th>Payment System</th>
                    <th>Account Number</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdraws.map((withdraw, index) => (
                    <tr key={withdraw._id}>
                      <td>{index + 1}</td>
                      <td>{withdraw.worker_name}</td>
                      <td>{withdraw.worker_email}</td>
                      <td>{withdraw.withdrawal_coin}</td>
                      <td>{withdraw.withdrawal_amount}</td>
                      <td>{withdraw.payment_system}</td>
                      <td>{withdraw.account_number}</td>
                      <td>{withdraw.withdrawal_date}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded ${
                            withdraw.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {withdraw.status}
                        </span>
                      </td>
                      <td>
                        {withdraw.status === "Pending" && (
                          <button
                            onClick={() => handlePaymentSuccess(withdraw._id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
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
            <div>No withdrawals to display</div>
          )}
        </div>
      </div>
    </>
  );
}
