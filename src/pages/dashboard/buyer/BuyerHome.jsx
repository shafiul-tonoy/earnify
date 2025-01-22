import Loading from "../../../components/Loading";
import useBuyerTasks from "../../../hooks/useBuyerTasks";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TaskToReview from "./TaskToReview";

export default function BuyerHome() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: tasks, isLoading, error } = useBuyerTasks(user?.email);

  // Fetch total payment paid by the buyer
  const { data: totalPaymentData } = useQuery({
    queryKey: ["totalCost", user?.email],
    queryFn: async () => {
      if (!user?.email) return 0; // Default to 0 if user email is missing
      const response = await axiosSecure.get(`/buyerPayment/${user.email}`);
      return response.data.totalCost;
    },
    initialData: 0, // Set an initial value of 0
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Calculate values with safeguards
  const totalTasks = tasks?.length || 0;
  const pendingTaskCount = tasks?.reduce(
    (sum, task) => sum + (task.required_workers || 0),
    0
  );
  const totalPayment = totalPaymentData || 0; // Ensure totalPayment defaults to 0

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Buyer Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Tasks */}
        <div className="flex flex-col items-center bg-blue-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-medium uppercase">Total Tasks</h2>
          <p className="text-4xl font-extrabold mt-2">{totalTasks}</p>
        </div>

        {/* Pending Tasks */}
        <div className="flex flex-col items-center bg-yellow-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-medium uppercase">Pending Tasks</h2>
          <p className="text-4xl font-extrabold mt-2">{pendingTaskCount}</p>
        </div>

        {/* Total Payment Paid */}
        <div className="flex flex-col items-center bg-green-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-medium uppercase">Total Payments</h2>
          <p className="text-4xl font-extrabold mt-2">${totalPayment.toFixed(2)}</p>
        </div>
      </div>

      {/* Tasks to Review Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Tasks to Review
        </h2>
        <TaskToReview />
      </div>
    </div>
  );
}
